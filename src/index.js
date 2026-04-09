import { lazy } from "react";

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
