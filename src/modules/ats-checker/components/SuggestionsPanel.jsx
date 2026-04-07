import { CheckCircle2Icon, AlertCircleIcon } from "../../../components/common/CustomIcons";

export const SuggestionsPanel = ({ suggestions, strengths }) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <AlertCircleIcon className="text-blue-600" /> Actionable Feedback
      </h3>

      {strengths && strengths.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-gray-500 uppercase">Strengths</h4>
          {strengths.map((s, i) => (
            <div key={i} className="flex gap-3 p-4 bg-green-50/50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30">
              <CheckCircle2Icon className="text-green-500 shrink-0" size={20} />
              <p className="text-sm dark:text-gray-300 font-medium">{s}</p>
            </div>
          ))}
        </div>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-gray-500 uppercase mt-2">To Improve</h4>
          {suggestions.map((s, i) => (
            <div key={i} className="flex gap-3 p-4 bg-red-50/50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
              <AlertCircleIcon className="text-red-500 shrink-0" size={20} />
              <p className="text-sm dark:text-gray-300 font-medium">{s}</p>
            </div>
          ))}
        </div>
      )}
      
      {suggestions?.length === 0 && (
        <div className="p-4 text-center text-gray-500 text-sm">
          No major issues found!
        </div>
      )}
    </div>
  );
};
