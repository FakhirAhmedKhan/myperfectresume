import { useState } from "react";
import { calculateATSScore } from "../scoring/calculateATSScore";

const initialResumeData = {
  personalInfo: { fullName: "", email: "", phone: "", location: "", summary: "", title: "" },
  experience: [],
  education: [],
  skills: [],
  projects: []
};

export const useATSChecker = () => {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [jdText, setJdText] = useState("");
  const [role, setRole] = useState("general");
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const flattenResume = (data) => {
    let text = `${data.personalInfo.fullName}\n${data.personalInfo.title}\n${data.personalInfo.email} ${data.personalInfo.phone} ${data.personalInfo.location}\n\n`;
    text += `SUMMARY\n${data.personalInfo.summary}\n\n`;
    
    text += "EXPERIENCE\n";
    data.experience.forEach(exp => {
      text += `${exp.position} at ${exp.company} (${exp.date})\n${exp.desc}\n\n`;
    });
    
    text += "EDUCATION\n";
    data.education.forEach(edu => {
      text += `${edu.degree} - ${edu.school} (${edu.date})\n\n`;
    });
    
    text += `SKILLS\n${data.skills.join(", ")}\n\n`;
    
    data.projects.forEach(proj => {
      text += `${proj.name}\n${proj.desc}\n\n`;
    });

    return text.trim();
  };

  const handleAnalyze = () => {
    const text = flattenResume(resumeData);
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
    setResumeData(initialResumeData);
    setJdText("");
    setRole("general");
    setResults(null);
  };

  const updatePersonalInfo = (info) => {
    setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
  };

  const addItem = (section, item) => {
    setResumeData(prev => ({ ...prev, [section]: [...(prev[section] || []), item] }));
  };

  const removeItem = (section, id) => {
    setResumeData(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) }));
  };

  const updateItem = (section, id, updatedItem) => {
    setResumeData(prev => ({ ...prev, [section]: prev[section].map(item => item.id === id ? updatedItem : item) }));
  };

  return {
    resumeData,
    setResumeData,
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
    handleReset
  };
};
