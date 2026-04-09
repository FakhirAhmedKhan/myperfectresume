import { lazy } from "react";

// Page-level components — lazy loaded for code splitting (these are large and route-level)
export const HomePage = lazy(() => import("@/components/HomePage"));
export const NavBar = lazy(() => import("@/components/Navbar"));
export const BuilderPage = lazy(() => import("@/components/BuilderPage"));
export const CheckerPage = lazy(() => import("@/components/CheckerPage"));

// Heavy UI components — lazy loaded (contain templates, complex forms)
const uiLazy = (path) => lazy(() => import(`./ui/${path}.jsx`));
export const ModernTemplate = uiLazy("ModernTemplate");
export const ProfessionalTemplate = uiLazy("ProfessionalTemplate");
export const ResumeForm = uiLazy("ResumeForm");
export const ResumePreview = uiLazy("ResumePreview");
export const ResumeInputPanel = uiLazy("ResumeInputPanel");
export const ATSResults = uiLazy("ATSResults");

// Lightweight UI components — eagerly imported (< 2KB each, universal usage)
export { default as InputColumn } from "./ui/InputColumn";
export { default as ResultsColumn } from "./ui/ResultsColumn";
export { default as BuildPageHeader } from "./ui/BuildPageHeader";
export { default as MobileTabToggle } from "./ui/MobileTabToggle";
export { default as HeroSection } from "./ui/HeroSection";
export { default as FeatureHighlights } from "./ui/FeatureHighlights";
export { default as FeatureCard } from "./ui/FeatureCard";
export { default as Input } from "./ui/Input";
export { default as Textarea } from "./ui/Textarea";
export { default as JobDescriptionPanel } from "./ui/JobDescriptionPanel";
export { default as RoleSelector } from "./ui/RoleSelector";
export { default as ScoreCard } from "./ui/ScoreCard";
export { default as ScoreBreakdown } from "./ui/ScoreBreakdown";
export { default as KeywordMatchPanel } from "./ui/KeywordMatchPanel";
export { default as MissingSectionsPanel } from "./ui/MissingSectionsPanel";
export { default as SuggestionsPanel } from "./ui/SuggestionsPanel";
export { default as ContactItem } from "./ui/ContactItem";
export { DynamicSection } from "./ui/FormSections";
