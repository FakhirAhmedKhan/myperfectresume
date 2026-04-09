export const flattenResume = (data) => {
  const pi = data.personalInfo || {};
  let text = `${pi.fullName || ""}\n${pi.title || ""}\n${pi.email || ""} ${pi.phone || ""} ${pi.location || ""}\n\n`;
  text += `SUMMARY\n${pi.summary || ""}\n\n`;

  text += "EXPERIENCE\n";
  (data.experience || []).forEach((exp) => {
    text += `${exp.position || ""} at ${exp.company || ""} (${exp.date || ""})\n${exp.desc || ""}\n\n`;
  });

  text += "EDUCATION\n";
  (data.education || []).forEach((edu) => {
    text += `${edu.degree || ""} - ${edu.school || ""} (${edu.date || ""})\n\n`;
  });

  text += `SKILLS\n${(data.skills || []).join(", ")}\n\n`;

  if (data.projects?.length > 0) {
    text += "PROJECTS\n";
    data.projects.forEach((proj) => {
      text += `${proj.name || ""}\n${proj.desc || ""}\n\n`;
    });
  }

  if (data.certifications?.length > 0) {
    text += "CERTIFICATIONS\n";
    data.certifications.forEach((cert) => {
      text += `${cert.name || ""} - ${cert.issuer || ""} (${cert.date || ""})\n\n`;
    });
  }

  return text.trim();
};

export const generateResumePreview = (data) => {
  // This helper can be used for any pre-processing of the resume data
  // before rendering it in the template.
  return data;
};