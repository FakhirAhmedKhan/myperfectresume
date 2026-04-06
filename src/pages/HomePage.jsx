import React from "react";
import { Link } from "react-router-dom";
import { Layout as LayoutIcon, Cpu, Sparkles, User, Briefcase, Award } from "lucide-react";
import { motion } from "framer-motion";

const HomePage = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <div className="text-center py-16 md:py-24 max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-6 border border-blue-100 dark:border-blue-800">
                    <Sparkles size={16} className="animate-pulse" />
                    AI-Powered Career Optimization
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
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
                        <Cpu size={20} />
                        Analyze ATS Score
                    </Link>
                </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 container max-w-6xl">
                 <FeatureCard 
                    icon={<LayoutIcon className="text-blue-600" size={32} />}
                    title="Smart CV Builder"
                    description="Dynamic sections, real-time preview, and polished templates designed for today's market."
                 />
                 <FeatureCard 
                    icon={<Cpu className="text-purple-600" size={32} />}
                    title="ATS Optimizer"
                    description="Our rule-based engine scans your content for keywords, formatting, and critical sections."
                 />
                 <FeatureCard 
                    icon={<Award className="text-green-600" size={32} />}
                    title="Privacy First"
                    description="No servers, no tracking. All your data stays locally in your browser for 100% privacy."
                 />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all"
    >
        <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 line-secondary">
           {description}
        </p>
    </motion.div>
)

export default HomePage;
