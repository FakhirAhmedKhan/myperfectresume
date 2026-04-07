const ProgressBar = ({ label, score, colorClass }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center text-sm font-bold">
      <span className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs">{label}</span>
      <span className={colorClass}>{score}%</span>
    </div>
    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
      <div 
        className={`h-full ${colorClass.replace('text-', 'bg-')} transition-all duration-1000`} 
        style={{ width: `${score}%` }} 
      />
    </div>
  </div>
);

export const ScoreBreakdown = ({ breakdown, isJDMode }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Score Breakdown</h3>
      
      <div className="flex flex-col gap-5">
        <ProgressBar label="Core Sections" score={breakdown.sections} colorClass="text-blue-500" />
        <ProgressBar label="Bullet Impact" score={breakdown.impact} colorClass="text-purple-500" />
        <ProgressBar label="Formatting" score={breakdown.formatting} colorClass="text-green-500" />
        <ProgressBar label="Essentials" score={breakdown.essentials} colorClass="text-yellow-500" />
        {isJDMode ? (
          <ProgressBar label="JD Match" score={breakdown.jdMatch} colorClass="text-indigo-500" />
        ) : (
          <ProgressBar label="Role Keywords" score={breakdown.keywords} colorClass="text-pink-500" />
        )}
      </div>
    </div>
  );
};
