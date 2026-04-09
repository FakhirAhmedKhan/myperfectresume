import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { initialResumeData } from "./initialResumeData";
import { useHandleDownload } from "./useHandleDownload";

const STORAGE_KEY = "smart-resume-studio-data";

const CvBuilderContext = createContext();

export const CvBuilderProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("edit");
  const [template, setTemplate] = useState("professional");
  const [isExporting, setIsExporting] = useState(false);

  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialResumeData;

    try {
      const parsed = JSON.parse(saved);
      return { ...initialResumeData, ...parsed };
    } catch {
      return initialResumeData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = useCallback((info) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  }, []);

  const handlePersonalInfo = useCallback(
    (e) => {
      const { name, value } = e.target;
      updatePersonalInfo({ [name]: value });
    },
    [updatePersonalInfo],
  );

  const addItem = useCallback((section, item) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), item],
    }));
  }, []);

  const removeItem = useCallback((section, id) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  }, []);

  const updateItem = useCallback((section, id, updatedItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? updatedItem : item,
      ),
    }));
  }, []);

  const resetData = useCallback(() => {
    setResumeData(initialResumeData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const handleDownload = useHandleDownload({
    resumeData,
    setIsExporting,
  });

  const value = useMemo(
    () => ({
      CVBuilder: {
        activeTab,
        setActiveTab,
        template,
        setTemplate,
        isExporting,
        resumeData,
        setResumeData,
        updatePersonalInfo,
        handlePersonalInfo,
        addItem,
        removeItem,
        updateItem,
        resetData,
        handleDownload,
      },
    }),
    [
      activeTab,
      template,
      isExporting,
      resumeData,
      updatePersonalInfo,
      handlePersonalInfo,
      addItem,
      removeItem,
      updateItem,
      resetData,
      handleDownload,
    ],
  );

  return React.createElement(CvBuilderContext.Provider, { value }, children);
};

export const useCvBuilder = () => {
  const context = useContext(CvBuilderContext);
  if (context === undefined) {
    throw new Error("useCvBuilder must be used within a CvBuilderProvider");
  }
  return context;
};
