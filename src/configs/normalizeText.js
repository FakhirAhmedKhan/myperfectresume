/**
 * Cleans and normalizes text for analysis.
 */
export const normalizeText = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ") // Replace punctuation with space, keep hyphens
    .replace(/\s+/g, " ")       // Replace multiple spaces with single space
    .trim();
};

/**
 * Extracts basic contact information.
 */
export const extractContactInfo = (text) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const phoneRegex = /\+?[\d\s\-\(\)]{7,15}\d/g;
  const linkedinRegex = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/g;

  return {
    hasEmail: emailRegex.test(text),
    hasPhone: phoneRegex.test(text),
    hasLinkedIn: linkedinRegex.test(text),
  };
};
