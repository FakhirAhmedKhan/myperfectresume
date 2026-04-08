import { HeroSection, FeatureHighlights } from "@/index";

const HomePage = () => {
    return (
        <div className="overflow-hidden flex flex-col items-center justify-center px-4">
            <HeroSection />
            <FeatureHighlights />
        </div>
    );
};

export default HomePage;
