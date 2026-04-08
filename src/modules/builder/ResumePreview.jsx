import { ModernTemplate, ProfessionalTemplate } from "../../index";

const ResumePreview = ({ templateId = "professional", personalInfo, experience, education, skills, projects }) => {

    if (templateId === "modern") {
        return <ModernTemplate personalInfo={personalInfo} experience={experience} education={education} skills={skills} projects={projects} />;
    }

    // Default Professional Template
    return <ProfessionalTemplate personalInfo={personalInfo} experience={experience} education={education} skills={skills} projects={projects} />;
};

export default ResumePreview;

