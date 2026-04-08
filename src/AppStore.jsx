import React, { createContext, useContext, useState, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import Tesseract from "tesseract.js";
import { calculateATSScore } from "./modules/ats-checker/scoring/calculateATSScore";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

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
  const [jdText, setJdText] = useState("");
  const [role, setRole] = useState("general");
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("structured");

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

  const updatePersonalInfo = (info) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };
  const handlePersonalInfo = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };
  const addItem = (section, item) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), item],
    }));
  };

  const removeItem = (section, id) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };



  const flattenResume = (data) => {
    let text = `${data.personalInfo.fullName}\n${data.personalInfo.title}\n${data.personalInfo.email} ${data.personalInfo.phone} ${data.personalInfo.location}\n\n`;
    text += `SUMMARY\n${data.personalInfo.summary}\n\n`;

    text += "EXPERIENCE\n";
    data.experience.forEach((exp) => {
      text += `${exp.position} at ${exp.company} (${exp.date})\n${exp.desc}\n\n`;
    });

    text += "EDUCATION\n";
    data.education.forEach((edu) => {
      text += `${edu.degree} - ${edu.school} (${edu.date})\n\n`;
    });

    text += `SKILLS\n${data.skills.join(", ")}\n\n`;

    data.projects.forEach((proj) => {
      text += `${proj.name}\n${proj.desc}\n\n`;
    });

    return text.trim();
  };

  const [checkerData, setCheckerData] = useState(initialResumeData);

  const handleAnalyze = () => {
    const text = flattenResume(checkerData);
    if (!text || text.length < 50) {
      alert("Please provide more detailed information for analysis.");
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      const parsedResults = calculateATSScore(text, jdText, role);
      setResults(parsedResults);
      setIsAnalyzing(false);
    }, 800);
  };

  const handleReset = () => {
    setCheckerData(initialResumeData);
    setJdText("");
    setRole("general");
    setResults(null);
  };

  const updateCheckerPersonalInfo = (info) => {
    setCheckerData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const addCheckerItem = (section, item) => {
    setCheckerData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), item],
    }));
  };

  const removeCheckerItem = (section, id) => {
    setCheckerData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  const updateCheckerItem = (section, id, updatedItem) => {
    setCheckerData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => (item.id === id ? updatedItem : item)),
    }));
  };

  const handleImportFromBuilder = () => {
    setCheckerData({ ...resumeData });
    setMode("structured");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return;

    setIsExtracting(true);
    setStatus("Reading PDF...");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .filter((item) => typeof item.str === "string")
          .map((item) => item.str)
          .join(" ");
        fullText += pageText + "\n";
      }

      if (!fullText.trim()) {
        setStatus("No text layer found. Attempting OCR...");
        fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          setStatus(`OCR on page ${i}...`);
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context, viewport }).promise;
          const {
            data: { text },
          } = await Tesseract.recognize(canvas.toDataURL("image/png"), "eng");
          fullText += text + "\n";
        }
      }

      if (fullText.trim()) {
        updateCheckerPersonalInfo({ summary: fullText.trim() });
        setMode("structured");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to extract text.");
    } finally {
      setIsExtracting(false);
      setStatus("");
      e.target.value = "";
    }
  };

  return (
    <AppContext.Provider
      value={{
        isExtracting,
        status,
        mode,
        setMode,
        handleImportFromBuilder,
        handleFileUpload,
        resumeData,
        setResumeData,
        checkerData,
        setCheckerData,
        updateCheckerPersonalInfo,
        addCheckerItem,
        removeCheckerItem,
        updateCheckerItem,
        updatePersonalInfo,
        addItem,
        removeItem,
        updateItem,
        jdText,
        setJdText,
        role,
        setRole,
        results,
        isAnalyzing,
        handleAnalyze,
        handleReset,
        activeTab,
        setActiveTab,
        template,
        setTemplate,
        isExporting,
        setIsExporting,
        handleDownload,
        handlePersonalInfo,
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
