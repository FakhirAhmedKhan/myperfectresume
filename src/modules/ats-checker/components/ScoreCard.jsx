const ScoreCard = ({ score }) => {
  const getScoreData = (score) => {
    if (score < 40) return { label: "Poor", color: "text-red-500", stroke: "stroke-red-500" };
    if (score < 60) return { label: "Needs Work", color: "text-orange-500", stroke: "stroke-orange-500" };
    if (score < 80) return { label: "Good", color: "text-blue-500", stroke: "stroke-blue-500" };
    return { label: "Strong", color: "text-green-500", stroke: "stroke-green-500" };
  };

  const { label, color, stroke } = getScoreData(score);
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm text-center">
      <h3 className="text-lg font-bold mb-6 text-gray-500 uppercase tracking-widest">Overall ATS Score</h3>
      
      <div className="relative w-48 h-48 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100 dark:text-gray-800" />
          <circle
            cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${stroke} transition-all duration-1000 ease-out`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-black ${color}`}>{score}%</span>
        </div>
      </div>
      
      <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 ${color}`}>
        {label} Match
      </div>
    </div>
  );
};
export default ScoreCard;