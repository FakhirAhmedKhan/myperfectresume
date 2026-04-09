import { HeroSection, FeatureHighlights } from "./index";

const HomePage = ({ onPageChange }) => {
    return (
        <div className="overflow-hidden flex flex-col items-center justify-center px-4">
            <HeroSection onPageChange={onPageChange} />
            <FeatureHighlights />
        </div>
    );
};

export default HomePage;
