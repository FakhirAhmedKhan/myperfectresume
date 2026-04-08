import { compareJDKeywords } from "../configs/keywordHelpers";

export const calculateJDMatchScore = (resumeText, jdText) => {
  if (!jdText || jdText.trim().length < 50) {
    return {
      score: 0,
      matched: [],
      missing: [],
      suggestions: ["Provide a valid Job Description to calculate JD match."],
    };
  }

  const { matched, missing, total } = compareJDKeywords(resumeText, jdText);

  if (total === 0)
    return { score: 100, matched: [], missing: [], suggestions: [] };

  const matchRatio = matched.length / total;

  // E.g. Matching 60% of keywords might be equivalent to a 100 score realistically
  // Let's use a scale: 50% match is an 80 score, 70% match is 100 score.
  let score = (matchRatio / 0.7) * 100;
  score = Math.min(100, Math.floor(score));

  const suggestions = [];
  if (score < 50) {
    suggestions.push(
      `Your resume requires significant tweaking for this JD. Missing key terms: ${missing.slice(0, 5).join(", ")}`,
    );
  } else if (score < 80) {
    suggestions.push(
      `Good match. Try to incorporate: ${missing.slice(0, 3).join(", ")}`,
    );
  }

  return {
    score,
    matched,
    missing,
    suggestions,
  };
};
