import { m } from "framer-motion";
import { ScoreCard, ScoreBreakdown, KeywordMatchPanel, MissingSectionsPanel, SuggestionsPanel } from "../../../index";

 const ATSResults = ({ results, isJDMode }) => {
  if (!results) return null;

  return (
    <m.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreCard score={results.score} />
        <ScoreBreakdown breakdown={results.breakdown} isJDMode={isJDMode} />
      </div>

      <MissingSectionsPanel missingSections={results.missingSections} />

      <KeywordMatchPanel 
        found={results.foundKeywords} 
        missing={results.missingKeywords}
        isJDMode={isJDMode}
        matchedJD={results.matchedJDKeywords}
        missingJD={results.missingJDKeywords}
      />

      <SuggestionsPanel 
        suggestions={results.suggestions} 
        strengths={results.strengths} 
      />
    </m.div>
  );
};

export default ATSResults;