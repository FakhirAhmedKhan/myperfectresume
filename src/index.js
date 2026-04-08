import { lazy } from "react";

export const HomePage = lazy(() => import("@/components/HomePage"));
export const NavBar = lazy(() => import("@/Navbar"));
export const BuilderPage = lazy(() => import("@/components/BuilderPage"));
export const CheckerPage = lazy(() => import("@/components/CheckerPage"));
export const ModernTemplate = lazy(() => import("@/templates/ModernTemplate"));
export const ProfessionalTemplate = lazy(
  () => import("@/templates/ProfessionalTemplate"),
);
const uiLazy = (path) => lazy(() => import(`./components/ui/${path}`));

export const ResultsColumn = uiLazy("ResultsColumn.jsx");
export const InputColumn = uiLazy("InputColumn.jsx");
export const BuildPageHeader = uiLazy("BuildPageHeader.jsx");
export const MobileTabToggle = uiLazy("MobileTabToggle.jsx");
export const HeroSection = uiLazy("HeroSection.jsx");
export const FeatureHighlights = uiLazy("FeatureHighlights.jsx");
export const FeatureCard = uiLazy("FeatureCard.jsx");
export const Input = uiLazy("Input.jsx");
export const Textarea = uiLazy("Textarea.jsx");
export const ResumeForm = uiLazy("ResumeForm.jsx");
export const ResumePreview = uiLazy("ResumePreview.jsx");
export const ResumeInputPanel = uiLazy("ResumeInputPanel.jsx");
export const JobDescriptionPanel = uiLazy("JobDescriptionPanel.jsx");
export const RoleSelector = uiLazy("RoleSelector.jsx");
export const ATSResults = uiLazy("ATSResults.jsx");
export const ScoreCard = uiLazy("ScoreCard.jsx");
export const ScoreBreakdown = uiLazy("ScoreBreakdown.jsx");
export const KeywordMatchPanel = uiLazy("KeywordMatchPanel.jsx");
export const MissingSectionsPanel = uiLazy("MissingSectionsPanel.jsx");
export const SuggestionsPanel = uiLazy("SuggestionsPanel.jsx");
export const ContactItem = uiLazy("ContactItem.jsx");
export const DynamicSection = uiLazy("FormSections.jsx");

const lazyIcon = (name) =>
  lazy(() =>
    import("./CustomIcons").then((module) => ({ default: module[name] })),
  );

// icons
export const UserIcon = lazyIcon("UserIcon");
export const HomeIcon = lazyIcon("HomeIcon");
export const FileTextIcon = lazyIcon("FileTextIcon");
export const CpuIcon = lazyIcon("CpuIcon");
export const LayoutIcon = lazyIcon("LayoutIcon");
export const MoonIcon = lazyIcon("MoonIcon");
export const SunIcon = lazyIcon("SunIcon");
export const Edit3Icon = lazyIcon("Edit3Icon");
export const TrashIcon = lazyIcon("TrashIcon");
export const DownloadIcon = lazyIcon("DownloadIcon");
export const EyeIcon = lazyIcon("EyeIcon");
export const ResumeIcon = lazyIcon("ResumeIcon");
export const BriefcaseIcon = lazyIcon("BriefcaseIcon");
export const SparklesIcon = lazyIcon("SparklesIcon");
export const AwardIcon = lazyIcon("AwardIcon");
export const CheckCircle2Icon = lazyIcon("CheckCircle2Icon");
export const AlertCircleIcon = lazyIcon("AlertCircleIcon");
export const TrendingUpIcon = lazyIcon("TrendingUpIcon");
export const MapPinIcon = lazyIcon("MapPinIcon");
export const StarIcon = lazyIcon("StarIcon");
export const PhoneIcon = lazyIcon("PhoneIcon");
export const MailIcon = lazyIcon("MailIcon");
export const PlusIcon = lazyIcon("PlusIcon");
export const GraduationCapIcon = lazyIcon("GraduationCapIcon");
export const CodeIcon = lazyIcon("CodeIcon");
export const SearchIcon = lazyIcon("SearchIcon");
