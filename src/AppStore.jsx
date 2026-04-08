import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const initialResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    title: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
};

const STORAGE_KEY = "smart-resume-studio-data";

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("edit");
  const [template, setTemplate] = useState("professional");
  const [isExporting, setIsExporting] = useState(false);
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialResumeData;
    try {
      const parsed = JSON.parse(saved);
      return { ...initialResumeData, ...parsed };
    } catch (e) {
      return initialResumeData;
    }
  });

  const [atsResults, setAtsResults] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const updatePersonalInfo = (info) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const addItem = (section, item) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), item]
    }));
  };

  const removeItem = (section, id) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  const updateItem = (section, id, updatedItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => (item.id === id ? updatedItem : item)),
    }));
  };

  const resetData = () => {
    setResumeData(initialResumeData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const { default: html2pdf } = await import("html2pdf.js");
      const element = document.getElementById("resume-preview-content");
      const opt = {
        margin: 0,
        filename: `${resumeData.personalInfo.fullName || "Resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 3,
          useCORS: true,
          letterRendering: true,
          onclone: (clonedDoc) => {
            const el = clonedDoc.getElementById("resume-preview-content");
            if (el) {
              el.classList.add("pdf-export-mode");

              // Recursive sanitization of oklch colors
              const sanitizeElements = (node) => {
                if (node.nodeType === 1) { // Element node
                  const style = window.getComputedStyle(node);
                  ['color', 'backgroundColor', 'borderColor', 'outlineColor', 'fill', 'stroke'].forEach(prop => {
                    const value = style[prop];
                    if (value && value.includes('oklch')) {
                      // Basic fallback: if it's oklch, force to a standard counterpart
                      // or just remove the style to let it inherit a safe one
                      node.style[prop] = prop.toLowerCase().includes('background') ? '#ffffff' : '#000000';
                    }
                  });
                  node.childNodes.forEach(sanitizeElements);
                }
              };
              sanitizeElements(el);

              el.style.backgroundColor = "white";
              el.style.color = "black";
            }
            clonedDoc.documentElement.classList.remove("dark");
          }
        },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePersonalInfo = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <AppContext.Provider
      value={{
        resumeData,
        activeTab,
        setActiveTab,
        template,
        setTemplate,
        isExporting,
        setIsExporting,
        handleDownload,
        handlePersonalInfo,
        setResumeData,
        updatePersonalInfo,
        addItem,
        removeItem,
        updateItem,
        resetData,
        atsResults,
        setAtsResults,
        theme,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppStore must be used within an AppProvider");
  }
  return context;
};
