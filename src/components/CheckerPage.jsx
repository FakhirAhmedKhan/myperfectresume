import { useCvChecker, CvCheckerProvider } from "@/configs";
import { InputColumn, ResultsColumn } from "./index";

const CheckerContent = () => {
  const { CvChecker } = useCvChecker();
  return (
    <div className="flex flex-col gap-10 max-w-[1440px] mx-auto py-10 px-4 md:px-0">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-black mb-6 tracking-tight">Pro ATS Analyzer <span className="text-blue-600">AI-Powered</span></h1>
        <p className="text-gray-500 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
          Deep-scan your resume against industry standards and specific job descriptions. Maximize your chances of getting past the initial automated screening.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <InputColumn />
        <ResultsColumn results={CvChecker.results} jdText={CvChecker.jdText} />
      </div>
    </div>
  );
};

const ATSCheckerPage = () => {
  return (
    <CvCheckerProvider>
      <CheckerContent />
    </CvCheckerProvider>
  );
};

export default ATSCheckerPage;
