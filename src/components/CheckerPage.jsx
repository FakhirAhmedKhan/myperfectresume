import { useCvChecker, CvCheckerProvider } from "@/configs/useCvChecker";
import { InputColumn, ResultsColumn } from "@/index";

const CheckerContent = () => {
  const { CvChecker } = useCvChecker();
  return (
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto py-8">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-extrabold mb-4">Pro ATS Analyzer by AI powered </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Deep-scan your resume against industry standards and specific job descriptions. Maximize your chances of getting past the initial automated screening.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
