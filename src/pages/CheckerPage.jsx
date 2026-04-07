import { AnimatePresence } from "framer-motion";
import {  ResumeInputPanel, JobDescriptionPanel, RoleSelector, ATSResults } from "../index";
import { SearchIcon } from "../components/common/CustomIcons";
import { useATSChecker } from "../modules/ats-checker/hooks/useATSChecker";

const ATSCheckerPage = () => {
  const {
    resumeText, setResumeText,
    jdText, setJdText,
    role, setRole,
    results, isAnalyzing,
    handleAnalyze, handleReset
  } = useATSChecker();

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto py-8">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-extrabold mb-4">Pro ATS Analyzer</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Deep-scan your resume against industry standards and specific job descriptions. Maximize your chances of getting past the initial automated screening.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Column */}
        <div className="lg:col-span-5 flex flex-col gap-6 p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <ResumeInputPanel resumeText={resumeText} setResumeText={setResumeText} />
          <JobDescriptionPanel jdText={jdText} setJdText={setJdText} />
          <RoleSelector role={role} setRole={setRole} />
          
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleReset}
              disabled={isAnalyzing || (!resumeText && !jdText && !results)}
              className="px-6 py-4 rounded-2xl font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
            >
              Reset
            </button>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !resumeText}
              className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-transform hover:scale-[1.01] shadow-lg shadow-blue-500/20"
            >
              {isAnalyzing ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</>
              ) : (
                <><SearchIcon size={22} /> Analyze Resume</>
              )}
            </button>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {results ? (
              <ATSResults key="results" results={results} isJDMode={!!(jdText && jdText.trim().length > 50)} />
            ) : (
              <div key="placeholder" className="h-full flex flex-col items-center justify-center p-12 text-center bg-gray-50/50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 min-h-[600px]">
                <SearchIcon size={64} className="text-gray-300 dark:text-gray-700 mb-6 animate-pulse" />
                <h3 className="text-2xl font-bold mb-2">Ready for Analysis</h3>
                <p className="text-gray-400 max-w-sm">
                  Paste your resume text and click analyze to see detailed feedback, formatting issues, and keyword matching.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default ATSCheckerPage;
