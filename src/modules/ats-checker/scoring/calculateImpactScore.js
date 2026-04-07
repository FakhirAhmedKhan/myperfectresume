import { extractBulletLines, findQuantifiedBullets, findActionVerbBullets } from "../utils/bulletAnalysis";

export const calculateImpactScore = (resumeText) => {
  const bulletLines = extractBulletLines(resumeText);
  
  if (bulletLines.length === 0) {
    return {
      score: 0,
      suggestions: ["No bullet points found. Use bullet points to describe your achievements for better readability and impact."]
    };
  }

  const quantified = findQuantifiedBullets(bulletLines);
  const actionRated = findActionVerbBullets(bulletLines);

  const percentQuantified = quantified.length / bulletLines.length;
  const percentAction = actionRated.length / bulletLines.length;

  // We want ideally >30% quantified and >60% action verbs
  const quantScore = Math.min(100, (percentQuantified / 0.3) * 100);
  const actionScore = Math.min(100, (percentAction / 0.6) * 100);

  const finalScore = Math.floor((quantScore * 0.6) + (actionScore * 0.4));
  
  const suggestions = [];
  if (percentQuantified < 0.2) {
    suggestions.push("Strengthen your impact by adding metrics and numbers (e.g., 'Increased sales by 20%').");
  }
  if (percentAction < 0.4) {
    suggestions.push("Start more bullet points with strong action verbs (e.g., 'Spearheaded', 'Developed').");
  }

  return {
    score: finalScore,
    stats: {
      totalBullets: bulletLines.length,
      quantified: quantified.length,
      actionVerbs: actionRated.length
    },
    suggestions
  };
};
