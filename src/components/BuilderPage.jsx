import { ResumeForm, ResumePreview, BuildPageHeader, MobileTabToggle } from "./index.js";
import { useCvBuilder, CvBuilderProvider } from "../configs/useCvBuilder.js";

const BuilderContent = () => {
  const { CVBuilder } = useCvBuilder();
  return (
    <div className="flex flex-col gap-6">
      <BuildPageHeader />
      <MobileTabToggle />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className={`md:col-span-5 ${CVBuilder.activeTab === 'preview' ? 'hidden md:block' : 'block'}`}>
          <ResumeForm />
        </div>
        <div className={`md:col-span-7 ${CVBuilder.activeTab === 'edit' ? 'hidden md:block' : 'block'} sticky top-24`}>
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden min-h-[85vh]">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

const BuilderPage = () => {
  return (
    <CvBuilderProvider>
      <BuilderContent />
    </CvBuilderProvider>
  );
};

export default BuilderPage;
