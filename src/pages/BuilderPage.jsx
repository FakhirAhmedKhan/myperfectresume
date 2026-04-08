import { useState } from "react";
import { useAppStore } from "../AppStore.jsx";
import { DownloadIcon, EyeIcon, Edit3Icon, TrashIcon, ResumeForm, ResumePreview } from "../index.js";

const BuilderPage = () => {
  const { resumeData, resetData } = useAppStore();
  const [activeTab, setActiveTab] = useState("edit");
  const [template, setTemplate] = useState("professional");
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const { default: html2pdf } = await import("html2pdf.js");
      const element = document.getElementById("resume-preview-content");
      const opt = {
        margin: 0,
        filename: `${resumeData.personalInfo.fullName || "Resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 3, 
          useCORS: true,
          letterRendering: true,
          onclone: (clonedDoc) => {
            const el = clonedDoc.getElementById("resume-preview-content");
            if (el) {
              el.classList.add("pdf-export-mode");
              
              // Recursive sanitization of oklch colors
              const sanitizeElements = (node) => {
                if (node.nodeType === 1) { // Element node
                  const style = window.getComputedStyle(node);
                  ['color', 'backgroundColor', 'borderColor', 'outlineColor', 'fill', 'stroke'].forEach(prop => {
                    const value = style[prop];
                    if (value && value.includes('oklch')) {
                      // Basic fallback: if it's oklch, force to a standard counterpart
                      // or just remove the style to let it inherit a safe one
                      node.style[prop] = prop.toLowerCase().includes('background') ? '#ffffff' : '#000000';
                    }
                  });
                  node.childNodes.forEach(sanitizeElements);
                }
              };
              sanitizeElements(el);

              el.style.backgroundColor = "white";
              el.style.color = "black";
            }
            clonedDoc.documentElement.classList.remove("dark");
          }
        },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b dark:border-gray-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart CV Builder</h1>
          <p className="text-gray-500 dark:text-gray-400">Design your perfect professional resume</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Template Selector */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mr-2">
            <button
              onClick={() => setTemplate("professional")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${template === 'professional' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'}`}
            >Professional</button>
            <button
              onClick={() => setTemplate("modern")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${template === 'modern' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'}`}
            >Modern</button>
          </div>
          <button
            onClick={resetData}

            className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors border border-transparent hover:border-red-200"
            title="Reset All Data"
          >
            <TrashIcon size={20} />
          </button>
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-75 disabled:cursor-wait text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            {isExporting ? (
              <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Exporting...</>
            ) : (
              <><DownloadIcon size={20} /> Download PDF</>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Tab Toggle */}
      <div className="md:hidden flex p-1 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${activeTab === 'edit' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600' : 'text-gray-500'}`}
        >
          <Edit3Icon size={18} />
          Editor
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${activeTab === 'preview' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600' : 'text-gray-500'}`}
        >
          <EyeIcon size={18} />
          Preview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Editor Column */}
        <div className={`md:col-span-5 ${activeTab === 'preview' ? 'hidden md:block' : 'block'}`}>
          <ResumeForm />
        </div>

        {/* Preview Column */}
        <div className={`md:col-span-7 ${activeTab === 'edit' ? 'hidden md:block' : 'block'} sticky top-24`}>
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden min-h-[85vh]">
            <ResumePreview templateId={template} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default BuilderPage;
