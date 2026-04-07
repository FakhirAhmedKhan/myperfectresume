import { lazy } from "react";

export const HomePage = lazy(() => import("./pages/HomePage"));
export const BuilderPage = lazy(() => import("./pages/BuilderPage"));
export const CheckerPage = lazy(() => import("./pages/CheckerPage"));

export { default as FeatureCard } from "./components/common/FeatureCard";
export { UserIcon } from "./components/common/CustomIcons";

export const Input = lazy(() => import("./components/common/Input"));
export const Textarea = lazy(() => import("./components/common/Textarea"));

export const ModernTemplate = lazy(
  () => import("./components/builder/templates/ModernTemplate"),
);
export const ProfessionalTemplate = lazy(
  () => import("./components/builder/templates/ProfessionalTemplate"),
);

export const ResumeForm = lazy(() => import("./components/builder/ResumeForm"));
export const ResumePreview = lazy(
  () => import("./components/builder/ResumePreview"),
);

export const Layout = lazy(() => import("./components/layout/Layout.jsx"));
export const DynamicSection = lazy(
  () => import("./components/builder/FormSections"),
);

export const ResumeInputPanel = lazy(() => import("./modules/ats-checker/components/ResumeInputPanel"));
export const JobDescriptionPanel = lazy(() => import("./modules/ats-checker/components/JobDescriptionPanel"));
export const RoleSelector = lazy(() => import("./modules/ats-checker/components/RoleSelector"));
export const ATSResults = lazy(() => import("./modules/ats-checker/components/ATSResults"));

export const ScoreCard = lazy(() => import("./modules/ats-checker/components/ScoreCard"));
export const ScoreBreakdown = lazy(() => import("./modules/ats-checker/components/ScoreBreakdown"));
export const KeywordMatchPanel = lazy(() => import("./modules/ats-checker/components/KeywordMatchPanel"));
export const MissingSectionsPanel = lazy(() => import("./modules/ats-checker/components/MissingSectionsPanel"));
export const SuggestionsPanel = lazy(() => import("./modules/ats-checker/components/SuggestionsPanel"));