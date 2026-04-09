import { useCvBuilder } from "@/configs";
import { DownloadIcon, TrashIcon } from "../../index";

const BuildPageHeader = () => {
    const { CVBuilder } = useCvBuilder();
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b dark:border-gray-800">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Smart CV Builder</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Design your perfect professional resume
                </p>
            </div>
            <div className="flex items-center gap-2">
                {/* Template Selector */}
                <div className="hidden lg:flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mr-2">
                    <button
                        onClick={() => CVBuilder.setTemplate("professional")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${CVBuilder.template === "professional" ? "bg-white dark:bg-gray-700 shadow-sm" : "text-gray-500"}`}
                    >
                        Professional
                    </button>
                    <button
                        onClick={() => CVBuilder.setTemplate("modern")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${CVBuilder.template === "modern" ? "bg-white dark:bg-gray-700 shadow-sm" : "text-gray-500"}`}
                    >
                        Modern
                    </button>
                </div>
                <button
                    onClick={CVBuilder.resetData}
                    className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors border border-transparent hover:border-red-200"
                    title="Reset All Data"
                >
                    <TrashIcon size={20} />
                </button>
                <button
                    onClick={CVBuilder.handleDownload}
                    disabled={CVBuilder.isExporting}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-75 disabled:cursor-wait text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                    {CVBuilder.isExporting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                            Exporting...
                        </>
                    ) : (
                        <>
                            <DownloadIcon size={20} /> Download PDF
                        </>
                    )}
                </button>
            </div>
        </header>
    );
};

export default BuildPageHeader;
