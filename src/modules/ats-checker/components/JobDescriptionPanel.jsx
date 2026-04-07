import { BriefcaseIcon } from "../../../index";
import { mockJobDescription } from "../data/mockJobDescription";

 const JobDescriptionPanel = ({ jdText, setJdText }) => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <BriefcaseIcon className="text-purple-600" />
          <h3 className="text-xl font-bold">Job Description <span className="text-xs text-gray-400 font-normal ml-2">(Optional)</span></h3>
        </div>
        <button 
          onClick={() => setJdText(mockJobDescription.trim())}
          className="text-xs font-bold text-purple-500 hover:text-purple-700 underline underline-offset-4"
        >
          Load Mock JD
        </button>
      </div>
      <textarea
        className="w-full h-[200px] p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none text-sm leading-relaxed"
        placeholder="Paste target job description to get JD match score..."
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
      />
    </div>
  );
};

export default JobDescriptionPanel;