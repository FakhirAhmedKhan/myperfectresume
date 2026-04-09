import { BriefcaseIcon, GraduationCapIcon, CodeIcon, UserIcon } from "../../index";
import { Input, Textarea, DynamicSection } from "../index";
import { Section } from "./FormSections";
import { useCvBuilder } from "../../configs";

const ResumeForm = () => {
  const { CVBuilder } = useCvBuilder();
  const { resumeData, setResumeData, addItem, removeItem, updateItem, handlePersonalInfo } = CVBuilder;
  if (!resumeData) return null;

  return (
    <div className="flex flex-col gap-8 pb-32">
      {/* Personal Info */}
      <Section title="Personal Information" icon={<UserIcon size={20} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="fullName"
            value={resumeData.personalInfo.fullName}
            onChange={handlePersonalInfo}
            placeholder="John Doe"
          />
          <Input
            label="Professional Title"
            name="title"
            value={resumeData.personalInfo.title}
            onChange={handlePersonalInfo}
            placeholder="Software Engineer"
          />
          <Input
            label="Email"
            name="email"
            value={resumeData.personalInfo.email}
            onChange={handlePersonalInfo}
            placeholder="john@example.com"
          />
          <Input
            label="Phone"
            name="phone"
            value={resumeData.personalInfo.phone}
            onChange={handlePersonalInfo}
            placeholder="+1 234 567 890"
          />
          <Input
            className="md:col-span-2"
            label="Location"
            name="location"
            value={resumeData.personalInfo.location}
            onChange={handlePersonalInfo}
            placeholder="New York, NY"
          />
          <Textarea
            className="md:col-span-2"
            label="Profile Summary"
            name="summary"
            value={resumeData.personalInfo.summary}
            onChange={handlePersonalInfo}
            placeholder="Highly motivated engineer with..."
          />
        </div>
      </Section>

      {/* Experience */}
      <DynamicSection
        title="Experience"
        icon={<BriefcaseIcon size={20} />}
        items={resumeData.experience}
        onAdd={() =>
          addItem("experience", {
            id: Date.now(),
            company: "",
            position: "",
            date: "",
            desc: "",
          })
        }
        onRemove={(id) => removeItem("experience", id)}
        onUpdate={(id, data) => updateItem("experience", id, data)}
        renderItem={(item, update) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company"
              value={item.company}
              onChange={(e) => update({ company: e.target.value })}
            />
            <Input
              label="Position"
              value={item.position}
              onChange={(e) => update({ position: e.target.value })}
            />
            <Input
              type="date"
              className="md:col-span-2"
              label="Duration"
              value={item.date}
              onChange={(e) => update({ date: e.target.value })}
              placeholder="Jan 2020 - Present"
            />
            <Textarea
              className="md:col-span-2"
              label="Description"
              value={item.desc}
              onChange={(e) => update({ desc: e.target.value })}
            />
          </div>
        )}
      />

      {/* Education */}
      <DynamicSection
        title="Education"
        icon={<GraduationCapIcon size={20} />}
        items={resumeData.education}
        onAdd={() =>
          addItem("education", {
            id: Date.now(),
            school: "",
            degree: "",
            date: "",
          })
        }
        onRemove={(id) => removeItem("education", id)}
        onUpdate={(id, data) => updateItem("education", id, data)}
        renderItem={(item, update) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="School / University"
              value={item.school}
              onChange={(e) => update({ school: e.target.value })}
            />
            <Input
              label="Degree"
              value={item.degree}
              onChange={(e) => update({ degree: e.target.value })}
            />
            <Input
              className="md:col-span-2"
              label="Duration / Graduation"
              value={item.date}
              onChange={(e) => update({ date: e.target.value })}
              placeholder="2016 - 2020"
            />
          </div>
        )}
      />
      {/* Projects */}
      <DynamicSection
        title="Projects"
        icon={<BriefcaseIcon size={20} />}
        items={resumeData.projects}
        onAdd={() =>
          addItem("projects", { id: Date.now(), name: "", link: "", desc: "" })
        }
        onRemove={(id) => removeItem("projects", id)}
        onUpdate={(id, data) => updateItem("projects", id, data)}
        renderItem={(item, update) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Project Name"
              value={item.name}
              onChange={(e) => update({ name: e.target.value })}
            />
            <Input
              label="Project Link"
              value={item.link}
              onChange={(e) => update({ link: e.target.value })}
            />
            <Input
              className="md:col-span-2"
              label="Project Description"
              value={item.desc}
              onChange={(e) => update({ desc: e.target.value })}
              placeholder="Built a full-stack..."
            />
          </div>
        )}
      />

      {/* Skills */}
      <Section title="Skills" icon={<CodeIcon size={20} />}>
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-500 mb-2">
            Comma-separated skills list (e.g. React, Node, Tailwind)
          </p>
          <input
            className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            placeholder="React, Node.js, TypeScript..."
            value={resumeData.skills.join(", ")}
            onChange={(e) => {
              const skills = e.target.value.split(",").map((s) => s.trim());
              setResumeData((prev) => ({ ...prev, skills }));
            }}
          />
        </div>
      </Section>
    </div>
  );
};

export default ResumeForm;
