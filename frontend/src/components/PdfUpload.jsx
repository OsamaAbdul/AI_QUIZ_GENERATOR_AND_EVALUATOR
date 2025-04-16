import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { useNavigate } from "react-router-dom";

// Use the CDN version for the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

const PdfUpload = () => {
  const [fileName, setFileName] = useState("No file selected");
  const [fileError, setFileError] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileError("");
      setFileName(file.name);
      setPdfFile(file);
    } else {
      setFileError("Only PDF files are allowed");
      setFileName("No file selected");
      setPdfFile(null);
    }
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str).join(" ");
      fullText += strings + "\n";
    }

    return fullText;
  };

  const handleSendToOpenAI = async () => {
    if (!pdfFile) {
      setFileError("Please select a PDF file first.");
      return;
    }

    setLoading(true);

    try {
      const text = await extractTextFromPDF(pdfFile);
      setExtractedText(text);

      // Convert extracted text to JSON and log it
      const jsonData = { text };
      console.log("Extracted Text in JSON:", JSON.stringify(jsonData, null, 2));

      const response = await fetch("http://localhost:5000/api/user/pdf-to-mcq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const result = await response.json();
      console.log("Quiz Data:", result);

      localStorage.setItem("quizData", JSON.stringify(result.quiz));
      navigate("/take-quiz");
    } catch (err) {
      console.error("Error:", err);
      alert(`Failed to process PDF: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      
      <div className="container">
      <h1 className="text-red-500">Upload your desired PDF and watch our machine do the magic...</h1>
        <div className="header">
          <p>Upload a PDF File</p>
        </div>

        <label htmlFor="file" className="footer">
          <p>{fileName}</p>
        </label>

        <input
          id="file"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {fileError && (
          <p style={{ color: "red", fontSize: "0.8rem" }}>{fileError}</p>
        )}

        <button
          onClick={handleSendToOpenAI}
          disabled={!pdfFile || loading}
          className={`mt-4 w-full px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 
            ${
              pdfFile
                ? "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          {loading ? "Extracting & Generating..." : "Generate Quiz"}
        </button>

        {extractedText && (
          <div className="mt-4 p-4 border rounded bg-gray-50 max-h-[200px] overflow-y-auto text-sm">
            <strong>Preview Extracted Text:</strong>
            <p>{extractedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfUpload;