import { calculateSectionScore } from "./calculateSectionScore";
import { calculateKeywordScore } from "./calculateKeywordScore";
import { calculateImpactScore } from "./calculateImpactScore";
import { calculateFormattingScore } from "./calculateFormattingScore";
import { calculateEssentialsScore } from "./calculateEssentialsScore";
import { calculateJDMatchScore } from "./calculateJDMatchScore";
import { SCORING_WEIGHTS } from "../config/scoringWeights";

export const calculateATSScore = (resumeText, jdText = "", role = "general") => {
  if (!resumeText || resumeText.length < 50) {
    return {
      score: 0,
      breakdown: { sections: 0, keywords: 0, impact: 0, formatting: 0, essentials: 0, jdMatch: 0 },
      foundSections: [], missingSections: ["All sections missing"],
      foundKeywords: { critical: [], important: [], bonus: [] }, missingKeywords: { critical: [], important: [], bonus: [] },
      matchedJDKeywords: [], missingJDKeywords: [],
      suggestions: ["Please provide a valid resume text."],
      strengths: []
    };
  }

  const isJDMode = !!(jdText && jdText.trim().length > 50);
  const weights = isJDMode ? SCORING_WEIGHTS.withJD : SCORING_WEIGHTS.standard;

  // Run modules
  const sectionRes = calculateSectionScore(resumeText);
  const keywordRes = calculateKeywordScore(resumeText, role);
  const impactRes = calculateImpactScore(resumeText);
  const formatRes = calculateFormattingScore(resumeText);
  const essRes = calculateEssentialsScore(resumeText);
  const jdRes = isJDMode ? calculateJDMatchScore(resumeText, jdText) : { score: 0, matched: [], missing: [], suggestions: [] };

  // Calculate Weighted Total
  let totalScore = 0;
  totalScore += (sectionRes.score * weights.sections) / 100;
  totalScore += (impactRes.score * weights.impact) / 100;
  totalScore += (formatRes.score * weights.formatting) / 100;
  totalScore += (essRes.score * weights.essentials) / 100;
  
  if (isJDMode) {
    totalScore += (jdRes.score * weights.jdMatch) / 100;
  } else {
    totalScore += (keywordRes.score * weights.keywords) / 100;
  }

  // Combine Suggestions and Strengths
  let suggestions = [
    ...sectionRes.suggestions,
    ...keywordRes.suggestions,
    ...impactRes.suggestions,
    ...formatRes.suggestions,
    ...essRes.suggestions,
  ];

  if (isJDMode) suggestions = [...suggestions, ...jdRes.suggestions];
  
  const strengths = [];
  if (sectionRes.score >= 80) strengths.push("Strong structural sections.");
  if (essRes.score === 100) strengths.push("All essential contact information included.");
  if (impactRes.score >= 80) strengths.push("Excellent use of metrics and action verbs.");
  if (isJDMode && jdRes.score >= 80) strengths.push("Highly aligned with the Job Description.");
  else if (!isJDMode && keywordRes.score >= 80) strengths.push("Great keyword optimization for the target role.");

  return {
    score: Math.min(100, Math.floor(totalScore)),
    breakdown: {
      sections: sectionRes.score,
      keywords: keywordRes.score,
      impact: impactRes.score,
      formatting: formatRes.score,
      essentials: essRes.score,
      jdMatch: jdRes.score,
    },
    foundSections: sectionRes.found,
    missingSections: sectionRes.missing,
    foundKeywords: keywordRes.found,
    missingKeywords: keywordRes.missing,
    matchedJDKeywords: jdRes.matched,
    missingJDKeywords: jdRes.missing,
    suggestions: suggestions.slice(0, 6), // Keep it concise
    strengths
  };
};
