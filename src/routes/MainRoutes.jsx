import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BuilderPage from "../pages/BuilderPage";
import CheckerPage from "../pages/CheckerPage";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/checker" element={<CheckerPage />} />
        </Routes>
    );
};

export default MainRoutes;
