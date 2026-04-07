import { useState } from "react";
import { calculateATSScore } from "../scoring/calculateATSScore";

export const useATSChecker = () => {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [role, setRole] = useState("general");
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!resumeText.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate slight delay for dramatic effect / fake processing
    setTimeout(() => {
      const parsedResults = calculateATSScore(resumeText, jdText, role);
      setResults(parsedResults);
      setIsAnalyzing(false);
    }, 800);
  };

  const handleReset = () => {
    setResumeText("");
    setJdText("");
    setRole("general");
    setResults(null);
  };

  return {
    resumeText,
    setResumeText,
    jdText,
    setJdText,
    role,
    setRole,
    results,
    isAnalyzing,
    handleAnalyze,
    handleReset
  };
};
