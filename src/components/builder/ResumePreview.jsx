import { useAppStore } from "../../store/AppStore";
import { Mail, Phone, MapPin } from "lucide-react";

const ResumePreview = ({ templateId = "professional" }) => {
    const { resumeData } = useAppStore();
    const { personalInfo, experience, education, skills } = resumeData;

    if (templateId === "modern") {
        return (
            <div id="resume-preview-content" className="flex flex-col md:flex-row bg-white text-gray-900 min-h-[1100px] shadow-2xl font-sans">
                {/* Modern Sidebar */}
                <div className="w-full md:w-1/3 bg-gray-900 text-white p-8">
                    <div className="mb-10">
                        <h1 className="text-3xl font-black mb-2 leading-tight uppercase">{personalInfo.fullName || "Your Name"}</h1>
                        <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">{personalInfo.title || "Job Title"}</p>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="text-xs font-black uppercase text-gray-500 mb-4 tracking-[0.2em] border-b border-gray-800 pb-2">Contact</h3>
                            <div className="flex flex-col gap-3 text-sm">
                                {personalInfo.email && <div className="flex items-center gap-3"><Mail size={16} className="text-blue-400 shrink-0" /> {personalInfo.email}</div>}
                                {personalInfo.phone && <div className="flex items-center gap-3"><Phone size={16} className="text-blue-400 shrink-0" /> {personalInfo.phone}</div>}
                                {personalInfo.location && <div className="flex items-center gap-3"><MapPin size={16} className="text-blue-400 shrink-0" /> {personalInfo.location}</div>}
                            </div>
                        </div>

                        {skills.length > 0 && (
                            <div>
                                <h3 className="text-xs font-black uppercase text-gray-500 mb-4 tracking-[0.2em] border-b border-gray-800 pb-2">Top Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, i) => (
                                        <span key={i} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs font-semibold">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="w-full md:w-2/3 p-10 bg-white">
                    {personalInfo.summary && (
                        <div className="mb-10">
                            <h2 className="text-xl font-black mb-4 uppercase border-b-2 border-gray-100 pb-2">Professional Summary</h2>
                            <p className="text-sm text-gray-600 leading-relaxed">{personalInfo.summary}</p>
                        </div>
                    )}

                    {experience.length > 0 && (
                        <div className="mb-10">
                            <h2 className="text-xl font-black mb-6 uppercase border-b-2 border-gray-100 pb-2">Experience</h2>
                            <div className="flex flex-col gap-8">
                                {experience.map(exp => (
                                    <div key={exp.id} className="relative pl-6 border-l-2 border-blue-500">
                                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1" />
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-lg">{exp.position}</h3>
                                            <span className="text-[10px] font-black uppercase text-gray-400 bg-gray-100 px-2 py-1 rounded">{exp.date}</span>
                                        </div>
                                        <p className="text-blue-600 font-bold text-sm mb-3 underline decoration-blue-200 underline-offset-2">{exp.company}</p>
                                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {education.length > 0 && (
                        <div>
                            <h2 className="text-xl font-black mb-4 uppercase border-b-2 border-gray-100 pb-2">Education</h2>
                            <div className="flex flex-col gap-4">
                                {education.map(edu => (
                                    <div key={edu.id}>
                                         <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold text-sm">{edu.degree}</h3>
                                            <span className="text-[10px] font-black text-gray-400">{edu.date}</span>
                                         </div>
                                         <p className="text-sm text-gray-500 italic">{edu.school}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default Professional Template
    return (
        <div id="resume-preview-content" className="p-12 bg-white text-gray-900 min-h-[1056px] shadow-2xl font-serif">
            {/* Professional Header */}
            <header className="text-center mb-10 border-b-2 border-gray-900 pb-8">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2 uppercase">{personalInfo.fullName || "Your Name"}</h1>
                <p className="text-xl text-gray-700 font-medium italic mb-4">{personalInfo.title || "Target Job Title"}</p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                    {personalInfo.email && <ContactItem icon={<Mail size={14} />} text={personalInfo.email} />}
                    {personalInfo.phone && <ContactItem icon={<Phone size={14} />} text={personalInfo.phone} />}
                    {personalInfo.location && <ContactItem icon={<MapPin size={14} />} text={personalInfo.location} />}
                </div>
            </header>

            {personalInfo.summary && (
                <section className="mb-10">
                    <h2 className="text-lg font-bold border-b border-gray-400 mb-4 uppercase tracking-widest">Professional Summary</h2>
                    <p className="text-justify text-sm leading-relaxed">{personalInfo.summary}</p>
                </section>
            )}

            {experience.length > 0 && (
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

            {education.length > 0 && (
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

            {skills.length > 0 && (
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
        </div>
    );
};

const ContactItem = ({ icon, text }) => (
    <div className="flex items-center gap-2">
        <span className="text-gray-900 shrink-0">{icon}</span>
        <span>{text}</span>
    </div>
);

export default ResumePreview;
