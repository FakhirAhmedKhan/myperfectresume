export const calculateFormattingScore = (resumeText) => {
  let score = 100;
  const suggestions = [];

  const charCount = resumeText.length;
  const wordCount = resumeText.split(/\s+/).length;

  if (charCount < 1000) {
    score -= 30;
    suggestions.push("Your resume is very short. Ensure you have detailed your experiences.");
  } else if (wordCount > 1000) {
    score -= 20;
    suggestions.push("Your resume might be too lengthy (>1000 words). Consider making it more concise.");
  }

  // Check for common bullet forms
  if (!resumeText.includes("•") && !resumeText.includes("- ")) {
    score -= 20;
    suggestions.push("ATS parsing works best with standard bullet points (• or -).");
  }

  const lowerText = resumeText.toLowerCase();
  
  // Logical ordering
  const eduIndex = lowerText.indexOf("education");
  const expIndex = lowerText.indexOf("experience");
  
  if (eduIndex > -1 && expIndex > -1 && eduIndex < expIndex) {
    // If Education comes before Experience, typically for fresh grads only
    suggestions.push("Double check formatting: Experience is usually placed above Education for non-entry-level roles.");
  }

  return {
    score: Math.max(0, score),
    suggestions
  };
};
