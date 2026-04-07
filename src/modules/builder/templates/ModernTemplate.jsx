import { MailIcon, PhoneIcon, MapPinIcon } from "../../../index";

const ModernTemplate = ({ personalInfo, experience, education, skills }) => (
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
                        {personalInfo.email && <div className="flex items-center gap-3"><MailIcon size={16} className="text-blue-400 shrink-0" /> {personalInfo.email}</div>}
                        {personalInfo.phone && <div className="flex items-center gap-3"><PhoneIcon size={16} className="text-blue-400 shrink-0" /> {personalInfo.phone}</div>}
                        {personalInfo.location && <div className="flex items-center gap-3"><MapPinIcon size={16} className="text-blue-400 shrink-0" /> {personalInfo.location}</div>}
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

export default ModernTemplate;
