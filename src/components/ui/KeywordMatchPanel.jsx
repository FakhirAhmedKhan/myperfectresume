import { CodeIcon } from "../../index";

const PillList = ({ items, colorClass }) => {
  if (!items || items.length === 0) return <span className="text-xs text-gray-400 italic">None</span>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={i} className={`px-3 py-1 rounded-full text-xs font-bold ${colorClass}`}>
          {item}
        </span>
      ))}
    </div>
  );
};

const KeywordMatchPanel = ({ found, missing, isJDMode, matchedJD, missingJD }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-6">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <CodeIcon className="text-blue-600" /> Keyword Analysis
      </h3>

      {isJDMode ? (
        <>
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Matched JD Keywords</h4>
            <PillList items={matchedJD} colorClass="bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Missing JD Keywords</h4>
            <PillList items={missingJD} colorClass="bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400" />
          </div>
        </>
      ) : (
        <>
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Matched Critical Roles Skills</h4>
            <PillList items={found?.critical} colorClass="bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Missing Critical Role Skills</h4>
            <PillList items={missing?.critical} colorClass="bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400" />
          </div>
        </>
      )}
    </div>
  );
};
export default KeywordMatchPanel;