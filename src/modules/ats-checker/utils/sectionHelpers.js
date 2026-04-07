import { SECTION_ALIASES } from "../config/sectionAliases";
import { normalizeText } from "./normalizeText";

export const detectSections = (text) => {
  const normText = normalizeText(text);
  const foundSections = [];
  const missingSections = [];

  Object.entries(SECTION_ALIASES).forEach(([section, aliases]) => {
    // Check if any of the aliases for this section appear in the text
    const sectionExists = aliases.some(alias => normText.includes(alias.toLowerCase()));
    
    if (sectionExists) {
      foundSections.push(section);
    } else {
      missingSections.push(section);
    }
  });

  return { foundSections, missingSections };
};
