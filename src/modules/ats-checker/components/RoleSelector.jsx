import { ROLE_KEYWORDS } from "../config/roleKeywords";

export const RoleSelector = ({ role, setRole }) => {
  const roles = Object.keys(ROLE_KEYWORDS);

  return (
    <div className="flex flex-col gap-2 mt-6">
      <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Target Role Focus</label>
      <select 
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 capitalize"
      >
        {roles.map(r => (
          <option key={r} value={r}>
            {r === 'general' ? 'General (No specific focus)' : r.replace(/([A-Z])/g, ' $1').trim()}
          </option>
        ))}
      </select>
    </div>
  );
};
