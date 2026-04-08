import { normalizeText } from "./normalizeText";

/**
 * Extracts bullet point lines starting with typical bullet characters.
 */
export const extractBulletLines = (text) => {
  if (!text) return [];
  const lines = text.split("\n");
  // Match lines starting with a bullet point like -, *, •
  return lines.filter(line => /^[\s]*[-*•]\s+/.test(line)).map(line => line.trim().replace(/^[\s]*[-*•]\s+/, ""));
};

/**
 * Checks if lines contain numbers or percentages (quantifiable achievements)
 */
export const findQuantifiedBullets = (bullets) => {
  // Regex to find numbers (e.g., "50%", "$10k", "25", "100+")
  const quantRegex = /\b\d+%?|\$\d+[kmb]?|\d+\+?\b/i;
  return bullets.filter(bullet => quantRegex.test(bullet));
};

/**
 * Basic check if bullets start with strong action verbs.
 */
export const findActionVerbBullets = (bullets) => {
  // A small subset of action verbs
  const actionVerbs = new Set([
    "developed", "led", "managed", "created", "designed", "implemented", "increased", 
    "decreased", "improved", "optimized", "built", "spearheaded", "directed", "launched",
    "reduced", "saved", "achieved", "delivered", "mentored", "orchestrated"
  ]);

  return bullets.filter(bullet => {
    const firstWord = normalizeText(bullet.split(" ")[0]);
    // check normal or past tense roughly
    return actionVerbs.has(firstWord) || actionVerbs.has(firstWord + "d") || actionVerbs.has(firstWord.replace(/(e?)$/, "ed"));
  });
};
