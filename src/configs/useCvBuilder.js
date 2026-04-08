import { useEffect, useState } from "react";
import { initialResumeData } from "./initialResumeData";

const STORAGE_KEY = "smart-resume-studio-data";

export const useCvBuilder = () => {
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

  const updateItem = (section, id, updatedItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? updatedItem : item,
      ),
    }));
  };

  const resetData = () => {
    setResumeData(initialResumeData);
    localStorage.removeItem(STORAGE_KEY);
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

              const sanitizeElements = (node) => {
                if (node.nodeType === 1) {
                  const style = window.getComputedStyle(node);

                  [
                    "color",
                    "backgroundColor",
                    "borderColor",
                    "outlineColor",
                    "fill",
                    "stroke",
                  ].forEach((prop) => {
                    const value = style[prop];
                    if (value && value.includes("oklch")) {
                      node.style[prop] = prop
                        .toLowerCase()
                        .includes("background")
                        ? "#ffffff"
                        : "#000000";
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
          },
        },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  return {
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
  };
};
