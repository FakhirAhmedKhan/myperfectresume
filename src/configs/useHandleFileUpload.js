import { useCallback } from "react";

export const useHandleFileUpload = ({
  setIsExtracting,
  setStatus,
  updateCheckerPersonalInfo,
  setMode,
}) => {
  const handleFileUpload = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file || file.type !== "application/pdf") return;

      setIsExtracting(true);
      setStatus("Loading PDF engine...");

      try {
        const pdfjs = await import("pdfjs-dist");
        const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.mjs?url");

        pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

        setStatus("Reading PDF...");

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();

          const pageText = textContent.items
            .filter((item) => typeof item.str === "string")
            .map((item) => item.str)
            .join(" ");

          fullText += pageText + "\n";
        }

        if (!fullText.trim()) {
          setStatus("Loading OCR engine...");

          const Tesseract = (await import("tesseract.js")).default;

          fullText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            setStatus(`OCR on page ${i}...`);

            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2.0 });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (!context) {
              throw new Error("Canvas context not available");
            }

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
              canvasContext: context,
              viewport,
            }).promise;

            const {
              data: { text },
            } = await Tesseract.recognize(canvas.toDataURL("image/png"), "eng");

            fullText += text + "\n";
          }
        }

        if (fullText.trim()) {
          updateCheckerPersonalInfo({ summary: fullText.trim() });
          setMode("raw");
        }
      } catch (error) {
        console.error("Failed to extract PDF text:", error);
        alert("Failed to extract text.");
      } finally {
        setIsExtracting(false);
        setStatus("");
        e.target.value = "";
      }
    },
    [setIsExtracting, setStatus, updateCheckerPersonalInfo, setMode],
  );

  return handleFileUpload;
};

export default useHandleFileUpload;
