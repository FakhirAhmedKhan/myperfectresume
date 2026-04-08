import { MailIcon, PhoneIcon, MapPinIcon, ContactItem } from "../index";
import { useCvBuilder } from "@/configs/useCvBuilder";

const ProfessionalTemplate = () => {
    const { CVBuilder } = useCvBuilder();
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = [] } = CVBuilder?.resumeData || {};
    return (<div id="resume-preview-content" className="p-12 bg-white text-gray-900 min-h-[1056px] shadow-2xl font-serif">
        <header className="text-center mb-10 border-b-2 border-gray-900 pb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 uppercase">{personalInfo.fullName || "Your Name"}</h1>
            <p className="text-xl text-gray-700 font-medium italic mb-4">{personalInfo.title || "Target Job Title"}</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                {personalInfo.email && <ContactItem icon={<MailIcon size={14} />} text={personalInfo.email} />}
                {personalInfo.phone && <ContactItem icon={<PhoneIcon size={14} />} text={personalInfo.phone} />}
                {personalInfo.location && <ContactItem icon={<MapPinIcon size={14} />} text={personalInfo.location} />}
            </div>
        </header>

        {personalInfo.summary && (
            <section className="mb-10">
                <h2 className="text-lg font-bold border-b border-gray-400 mb-4 uppercase tracking-widest">Professional Summary</h2>
                <p className="text-justify text-sm leading-relaxed">{personalInfo.summary}</p>
            </section>
        )}

        {experience?.length > 0 && (
            <section className="mb-10">
                <h2 className="text-lg font-bold border-b border-gray-400 mb-4 uppercase tracking-widest">Work Experience</h2>
                <div className="flex flex-col gap-6">
                    {experience.map((exp) => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-base">{exp.position}</h3>
                                <span className="text-xs font-bold text-gray-600">{exp.date}</span>
                            </div>
                            <div className="flex justify-between items-baseline mb-3">
                                <span className="text-sm font-semibold italic text-gray-800">{exp.company}</span>
                            </div>
                            <p className="text-sm text-justify whitespace-pre-line leading-relaxed pl-2 border-l-2 border-gray-100">{exp.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {education?.length > 0 && (
            <section className="mb-10">
                <h2 className="text-lg font-bold border-b border-gray-400 mb-4 uppercase tracking-widest">Education</h2>
                <div className="flex flex-col gap-4">
                    {education.map((edu) => (
                        <div key={edu.id} className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-sm uppercase">{edu.school}</h3>
                                <p className="text-sm italic">{edu.degree}</p>
                            </div>
                            <span className="text-xs font-bold text-gray-600">{edu.date}</span>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {projects?.length > 0 && (
            <section className="mb-10">
                <h2 className="text-lg font-bold border-b border-gray-400 mb-4 uppercase tracking-widest">Projects</h2>
                <div className="flex flex-col gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="flex justify-between items-start">
                            <h3 className="font-bold text-sm uppercase">{project.name}</h3>
                            <span className="text-xs font-bold text-gray-600">{project.date}</span>
                        </div>
                    ))
                    }
                </div>
            </section>
        )}

        {skills?.length > 0 && (
            <section>
                <h2 className="text-lg font-bold border-b border-gray-400 mb-4 uppercase tracking-widest">Key Skills</h2>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="text-sm font-medium flex items-center gap-2">
                            <div className="w-1 h-1 bg-black rounded-full" />
                            {skill}
                        </span>
                    ))}
                </div>
            </section>
        )}
    </div>)
};

export default ProfessionalTemplate;
