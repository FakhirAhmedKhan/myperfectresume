import { ATSResults } from '../index'
import { SearchIcon } from '../../index'
import { AnimatePresence } from 'framer-motion'

const ResultsColumn = ({ results, jdText }) => {
    return (
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
    )
}

export default ResultsColumn