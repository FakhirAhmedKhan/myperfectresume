import { Routes, Route } from "react-router-dom";
import { HomePage, BuilderPage, CheckerPage } from "../index";

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
