import { extractContactInfo } from "../normalizeText";

export const calculateEssentialsScore = (resumeText) => {
  const { hasEmail, hasPhone, hasLinkedIn } = extractContactInfo(resumeText);
  let score = 0;
  const suggestions = [];
  const found = [];
  const missing = [];

  if (hasEmail) {
    score += 35;
    found.push("Email");
  } else {
    suggestions.push("Missing Email Address. Crucial for contact.");
    missing.push("Email");
  }

  if (hasPhone) {
    score += 35;
    found.push("Phone Number");
  } else {
    suggestions.push(
      "Missing Phone Number. Recruiters often want to call you.",
    );
    missing.push("Phone Number");
  }

  if (hasLinkedIn) {
    score += 30;
    found.push("LinkedIn");
  } else {
    suggestions.push(
      "Missing LinkedIn profile link. Highly recommended for modern applications.",
    );
    missing.push("LinkedIn");
  }

  return {
    score,
    found,
    missing,
    suggestions,
  };
};
