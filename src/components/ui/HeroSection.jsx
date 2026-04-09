import { CpuIcon, LayoutIcon, SparklesIcon } from "../../index"

const HeroSection = ({ onPageChange }) => {
    return (
        <div className="text-center py-2 md:py-4 max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000  ">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-6 border border-blue-100 dark:border-blue-800">
                <SparklesIcon size={16} className="animate-pulse" />
                AI-Powered Career Optimization
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8">
                Elevate Your Career with <span className="gradient-text">Smart Resume Studio</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                A professional-grade suite to build, optimize, and analyze your resume.
                Get ATS-ready in minutes and land your dream job with confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                    onClick={() => onPageChange?.("builder")}
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-500/25 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                    <LayoutIcon size={20} />
                    Build Professional CV
                </button>
                <button
                    onClick={() => onPageChange?.("checker")}
                    className="px-8 py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-bold hover:bg-black dark:hover:bg-gray-100 transition-all hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg"
                >
                    <CpuIcon size={20} />
                    Analyze ATS Score
                </button>
            </div>
        </div>
    )
}

export default HeroSection