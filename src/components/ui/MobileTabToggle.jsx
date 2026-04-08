import { useCvBuilder } from "../../configs/useCvBuilder.js";
import { EyeIcon, Edit3Icon } from "../../index.js";

const MobileTabToggle = () => {
    const { CVBuilder } = useCvBuilder();
    return (
        <div className="md:hidden flex p-1 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <button
                onClick={() => CVBuilder.setActiveTab("edit")}
                className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${CVBuilder.activeTab === 'edit' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600' : 'text-gray-500'}`}
            >
                <Edit3Icon size={18} />
                Editor
            </button>
            <button
                onClick={() => CVBuilder.setActiveTab("preview")}
                className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${CVBuilder.activeTab === 'preview' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600' : 'text-gray-500'}`}
            >
                <EyeIcon size={18} />
                Preview
            </button>
        </div>

    )
}

export default MobileTabToggle