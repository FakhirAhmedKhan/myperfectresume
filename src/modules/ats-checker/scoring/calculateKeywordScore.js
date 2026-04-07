import { checkRoleKeywords } from "../utils/keywordHelpers";

export const calculateKeywordScore = (resumeText, role) => {
  const { found, missing } = checkRoleKeywords(resumeText, role);

  const criticalTotal = found.critical.length + missing.critical.length;
  const importantTotal = found.important.length + missing.important.length;
  
  if (criticalTotal === 0 && importantTotal === 0) return { score: 100, found, missing, suggestions: [] };

  // Weights internally for the keyword score itself
  const critScore = criticalTotal > 0 ? (found.critical.length / criticalTotal) * 60 : 0;
  const impScore = importantTotal > 0 ? (found.important.length / importantTotal) * 40 : 0;
  
  // Bonus adds extra points (up to 15)
  const bonusScore = Math.min(15, found.bonus.length * 3);

  let finalScore = Math.min(100, Math.floor(critScore + impScore + bonusScore));
  
  const suggestions = [];
  if (missing.critical.length > 0) {
    suggestions.push(`Missing critical ${role} keywords: ${missing.critical.slice(0, 3).join(", ")}.`);
  } else if (missing.important.length > 0) {
    suggestions.push(`Consider adding more relevant skills like: ${missing.important.slice(0, 3).join(", ")}.`);
  }

  return {
    score: finalScore,
    found,
    missing,
    suggestions
  };
};
