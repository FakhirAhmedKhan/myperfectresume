/**
 * Escapes characters that have special meaning in regex.
 */
export const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * Checks if an exact word exists in the text.
 */
export const hasWord = (text, word) => {
  if (!text || !word) return false;
  
  // Custom exact word check because simple \b might not work well with special chars like react.js
  const escapedWord = escapeRegex(word.toLowerCase());
  
  // Match word boundary OR start/end of string OR surrounded by spaces/punctuation
  const regex = new RegExp(`(?:^|\\s|\\W)(?<!-)${escapedWord}(?!-)(?:\\s|\\W|$)`, "i");
  return regex.test(text);
};
