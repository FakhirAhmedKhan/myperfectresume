import { FileTextIcon } from "../../../components/common/CustomIcons";
import { mockResumeText } from "../data/mockResumeText";

export const ResumeInputPanel = ({ resumeText, setResumeText }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <FileTextIcon className="text-blue-600" />
          <h3 className="text-xl font-bold">Resume Content</h3>
        </div>
        <button 
          onClick={() => setResumeText(mockResumeText.trim())}
          className="text-xs font-bold text-blue-500 hover:text-blue-700 underline underline-offset-4"
        >
          Load Mock Resume
        </button>
      </div>
      <textarea
        className="w-full h-[400px] p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm leading-relaxed"
        placeholder="Paste your plain resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />
    </div>
  );
};
