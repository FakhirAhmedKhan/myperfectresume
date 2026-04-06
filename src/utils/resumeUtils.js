export const calculateATSScore = (resumeText) => {
  if (!resumeText || resumeText.length < 50) {
    return {
      score: 0,
      missingSections: ["All sections missing"],
      suggestions: ["Please provide a valid resume text or upload a PDF."],
      keywordScore: 0,
      formattingScore: 0,
    };
  }

  const sections = {
    Summary: ["summary", "professional profile", "about me", "objective"],
    Experience: ["experience", "employment", "work history", "professional experience"],
    Skills: ["skills", "expertise", "specialties", "technical skills"],
    Education: ["education", "academic", "qualifications"],
    Projects: ["projects", "personal projects", "portfolio"],
  };

  const keywords = [
    "react", "javascript", "api", "team", "project", "data", "develop", "optimize", 
    "led", "management", "software", "frontend", "backend", "fullstack", "ui", "ux", 
    "performance", "scalable", "agile", "git", "ci/cd", "deployment", "quality", 
    "architecture", "integration", "problem-solving", "innovation"
  ];

  let foundSections = [];
  let missingSections = [];
  let suggestions = [];
  
  const lowerText = resumeText.toLowerCase();

  // 1. Section Check
  Object.entries(sections).forEach(([section, aliases]) => {
    const sectionFound = aliases.some(alias => lowerText.includes(alias));
    if (sectionFound) {
      foundSections.push(section);
    } else {
      missingSections.push(section);
    }
  });

  // 2. Keyword Match
  const foundKeywords = keywords.filter(word => lowerText.includes(word));
  const keywordScore = Math.min(100, (foundKeywords.length / (keywords.length * 0.4)) * 100);

  // 3. Formatting Rules
  let formattingScore = 100;
  if (resumeText.length > 5000) {
    suggestions.push("Consider keeping your resume under 5000 characters for better readability.");
    formattingScore -= 10;
  }
  if (!resumeText.includes("•") && !resumeText.includes("- ")) {
    suggestions.push("Use bullet points for lists to make it more readable for ATS systems.");
    formattingScore -= 15;
  }
  if (lowerText.indexOf("education") < lowerText.indexOf("experience") && lowerText.indexOf("experience") !== -1) {
    suggestions.push("Consider placing Work Experience before Education if you have professional backgrounds.");
    formattingScore -= 5;
  }

  // Feedback generation
  if (missingSections.length > 0) {
    suggestions.push(`Missing sections: ${missingSections.join(", ")}. These are critical for ATS ranking.`);
  } else {
    suggestions.push("Great! All core sections are present.");
  }
  
  if (foundKeywords.length < 5) {
    suggestions.push("Your resume is weak on industry-standard keywords. Consider adding more technical and action-oriented verbs.");
  } else {
     suggestions.push(`Found ${foundKeywords.length} matching keywords. Consider adding more specific skills relevant to the job.`);
  }

  // Weighting
  const sectionWeight = (foundSections.length / Object.keys(sections).length) * 40; // 40%
  const finalKeywordWeight = (keywordScore / 100) * 40; // 40%
  const finalFormWeight = (formattingScore / 100) * 20; // 20%

  const totalScore = Math.floor(sectionWeight + finalKeywordWeight + finalFormWeight);

  return {
    score: totalScore,
    missingSections,
    suggestions,
    keywordScore: Math.floor(keywordScore),
    formattingScore: Math.floor(formattingScore),
    foundKeywords
  };
};

export const parsePDF = async (file) => {
  // Since we don't have a backend or heavy PDF parser in browser by default without external lib
  // We'll simulate a fallback or use simple FileReader if it was text-based.
  // In real production, one might use pdfjs-dist.
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject("Error reading file.");
    reader.readAsText(file);
  });
};
