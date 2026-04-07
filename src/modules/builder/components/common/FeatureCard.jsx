import { m } from "framer-motion";

const FeatureCard = ({ icon, title, description }) => (
    <m.div
        whileHover={{ y: -5 }}
        className="p-5 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all"
    >
        <div className="flex flex-row items-center gap-4">
            <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-6">{title}</h3>
        </div>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            {description}
        </p>
    </m.div>
);

export default FeatureCard;
