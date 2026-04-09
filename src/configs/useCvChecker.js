import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { calculateATSScore } from "./scoring/calculateATSScore";
import { initialResumeData } from "./initialResumeData";
import { flattenResume } from "./resumeHelpers";
import useHandleFileUpload from "./useHandleFileUpload";

const CvCheckerContext = createContext();

export const CvCheckerProvider = ({ children }) => {
  const [checkerData, setCheckerData] = useState(initialResumeData);
  const [jdText, setJdText] = useState("");
  const [role, setRole] = useState("general");
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("raw");

  const updateCheckerPersonalInfo = useCallback((info) => {
    setCheckerData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  }, []);

  const addCheckerItem = useCallback((section, item) => {
    setCheckerData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), item],
    }));
  }, []);

  const removeCheckerItem = useCallback((section, id) => {
    setCheckerData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  }, []);

  const updateCheckerItem = useCallback((section, id, updatedItem) => {
    setCheckerData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? updatedItem : item,
      ),
    }));
  }, []);

  const handleAnalyze = useCallback(() => {
    if (!checkerData || !checkerData.personalInfo) return;

    const text = flattenResume(checkerData);

    if (!text || text.length < 50) {
      alert(
        "Please provide more detailed information for analysis (at least 50 characters).",
      );
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const parsedResults = calculateATSScore(text, jdText, role);
      setResults(parsedResults);
      setIsAnalyzing(false);
    }, 800);
  }, [checkerData, jdText, role]);

  const handleReset = useCallback(() => {
    setCheckerData(initialResumeData);
    setJdText("");
    setRole("general");
    setResults(null);
    setMode("raw");
  }, []);

  const handleImportFromBuilder = useCallback(() => {
    const STORAGE_KEY = "smart-resume-studio-data";
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCheckerData({ ...initialResumeData, ...parsed });
        setMode("structured");
      } catch (err) {
        console.error("Failed to import data:", err);
      }
    } else {
      alert("No builder data found to sync.");
    }
  }, []);

  const handleFileUpload = useHandleFileUpload({
    setIsExtracting,
    setStatus,
    updateCheckerPersonalInfo,
    setMode,
  });

  const hasData =
    checkerData?.personalInfo?.fullName ||
    checkerData?.personalInfo?.summary ||
    (checkerData?.experience?.length || 0) > 0;

  const value = useMemo(
    () => ({
      CvChecker: {
        hasData,
        checkerData,
        setCheckerData,
        jdText,
        setJdText,
        role,
        setRole,
        results,
        isAnalyzing,
        isExtracting,
        status,
        mode,
        setMode,
        updateCheckerPersonalInfo,
        addCheckerItem,
        removeCheckerItem,
        updateCheckerItem,
        handleAnalyze,
        handleReset,
        handleImportFromBuilder,
        handleFileUpload,
      },
    }),
    [
      hasData,
      checkerData,
      jdText,
      role,
      results,
      isAnalyzing,
      isExtracting,
      status,
      mode,
      updateCheckerPersonalInfo,
      addCheckerItem,
      removeCheckerItem,
      updateCheckerItem,
      handleAnalyze,
      handleReset,
      handleImportFromBuilder,
      handleFileUpload,
    ],
  );

  return React.createElement(CvCheckerContext.Provider, { value }, children);
};

export const useCvChecker = () => {
  const context = useContext(CvCheckerContext);

  if (context === undefined) {
    throw new Error("useCvChecker must be used within a CvCheckerProvider");
  }

  return context;
};
