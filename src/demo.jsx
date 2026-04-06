
import { StrictMode, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    GraduationCap,
    Award,
    Download,
    Eye,
    Edit3,
    Sparkles,
} from "lucide-react";

// eslint-disable-next-line react-refresh/only-export-components
const CVGenerator = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [cvData, setCvData] = useState({
        personal: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            summary: "",
        },
        experience: [{ company: "", position: "", duration: "", description: "" }],
        education: [{ institution: "", degree: "", year: "", gpa: "" }],
        skills: [],
        achievements: [],
    });

    const [newSkill, setNewSkill] = useState("");
    const [newAchievement, setNewAchievement] = useState("");
    const [viewMode, setViewMode] = useState("edit"); // 'edit' or 'preview'
    const previewRef = useRef();

    const steps = [
        { title: "Personal Info", icon: User },
        { title: "Experience", icon: Briefcase },
        { title: "Education", icon: GraduationCap },
        { title: "Skills & Awards", icon: Award },
    ];

    const updatePersonal = (field, value) => {
        setCvData((prev) => ({
            ...prev,
            personal: { ...prev.personal, [field]: value },
        }));
    };

    const updateExperience = (index, field, value) => {
        setCvData((prev) => ({
            ...prev,
            experience: prev.experience.map((exp, i) =>
                i === index ? { ...exp, [field]: value } : exp
            ),
        }));
    };

    const addExperience = () => {
        setCvData((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                { company: "", position: "", duration: "", description: "" },
            ],
        }));
    };

    const updateEducation = (index, field, value) => {
        setCvData((prev) => ({
            ...prev,
            education: prev.education.map((edu, i) =>
                i === index ? { ...edu, [field]: value } : edu
            ),
        }));
    };

    const addEducation = () => {
        setCvData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                { institution: "", degree: "", year: "", gpa: "" },
            ],
        }));
    };

    const addSkill = () => {
        if (newSkill.trim()) {
            setCvData((prev) => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()],
            }));
            setNewSkill("");
        }
    };

    const addAchievement = () => {
        if (newAchievement.trim()) {
            setCvData((prev) => ({
                ...prev,
                achievements: [...prev.achievements, newAchievement.trim()],
            }));
            setNewAchievement("");
        }
    };

    const removeSkill = (index) => {
        setCvData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    const removeAchievement = (index) => {
        setCvData((prev) => ({
            ...prev,
            achievements: prev.achievements.filter((_, i) => i !== index),
        }));
    };

    const downloadPDF = () => {
        // Simple PDF generation using browser's print functionality
        const printWindow = window.open("", "_blank");
        const cvContent = previewRef.current.innerHTML;

        printWindow.document.write(`
      <html>
        <head>
          <title>CV - ${cvData.personal.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: white; }
            .cv-preview { max-width: 800px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 18px; font-weight: bold; color: #333; border-bottom: 2px solid #667eea; padding-bottom: 5px; margin-bottom: 15px; }
            .experience-item, .education-item { margin-bottom: 15px; padding: 15px; border-left: 3px solid #667eea; background: #f8f9ff; }
            .skill-tag { display: inline-block; background: #667eea; color: white; padding: 5px 12px; border-radius: 20px; margin: 3px; font-size: 12px; }
            .contact-info { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 10px; }
            .contact-item { display: flex; align-items: center; gap: 5px; }
          </style>
        </head>
        <body>${cvContent}</body>
      </html>
    `);

        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={cvData.personal.fullName}
                                    onChange={(e) => updatePersonal("fullName", e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={cvData.personal.email}
                                    onChange={(e) => updatePersonal("email", e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={cvData.personal.phone}
                                    onChange={(e) => updatePersonal("phone", e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={cvData.personal.location}
                                    onChange={(e) => updatePersonal("location", e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                                    placeholder="New York, NY"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Professional Summary
                            </label>
                            <textarea
                                value={cvData.personal.summary}
                                onChange={(e) => updatePersonal("summary", e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm resize-none"
                                placeholder="Brief professional summary highlighting your key strengths and career objectives..."
                            />
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-6">
                        {cvData.experience.map((exp, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
                            >
                                <h3 className="text-lg font-semibold text-white mb-4">
                                    Experience {index + 1}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) =>
                                            updateExperience(index, "company", e.target.value)
                                        }
                                        className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Company Name"
                                    />
                                    <input
                                        type="text"
                                        value={exp.position}
                                        onChange={(e) =>
                                            updateExperience(index, "position", e.target.value)
                                        }
                                        className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Job Title"
                                    />
                                </div>
                                <input
                                    type="text"
                                    value={exp.duration}
                                    onChange={(e) =>
                                        updateExperience(index, "duration", e.target.value)
                                    }
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                    placeholder="Jan 2020 - Present"
                                />
                                <textarea
                                    value={exp.description}
                                    onChange={(e) =>
                                        updateExperience(index, "description", e.target.value)
                                    }
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Key responsibilities and achievements..."
                                />
                            </div>
                        ))}
                        <button
                            onClick={addExperience}
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
                        >
                            + Add Experience
                        </button>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        {cvData.education.map((edu, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
                            >
                                <h3 className="text-lg font-semibold text-white mb-4">
                                    Education {index + 1}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        value={edu.institution}
                                        onChange={(e) =>
                                            updateEducation(index, "institution", e.target.value)
                                        }
                                        className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="University Name"
                                    />
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) =>
                                            updateEducation(index, "degree", e.target.value)
                                        }
                                        className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Degree & Major"
                                    />
                                    <input
                                        type="text"
                                        value={edu.year}
                                        onChange={(e) =>
                                            updateEducation(index, "year", e.target.value)
                                        }
                                        className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Graduation Year"
                                    />
                                    <input
                                        type="text"
                                        value={edu.gpa}
                                        onChange={(e) =>
                                            updateEducation(index, "gpa", e.target.value)
                                        }
                                        className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="GPA (optional)"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={addEducation}
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
                        >
                            + Add Education
                        </button>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Add a skill..."
                                />
                                <button
                                    onClick={addSkill}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {cvData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 text-blue-100 rounded-full text-sm cursor-pointer hover:bg-red-500/20 transition-all duration-300"
                                        onClick={() => removeSkill(index)}
                                    >
                                        {skill} ×
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Achievements
                            </h3>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={newAchievement}
                                    onChange={(e) => setNewAchievement(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && addAchievement()}
                                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Add an achievement..."
                                />
                                <button
                                    onClick={addAchievement}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="space-y-2">
                                {cvData.achievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-200 cursor-pointer hover:bg-red-500/10 transition-all duration-300"
                                        onClick={() => removeAchievement(index)}
                                    >
                                        {achievement}{" "}
                                        <span className="text-red-400 float-right">×</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
        }
    };

    const CVPreview = () => (
        <div
            ref={previewRef}
            className="cv-preview bg-white text-gray-900 rounded-xl overflow-hidden shadow-2xl"
        >
            {/* Header */}
            <div className="header bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
                <h1 className="text-3xl font-bold mb-2">
                    {cvData.personal.fullName || "Your Name"}
                </h1>
                <div className="contact-info flex flex-wrap gap-4 text-sm">
                    {cvData.personal.email && (
                        <div className="contact-item flex items-center gap-1">
                            <Mail size={16} />
                            <span>{cvData.personal.email}</span>
                        </div>
                    )}
                    {cvData.personal.phone && (
                        <div className="contact-item flex items-center gap-1">
                            <Phone size={16} />
                            <span>{cvData.personal.phone}</span>
                        </div>
                    )}
                    {cvData.personal.location && (
                        <div className="contact-item flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{cvData.personal.location}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-8">
                {/* Summary */}
                {cvData.personal.summary && (
                    <div className="section mb-6">
                        <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">
                            Professional Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {cvData.personal.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {cvData.experience.some((exp) => exp.company || exp.position) && (
                    <div className="section mb-6">
                        <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">
                            Professional Experience
                        </h2>
                        {cvData.experience.map(
                            (exp, index) =>
                                (exp.company || exp.position) && (
                                    <div
                                        key={index}
                                        className="experience-item mb-4 p-4 border-l-4 border-blue-600 bg-blue-50"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-800">
                                                    {exp.position}
                                                </h3>
                                                <p className="text-blue-600 font-medium">
                                                    {exp.company}
                                                </p>
                                            </div>
                                            <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">
                                                {exp.duration}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <p className="text-gray-700 mt-2">{exp.description}</p>
                                        )}
                                    </div>
                                )
                        )}
                    </div>
                )}

                {/* Education */}
                {cvData.education.some((edu) => edu.institution || edu.degree) && (
                    <div className="section mb-6">
                        <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">
                            Education
                        </h2>
                        {cvData.education.map(
                            (edu, index) =>
                                (edu.institution || edu.degree) && (
                                    <div
                                        key={index}
                                        className="education-item mb-4 p-4 border-l-4 border-green-600 bg-green-50"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-800">
                                                    {edu.degree}
                                                </h3>
                                                <p className="text-green-600 font-medium">
                                                    {edu.institution}
                                                </p>
                                            </div>
                                            <div className="text-right text-sm text-gray-600">
                                                {edu.year && <div>{edu.year}</div>}
                                                {edu.gpa && <div>GPA: {edu.gpa}</div>}
                                            </div>
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                )}

                {/* Skills */}
                {cvData.skills.length > 0 && (
                    <div className="section mb-6">
                        <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {cvData.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="skill-tag bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Achievements */}
                {cvData.achievements.length > 0 && (
                    <div className="section">
                        <h2 className="section-title text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">
                            Achievements
                        </h2>
                        <ul className="space-y-2">
                            {cvData.achievements.map((achievement, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <Award
                                        className="text-yellow-600 mt-1 flex-shrink-0"
                                        size={16}
                                    />
                                    <span className="text-gray-700">{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="text-blue-400" size={32} />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Futuristic CV Generator
                        </h1>
                    </div>
                    <p className="text-gray-300 text-lg">
                        Create professional CVs with cutting-edge design
                    </p>
                </div>

                {/* Mode Toggle */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                        <button
                            onClick={() => setViewMode("edit")}
                            className={`px-6 py-2 rounded-md transition-all duration-300 flex items-center gap-2 ${viewMode === "edit"
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-300 hover:text-white"
                                }`}
                        >
                            <Edit3 size={16} />
                            Edit Mode
                        </button>
                        <button
                            onClick={() => setViewMode("preview")}
                            className={`px-6 py-2 rounded-md transition-all duration-300 flex items-center gap-2 ${viewMode === "preview"
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-300 hover:text-white"
                                }`}
                        >
                            <Eye size={16} />
                            Preview
                        </button>
                    </div>
                </div>

                {viewMode === "edit" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Form Side */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                            {/* Step Navigation */}
                            <div className="flex justify-between mb-8">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentStep(index)}
                                            className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 ${currentStep === index
                                                    ? "bg-blue-500 text-white"
                                                    : "text-gray-400 hover:text-white hover:bg-white/10"
                                                }`}
                                        >
                                            <Icon size={20} />
                                            <span className="text-xs hidden sm:block">
                                                {step.title}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Step Content */}
                            <div className="mb-8">{renderStepContent()}</div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between">
                                <button
                                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                                    disabled={currentStep === 0}
                                    className="px-6 py-3 bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-all duration-300"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
                                    }
                                    disabled={currentStep === steps.length - 1}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        {/* Preview Side */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-white">
                                    Live Preview
                                </h2>
                                <button
                                    onClick={downloadPDF}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300"
                                >
                                    <Download size={16} />
                                    Download PDF
                                </button>
                            </div>
                            <div className="max-h-[800px] overflow-y-auto">
                                <CVPreview />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-center mb-6">
                            <button
                                onClick={downloadPDF}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 text-lg"
                            >
                                <Download size={20} />
                                Download CV as PDF
                            </button>
                        </div>
                        <CVPreview />
                    </div>
                )}
            </div>
        </div>
    );
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CVGenerator />
    </StrictMode>
);
