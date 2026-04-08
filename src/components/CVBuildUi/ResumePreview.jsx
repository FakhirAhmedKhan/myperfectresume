import { ModernTemplate, ProfessionalTemplate } from "../../index";
import { useCvBuilder } from "../../configs/useCvBuilder";

const ResumePreview = () => {
    const { CVBuilder } = useCvBuilder();

    if (CVBuilder.template === "modern") { return <ModernTemplate /> }

    return <ProfessionalTemplate />;
};

export default ResumePreview;

