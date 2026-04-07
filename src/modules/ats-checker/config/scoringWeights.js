// These weights define how much each category heavily impacts the final score out of 100.
// They change based on standard vs job description mode.

export const SCORING_WEIGHTS = {
  standard: {
    sections: 25,
    essentials: 15,
    keywords: 30, // Uses role-based keywords
    impact: 20,
    formatting: 10,
  },
  withJD: {
    sections: 15,
    essentials: 10,
    jdMatch: 40, // Job description match replaces standard keyword priority
    impact: 20,
    formatting: 15,
  }
};
