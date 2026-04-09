import { useCallback } from "react";

export const useHandleDownload = ({
  resumeData,
  setIsExporting
}) => {
  const handleDownload = useCallback(
    async () => {
      setIsExporting(true);

      try {
        const { default: html2pdf } = await import("html2pdf.js");
        const element = document.getElementById("resume-preview-content");

        const opt = {
          margin: 0,
          filename: `${resumeData.personalInfo.fullName || "Resume"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 3,
            useCORS: true,
            letterRendering: true,
            onclone: (clonedDoc) => {
              const el = clonedDoc.getElementById("resume-preview-content");

              if (el) {
                el.classList.add("pdf-export-mode");

                const sanitizeElements = (node) => {
                  if (node.nodeType === 1) {
                    const style = window.getComputedStyle(node);

                    [
                      "color",
                      "backgroundColor",
                      "borderColor",
                      "outlineColor",
                      "fill",
                      "stroke",
                    ].forEach((prop) => {
                      const value = style[prop];
                      if (value && value.includes("oklch")) {
                        node.style[prop] = prop
                          .toLowerCase()
                          .includes("background")
                          ? "#ffffff"
                          : "#000000";
                      }
                    });

                    node.childNodes.forEach(sanitizeElements);
                  }
                };

                sanitizeElements(el);
                el.style.backgroundColor = "white";
                el.style.color = "black";
              }

              clonedDoc.documentElement.classList.remove("dark");
            },
          },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        await html2pdf().set(opt).from(element).save();
      } catch (error) {
        console.error(error);
      } finally {
        setIsExporting(false);
      }
    },
    [setIsExporting, resumeData],
  );

  return handleDownload;
};

export default useHandleDownload;
