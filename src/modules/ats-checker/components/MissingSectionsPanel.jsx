import { LayoutIcon } from "../../../components/common/CustomIcons";

export const MissingSectionsPanel = ({ missingSections }) => {
  if (!missingSections || missingSections.length === 0) return null;

  return (
    <div className="p-6 bg-orange-50 dark:bg-orange-900/10 rounded-3xl border border-orange-100 dark:border-orange-900/30 flex flex-col gap-4">
      <h3 className="text-xl font-bold flex items-center gap-2 text-orange-700 dark:text-orange-400">
        <LayoutIcon /> Missing Sections
      </h3>
      <div className="flex flex-wrap gap-2">
        {missingSections.map((section, i) => (
          <span key={i} className="px-3 py-1 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-bold border border-orange-200 dark:border-orange-800">
            {section}
          </span>
        ))}
      </div>
    </div>
  );
};
