import { lazy } from "react";

export const HomePage = lazy(() => import("@/pages/HomePage"));
export const NavBar = lazy(() => import("@/Navbar"));
export const BuilderPage = lazy(() => import("@/pages/BuilderPage"));
export const CheckerPage = lazy(() => import("@/pages/CheckerPage"));
export const FeatureCard = lazy(
  () => import("@/components/CVBuildUi/FeatureCard"),
);
export const Input = lazy(() => import("@/components/CVBuildUi/Input"));
export const Textarea = lazy(() => import("@/components/CVBuildUi/Textarea"));
export const ModernTemplate = lazy(() => import("@/templates/ModernTemplate"));
export const ProfessionalTemplate = lazy(
  () => import("@/templates/ProfessionalTemplate"),
);
export const ResumeForm = lazy(
  () => import("@/components/CVBuildUi/ResumeForm"),
);
export const ResumePreview = lazy(
  () => import("@/components/CVBuildUi/ResumePreview"),
);
export const ResumeInputPanel = lazy(
  () => import("@/components/AtcCheckerUi/ResumeInputPanel"),
);
export const JobDescriptionPanel = lazy(
  () => import("@/components/AtcCheckerUi/JobDescriptionPanel"),
);
export const RoleSelector = lazy(
  () => import("@/components/AtcCheckerUi/RoleSelector"),
);
export const ATSResults = lazy(
  () => import("@/components/AtcCheckerUi/ATSResults"),
);
export const ScoreCard = lazy(
  () => import("@/components/AtcCheckerUi/ScoreCard"),
);
export const ScoreBreakdown = lazy(
  () => import("@/components/AtcCheckerUi/ScoreBreakdown"),
);
export const KeywordMatchPanel = lazy(
  () => import("@/components/AtcCheckerUi/KeywordMatchPanel"),
);
export const MissingSectionsPanel = lazy(
  () => import("@/components/AtcCheckerUi/MissingSectionsPanel"),
);
export const SuggestionsPanel = lazy(
  () => import("@/components/AtcCheckerUi/SuggestionsPanel"),
);
export const ContactItem = lazy(
  () => import("@/components/CVBuildUi/ContactItem"),
);
export const DynamicSection = lazy(
  () => import("@/components/CVBuildUi/FormSections"),
);

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
