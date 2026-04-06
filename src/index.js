import { lazy } from "react";

export const HomePage = lazy(() => import("./pages/HomePage"));
export const BuilderPage = lazy(() => import("./pages/BuilderPage"));
export const CheckerPage = lazy(() => import("./pages/CheckerPage"));

export const FeatureCard = lazy(() => import("./components/common/FeatureCard"));
