import { hasWord } from "./regexHelpers";
import { normalizeText } from "./normalizeText";
import { ROLE_KEYWORDS } from "../config/roleKeywords";

/**
 * Extracts and categorizes keywords from the resume based on role configuration.
 */
export const checkRoleKeywords = (resumeText, role = "general") => {
  const keywordsConfig = ROLE_KEYWORDS[role] || ROLE_KEYWORDS.general;
  
  const results = {
    found: { critical: [], important: [], bonus: [] },
    missing: { critical: [], important: [], bonus: [] }
  };

  Object.keys(keywordsConfig).forEach((level) => {
    keywordsConfig[level].forEach((kw) => {
      // Use case-insensitive exact word match
      if (hasWord(resumeText, kw)) {
        results.found[level].push(kw);
      } else {
        results.missing[level].push(kw);
      }
    });
  });

  return results;
};

/**
 * Simple keyword extraction from Job Description.
 * In a real app with NLP, this would extract nouns/entities.
 * Here we extract continuous alphanumeric words > 4 chars, filtered by a basic stop word list.
 */
export const extractJDKeywords = (jdText) => {
  const normJD = normalizeText(jdText);
  // Basic stop words
  const stopWords = new Set(["about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves", "will", "experience", "years", "work", "working", "team", "strong", "looking", "role", "knowledge", "ability"]);

  const words = normJD.split(" ");
  const keywords = new Set();

  words.forEach(word => {
    // Keep alpha-numeric, filter short words and standard stop words
    if (word.length > 3 && !stopWords.has(word) && !/^\d+$/.test(word)) {
      keywords.add(word);
    }
  });
  
  // also inject any role keywords that happen to be in the JD
  Object.values(ROLE_KEYWORDS).forEach(roleLevel => {
    Object.values(roleLevel).flat().forEach(rk => {
      if(hasWord(jdText, rk)) {
        keywords.add(rk.toLowerCase());
      }
    })
  });

  return Array.from(keywords);
};

/**
 * Compares JD keywords vs Resume text
 */
export const compareJDKeywords = (resumeText, jdText) => {
  const jdKeywords = extractJDKeywords(jdText);
  const matched = [];
  const missing = [];

  jdKeywords.forEach(kw => {
    if (hasWord(resumeText, kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  return { matched, missing, total: jdKeywords.length };
};
