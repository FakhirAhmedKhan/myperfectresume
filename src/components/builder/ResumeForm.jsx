import { useAppStore } from "../../store/AppStore";
import { Plus, Trash2, Briefcase, GraduationCap, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ResumeForm = () => {
    const { resumeData, setResumeData, updatePersonalInfo, addItem, removeItem, updateItem } = useAppStore();

    const handlePersonalInfo = (e) => {
        const { name, value } = e.target;
        updatePersonalInfo({ [name]: value });
    };

    return (
        <div className="flex flex-col gap-8 pb-32">
            {/* Personal Info */}
            <Section title="Personal Information" icon={<UserIcon size={20} />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Full Name" name="fullName" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfo} placeholder="John Doe" />
                    <Input label="Professional Title" name="title" value={resumeData.personalInfo.title} onChange={handlePersonalInfo} placeholder="Software Engineer" />
                    <Input label="Email" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfo} placeholder="john@example.com" />
                    <Input label="Phone" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfo} placeholder="+1 234 567 890" />
                    <Input className="md:col-span-2" label="Location" name="location" value={resumeData.personalInfo.location} onChange={handlePersonalInfo} placeholder="New York, NY" />
                    <Textarea className="md:col-span-2" label="Profile Summary" name="summary" value={resumeData.personalInfo.summary} onChange={handlePersonalInfo} placeholder="Highly motivated engineer with..." />
                </div>
            </Section>

            {/* Experience */}
            <DynamicSection 
                title="Experience" 
                icon={<Briefcase size={20} />} 
                items={resumeData.experience}
                onAdd={() => addItem("experience", { id: Date.now(), company: "", position: "", date: "", desc: "" })}
                onRemove={(id) => removeItem("experience", id)}
                onUpdate={(id, data) => updateItem("experience", id, data)}
                renderItem={(item, update) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Company" value={item.company} onChange={(e) => update({ company: e.target.value })} />
                        <Input label="Position" value={item.position} onChange={(e) => update({ position: e.target.value })} />
                        <Input className="md:col-span-2" label="Duration" value={item.date} onChange={(e) => update({ date: e.target.value })} placeholder="Jan 2020 - Present" />
                        <Textarea className="md:col-span-2" label="Description" value={item.desc} onChange={(e) => update({ desc: e.target.value })} />
                    </div>
                )}
            />

            {/* Education */}
            <DynamicSection 
                title="Education" 
                icon={<GraduationCap size={20} />} 
                items={resumeData.education}
                onAdd={() => addItem("education", { id: Date.now(), school: "", degree: "", date: "" })}
                onRemove={(id) => removeItem("education", id)}
                onUpdate={(id, data) => updateItem("education", id, data)}
                renderItem={(item, update) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="School / University" value={item.school} onChange={(e) => update({ school: e.target.value })} />
                        <Input label="Degree" value={item.degree} onChange={(e) => update({ degree: e.target.value })} />
                        <Input className="md:col-span-2" label="Duration / Graduation" value={item.date} onChange={(e) => update({ date: e.target.value })} placeholder="2016 - 2020" />
                    </div>
                )}
            />

            {/* Skills */}
            <Section title="Skills" icon={<Code size={20} />}>
                 <div className="flex flex-col gap-2">
                     <p className="text-xs text-gray-500 mb-2">Comma-separated skills list (e.g. React, Node, Tailwind)</p>
                     <input 
                        className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        placeholder="React, Node.js, TypeScript..."
                        value={resumeData.skills.join(", ")}
                        onChange={(e) => {
                             const skills = e.target.value.split(",").map(s => s.trim());
                             setResumeData(prev => ({...prev, skills}));
                        }}
                     />
                 </div>
            </Section>
        </div>
    );
};

const Section = ({ title, icon, children }) => (
    <div className="flex flex-col gap-6 p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-3">
             <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-100 dark:border-blue-800">
                {icon}
             </div>
             <h3 className="text-xl font-bold">{title}</h3>
        </div>
        {children}
    </div>
);

const DynamicSection = ({ title, icon, items, onAdd, onRemove, onUpdate, renderItem }) => (
    <Section title={title} icon={icon}>
        <div className="flex flex-col gap-4">
            <AnimatePresence>
                {items.map((item) => (
                    <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-5 border dark:border-gray-800 rounded-2xl relative group bg-gray-50/30 dark:bg-gray-800/30"
                    >
                        <button 
                            onClick={() => onRemove(item.id)}
                            className="absolute -top-2 -right-2 p-2 bg-red-50 text-red-500 rounded-full border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-500 hover:text-white"
                        >
                            <Trash2 size={14} />
                        </button>
                        {renderItem(item, (newData) => onUpdate(item.id, { ...item, ...newData }))}
                    </motion.div>
                ))}
            </AnimatePresence>
            <button 
                onClick={onAdd}
                className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center gap-2 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
            >
                <Plus size={20} />
                Add {title} Entry
            </button>
        </div>
    </Section>
);

const Input = ({ label, className, ...props }) => (
    <div className={`flex flex-col gap-2 ${className}`}>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">{label}</label>
        <input 
            className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            {...props}
        />
    </div>
);

const Textarea = ({ label, className, ...props }) => (
    <div className={`flex flex-col gap-2 ${className}`}>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">{label}</label>
        <textarea 
            className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none"
            {...props}
        />
    </div>
);

const UserIcon = ({size}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
)

export default ResumeForm;
