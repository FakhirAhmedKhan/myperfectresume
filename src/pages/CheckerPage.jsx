import { useState } from "react";
import { useAppStore } from "../store/AppStore.jsx";
import { calculateATSScore } from "../utils/resumeUtils";
import { Search, FileText, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutIcon, SparklesIcon } from "../components/common/CustomIcons";

const CheckerPage = () => {

    const { atsResults, setAtsResults } = useAppStore();
    const [resumeText, setResumeText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAnalyze = () => {
        setLoading(true);
        // Simulate "AI" processing time
        setTimeout(() => {
            const results = calculateATSScore(resumeText);
            setAtsResults(results);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto py-8">
            <header className="text-center mb-4">
                <h1 className="text-4xl font-extrabold mb-4">ATS Resume Analyzer</h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    Check your resume's compatibility with modern applicant tracking systems.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="flex flex-col gap-6 p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-2 underline decoration-blue-500 underline-offset-4">
                        <FileText className="text-blue-600" />
                        <h3 className="text-xl font-bold">Resume Content</h3>
                    </div>
                    <textarea 
                        className="w-full h-[400px] p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm leading-relaxed"
                        placeholder="Paste your resume text here (Ctrl+V)..."
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                    />
                    <button 
                        onClick={handleAnalyze}
                        disabled={loading || !resumeText}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-transform hover:scale-[1.01] shadow-lg shadow-blue-500/20"
                    >
                        {loading ? (
                            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</>
                        ) : (
                            <><Search size={22} /> Analyze Resume</>
                        )}
                    </button>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 mt-2">
                        <div className="flex gap-2 text-sm text-blue-700 dark:text-blue-400">
                             <SparklesIcon size={16} />
                             <span><strong>Pro Tip:</strong> Ensure you include keywords from the job description for a higher score!</span>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="flex flex-col gap-6">
                    <AnimatePresence mode="wait">
                        {atsResults ? (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col gap-6"
                            >
                                {/* Score Chart Card */}
                                <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm text-center">
                                     <h3 className="text-lg font-bold mb-6 text-gray-500 uppercase tracking-widest">Your ATS Score</h3>
                                     <div className="relative w-48 h-48 mx-auto mb-6">
                                          <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100 dark:text-gray-800" />
                                            <circle 
                                                cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                                                strokeDasharray={(2 * Math.PI * 88)} 
                                                strokeDashoffset={(2 * Math.PI * 88) * (1 - atsResults.score/100)}
                                                className="text-blue-600 transition-all duration-1000 ease-out" 
                                                strokeLinecap="round"
                                            />
                                          </svg>
                                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                                               <span className="text-5xl font-black text-blue-600">{atsResults.score}%</span>
                                          </div>
                                     </div>
                                     <div className="grid grid-cols-2 gap-4 mt-8">
                                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col items-center">
                                               <TrendingUp size={20} className="text-purple-600 mb-2" />
                                               <span className="text-xs text-gray-500 uppercase font-bold">Keyword Optimization</span>
                                               <span className="text-xl font-bold">{atsResults.keywordScore}%</span>
                                          </div>
                                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col items-center">
                                               <LayoutIcon size={20} className="text-green-600 mb-2" />
                                               <span className="text-xs text-gray-500 uppercase font-bold">Formatting Strength</span>
                                               <span className="text-xl font-bold">{atsResults.formattingScore}%</span>
                                          </div>
                                     </div>
                                </div>

                                {/* Feedback Area */}
                                <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <SparklesIcon className="text-blue-600" /> Improvement Suggestions
                                    </h3>
                                    <div className="flex flex-col gap-4">
                                        {atsResults.suggestions.map((suggestion, idx) => (
                                            <div key={idx} className="flex gap-4 p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-50 dark:border-gray-700 hover:border-blue-200 transition-colors">
                                                 {suggestion.toLowerCase().includes("missing") ? (
                                                     <AlertCircle className="text-red-500 shrink-0" />
                                                 ) : (
                                                     <CheckCircle2 className="text-green-500 shrink-0" />
                                                 )}
                                                 <p className="text-sm dark:text-gray-300 leading-relaxed font-medium">
                                                     {suggestion}
                                                 </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-gray-50/50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                                <Search size={64} className="text-gray-300 dark:text-gray-700 mb-6 animate-bounce" />
                                <h3 className="text-2xl font-bold mb-2">Analyzing...</h3>
                                <p className="text-gray-400 max-w-sm">
                                    Your detailed ATS report will appear here after you input your content and click Analyze.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default CheckerPage;

