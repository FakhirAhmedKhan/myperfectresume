import { useEffect } from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/common/FeatureCard";
import { LayoutIcon, CpuIcon, SparklesIcon, AwardIcon } from "../components/common/CustomIcons";

const HomePage = () => {

    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;
        root.classList.add("scrollbar-hide");
        body.classList.add("scrollbar-hide");
        return () => {
            root.classList.remove("scrollbar-hide");
            body.classList.remove("scrollbar-hide");
        };
    }, []);

    return (
        <div className="overflow-hidden flex flex-col items-center justify-center px-4">
            {/* Hero Section */}
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
                    <Link
                        to="/builder"
                        className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-500/25 flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        <LayoutIcon size={20} />
                        Build Professional CV
                    </Link>
                    <Link
                        to="/checker"
                        className="px-8 py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-bold hover:bg-black dark:hover:bg-gray-100 transition-all hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg"
                    >
                        <CpuIcon size={20} />
                        Analyze ATS Score
                    </Link>
                </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl w-full mt-4 mb-1">
                <FeatureCard
                    icon={<LayoutIcon className="text-blue-600" size={32} />}
                    title="Smart CV Builder"
                    description="Dynamic sections, real-time preview, and polished templates designed for today's market."
                />
                <FeatureCard
                    icon={<CpuIcon className="text-purple-600" size={32} />}
                    title="ATS Optimizer"
                    description="Our rule-based engine scans your content for keywords, formatting, and critical sections."
                />
                <FeatureCard
                    icon={<AwardIcon className="text-green-600" size={32} />}
                    title="Privacy First"
                    description="No servers, no tracking. All your data stays locally in your browser for 100% privacy."
                />
            </div>
        </div>
    );
};

export default HomePage;
