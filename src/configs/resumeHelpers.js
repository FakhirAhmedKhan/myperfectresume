export const flattenResume = (data) => {
  let text = `${data.personalInfo.fullName}\n${data.personalInfo.title}\n${data.personalInfo.email} ${data.personalInfo.phone} ${data.personalInfo.location}\n\n`;
  text += `SUMMARY\n${data.personalInfo.summary}\n\n`;

  text += "EXPERIENCE\n";
  data.experience.forEach((exp) => {
    text += `${exp.position} at ${exp.company} (${exp.date})\n${exp.desc}\n\n`;
  });

  text += "EDUCATION\n";
  data.education.forEach((edu) => {
    text += `${edu.degree} - ${edu.school} (${edu.date})\n\n`;
  });

  text += `SKILLS\n${data.skills.join(", ")}\n\n`;

  data.projects.forEach((proj) => {
    text += `${proj.name}\n${proj.desc}\n\n`;
  });

  return text.trim();
};