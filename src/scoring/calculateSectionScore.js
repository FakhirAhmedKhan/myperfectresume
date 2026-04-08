import { detectSections } from "../configs/sectionHelpers";

export const calculateSectionScore = (resumeText) => {
  const { foundSections, missingSections } = detectSections(resumeText);

  const totalExpected = foundSections.length + missingSections.length;
  if (totalExpected === 0)
    return { score: 0, found: [], missing: [], suggestions: [] };

  // Base score based on percentage of found sections
  let score = Math.floor((foundSections.length / totalExpected) * 100);

  const suggestions = [];
  if (missingSections.includes("Experience")) {
    suggestions.push(
      "Missing 'Experience' section. This is critical for ATS parsing.",
    );
    score = Math.max(0, score - 20); // heavy penalty
  }
  if (missingSections.includes("Education")) {
    suggestions.push("Your resume is missing an 'Education' section.");
  }
  if (missingSections.includes("Skills")) {
    suggestions.push(
      "A dedicated 'Skills' section is missing. ATS systems scan this heavily.",
    );
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    found: foundSections,
    missing: missingSections,
    suggestions,
  };
};
