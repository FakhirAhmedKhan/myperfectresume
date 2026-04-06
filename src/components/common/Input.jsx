const Input = ({ label, className = "", ...props }) => (
    <div className={`flex flex-col gap-2 ${className}`}>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">{label}</label>
        <input
            className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            {...props}
        />
    </div>
);

export default Input;