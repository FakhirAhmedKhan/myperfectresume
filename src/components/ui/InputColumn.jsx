import { SearchIcon } from '@/CustomIcons'
import { JobDescriptionPanel, ResumeInputPanel, RoleSelector } from '@/index'
import { useCvChecker } from '@/configs/useCvChecker'

const InputColumn = () => {
    const { CvChecker } = useCvChecker();
    const { jdText, setJdText, role, setRole, results, isAnalyzing, handleAnalyze, handleReset, hasData } = CvChecker;

    return (
        <div className="lg:col-span-5 flex flex-col gap-6 p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <ResumeInputPanel />
            <JobDescriptionPanel jdText={jdText} setJdText={setJdText} />
            <RoleSelector role={role} setRole={setRole} />

            <div className="flex gap-4 mt-4">
                <button
                    onClick={handleReset}
                    disabled={isAnalyzing || (!hasData && !jdText && !results)}
                    className="px-6 py-4 rounded-2xl font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
                >
                    Reset
                </button>
                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !hasData}
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
    )
}

export default InputColumn