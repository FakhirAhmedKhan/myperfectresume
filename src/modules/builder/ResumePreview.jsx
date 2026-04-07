import { useAppStore } from "../../AppStore";
import { ModernTemplate, ProfessionalTemplate } from "../../index";

const ResumePreview = ({ templateId = "professional" }) => {
    const { resumeData } = useAppStore();
    const { personalInfo, experience, education, skills, projects } = resumeData;

    if (templateId === "modern") {
        return <ModernTemplate personalInfo={personalInfo} experience={experience} education={education} skills={skills} projects={projects} />;
    }

    // Default Professional Template
    return <ProfessionalTemplate personalInfo={personalInfo} experience={experience} education={education} skills={skills} projects={projects} />;
};

export default ResumePreview;

