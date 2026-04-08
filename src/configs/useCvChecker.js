import { useState } from "react";
import * as pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import Tesseract from "tesseract.js";
import { calculateATSScore } from "../scoring/calculateATSScore";
// import { flattenResume } from "../modules/shared/utils/resumeHelpers";
import { initialResumeData } from "./initialResumeData";
import { flattenResume } from "./resumeHelpers";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const useCvChecker = () => {
  const [checkerData, setCheckerData] = useState(initialResumeData);
  const [jdText, setJdText] = useState("");
  const [role, setRole] = useState("general");
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("row");

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
      [section]: prev[section].map((item) =>
        item.id === id ? updatedItem : item,
      ),
    }));
  };

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
    setMode("row");
  };

  const handleImportFromBuilder = (resumeData) => {
    setCheckerData({ ...resumeData });
    setMode("row");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
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
        setMode("row");
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
  const hasData =
    checkerData.personalInfo.fullName ||
    checkerData.personalInfo.summary ||
    checkerData.experience.length > 0;

  return {
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
  };
};
