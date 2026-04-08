import { useState } from "react";
import { FileTextIcon, DownloadIcon, LayoutIcon, BriefcaseIcon, GraduationCapIcon, CodeIcon, Input, Textarea, UserIcon } from "../../../index";
import { mockResumeText } from "../data/mockResumeText";
import { useAppStore } from "../../../AppStore";
import { Section, DynamicSection } from "../../builder/FormSections";
import * as pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import Tesseract from "tesseract.js";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ResumeInputPanel = ({ resumeData, setResumeData, updatePersonalInfo, addItem, removeItem, updateItem }) => {
  const { resumeData: builderData } = useAppStore();
  const [isExtracting, setIsExtracting] = useState(false);
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("structured");

  const handleImportFromBuilder = () => {
    if (!builderData) return;
    setResumeData(builderData);
    setMode("structured");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return;

    setIsExtracting(true);
    setStatus("Reading PDF...");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .filter(item => typeof item.str === 'string')
          .map((item) => item.str)
          .join(" ");
        fullText += pageText + "\n";
      }

      if (!fullText.trim()) {
        setStatus("No text layer found. Attempting OCR...");
        fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          setStatus(`OCR on page ${i}...`);
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context, viewport }).promise;
          const { data: { text } } = await Tesseract.recognize(canvas.toDataURL("image/png"), 'eng');
          fullText += text + "\n";
        }
      }

      if (fullText.trim()) {
        // When uploading a PDF, we store it in the summary for now as raw text analysis
        // because smart-parsing into individual fields is too unreliable.
        updatePersonalInfo({ summary: fullText.trim() });
        setMode("structured");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to extract text.");
    } finally {
      setIsExtracting(false);
      setStatus("");
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileTextIcon className="text-blue-600" />
          <h3 className="text-xl font-bold">Resume Content</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleImportFromBuilder}
            className="text-xs font-bold text-indigo-500 hover:text-indigo-700 underline underline-offset-4 flex items-center gap-1"
          >
            <LayoutIcon size={12} />
            Sync from Builder
          </button>
          <label className="text-xs font-bold text-blue-500 hover:text-blue-700 underline underline-offset-4 cursor-pointer flex items-center gap-1">
            <DownloadIcon size={12} className="rotate-180" />
            PDF Extract
            <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} disabled={isExtracting} />
          </label>
        </div>
      </div>

      <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-2">
        <button
          onClick={() => setMode("structured")}
          className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${mode === 'structured' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-gray-500'}`}
        >Structured Mode</button>
        <button
          onClick={() => setMode("raw")}
          className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${mode === 'raw' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-gray-500'}`}
        >Raw Text</button>
      </div>

      <div className="relative min-h-[500px]">
        {mode === "raw" ? (
          <textarea
            className="w-full h-[500px] p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm leading-relaxed"
            placeholder="Paste raw text here for quick analysis..."
            value={resumeData.personalInfo.summary}
            onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          />
        ) : (
          <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
            <Section title="Personal" icon={<UserIcon size={18} />}>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Name" value={resumeData.personalInfo.fullName} onChange={(e) => updatePersonalInfo({ fullName: e.target.value })} />
                <Input label="Title" value={resumeData.personalInfo.title} onChange={(e) => updatePersonalInfo({ title: e.target.value })} />
                <Textarea className="col-span-2" label="Summary / Raw Content" value={resumeData.personalInfo.summary} onChange={(e) => updatePersonalInfo({ summary: e.target.value })} />
              </div>
            </Section>

            <DynamicSection
              title="Experience"
              icon={<BriefcaseIcon size={18} />}
              items={resumeData.experience}
              onAdd={() => addItem("experience", { id: Date.now(), company: "", position: "", date: "", desc: "" })}
              onRemove={(id) => removeItem("experience", id)}
              onUpdate={(id, data) => updateItem("experience", id, data)}
              renderItem={(item, update) => (
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Company" value={item.company} onChange={(e) => update({ company: e.target.value })} />
                  <Input label="Position" value={item.position} onChange={(e) => update({ position: e.target.value })} />
                  <Textarea className="col-span-2" label="Description" value={item.desc} onChange={(e) => update({ desc: e.target.value })} />
                </div>
              )}
            />

            <DynamicSection
              title="Education"
              icon={<GraduationCapIcon size={18} />}
              items={resumeData.education}
              onAdd={() => addItem("education", { id: Date.now(), school: "", degree: "", date: "" })}
              onRemove={(id) => removeItem("education", id)}
              onUpdate={(id, data) => updateItem("education", id, data)}
              renderItem={(item, update) => (
                <div className="grid grid-cols-2 gap-3">
                  <Input label="School" value={item.school} onChange={(e) => update({ school: e.target.value })} />
                  <Input label="Degree" value={item.degree} onChange={(e) => update({ degree: e.target.value })} />
                </div>
              )}
            />

            <Section title="Skills" icon={<CodeIcon size={18} />}>
              <Textarea
                placeholder="React, Java, Teamwork..."
                value={resumeData.skills.join(", ")}
                onChange={(e) => setResumeData(prev => ({ ...prev, skills: e.target.value.split(",").map(s => s.trim()) }))}
              />
            </Section>
          </div>
        )}

        {isExtracting && (
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl flex items-center justify-center p-8 z-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-600 rounded-full animate-spin" />
              <p className="font-bold text-blue-600">Smart extraction active...</p>
              <p className="text-xs text-gray-500">{status}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeInputPanel;
