import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Use the CDN version for the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

const PdfUpload = () => {
  const [fileName, setFileName] = useState("No file selected");
  const [fileError, setFileError] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Processing...");
  const [extractedText, setExtractedText] = useState("");
  const [userPrompt, setPrompt] = useState("");
  const [quizCount, setQuizCount] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Auto-clear error after 3 seconds
  useEffect(() => {
    if (fileError) {
      const timer = setTimeout(() => setFileError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [fileError]);

  // Dynamic loading text
  useEffect(() => {
    if (loading) {
      const texts = ["Analyzing PDF...", "Extracting Text...", "Generating Quiz..."];
      let index = 0;
      const interval = setInterval(() => {
        setLoadingText(texts[index]);
        index = (index + 1) % texts.length;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileError("");
      setFileName(file.name);
      setPdfFile(file);
      // Optional sound effect
      // new Audio("/sounds/upload.mp3").play();
    } else {
      setFileError("Only PDF files are allowed");
      setFileName("Click to select a PDF");
      setPdfFile(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setFileError("");
      setFileName(file.name);
      setPdfFile(file);
    } else {
      setFileError("Only PDF files are allowed");
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
      const apiUrl = import.meta.env.VITE_API_URL;
      const text = await extractTextFromPDF(pdfFile);
      setExtractedText(text);

      const jsonData = { text, userPrompt, quizCount: parseInt(quizCount) || 5 };
      console.log("Extracted Text in JSON:", JSON.stringify(jsonData, null, 2));

      const response = await fetch(`${apiUrl}/api/user/pdf-to-mcq`, {
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

      // Confetti effect on success
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      localStorage.setItem("quizData", JSON.stringify(result.quiz));
      navigate("/take-quiz");
    } catch (err) {
      console.error("Error:", err);
      setFileError(`Failed to process PDF: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6 space-y-6"
      >
        <h1 className="text-2xl font-bold text-white text-center">
          Upload a PDF to Generate a Quiz
        </h1>
        <p className="text-gray-400 text-center text-sm animate-pulse">
          Drop your PDF or click to upload!
        </p>

        {/* Drag-and-Drop File Input */}
        <motion.label
          htmlFor="file"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
          className={`block w-full p-4 bg-gray-700/50 rounded-lg text-gray-300 text-center cursor-pointer transition-all duration-300 border-2 ${
            isDragging ? "border-indigo-500 bg-indigo-900/20" : "border-transparent"
          }`}
        >
          <motion.div
            animate={{ scale: pdfFile ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg
              className="mx-auto h-8 w-8 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="font-medium">{fileName}</span>
          </motion.div>
          <input
            id="file"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </motion.label>
        <AnimatePresence>
          {fileError && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="text-red-400 text-sm text-center animate-shake"
            >
              {fileError}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Prompt Input with Character Count */}
        <div className="relative">
          <motion.input
            type="text"
            placeholder="Enter a prompt (optional)"
            value={userPrompt}
            onChange={(e) => setPrompt(e.target.value)}
            maxLength={500}
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
          <span className="absolute right-3 top-3 text-gray-500 text-xs">
            {prompt.length}/500
          </span>
        </div>

        {/* Quiz Count Input */}
        <motion.input
          type="number"
          placeholder="Number of quiz questions (default: 5)"
          value={quizCount}
          onChange={(e) => setQuizCount(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          className="w-full p-3 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />

        {/* Generate Button */}
        <motion.button
          onClick={handleSendToOpenAI}
          disabled={!pdfFile || loading}
          whileHover={{ scale: pdfFile && !loading ? 1.05 : 1 }}
          whileTap={{ scale: pdfFile && !loading ? 0.95 : 1 }}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center ${
            pdfFile && !loading
              ? "bg-indigo-600 hover:bg-indigo-700 animate-pulse"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="h-2 w-2 bg-white rounded-full"
                />
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                  className="h-2 w-2 bg-white rounded-full"
                />
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 0.5, delay: 0.4 }}
                  className="h-2 w-2 bg-white rounded-full"
                />
              </div>
              <span>{loadingText}</span>
            </div>
          ) : (
            "Generate Quiz"
          )}
        </motion.button>

        {/* Extracted Text Preview */}
        <AnimatePresence>
          {extractedText && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="p-4 bg-gray-700/50 rounded-lg max-h-48 overflow-y-auto text-sm text-gray-300 relative"
            >
              <p className="font-medium text-white mb-2">Extracted Text Preview:</p>
              <p className="whitespace-pre-wrap">{extractedText}</p>
              <motion.button
                onClick={handleCopyText}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 p-1 bg-indigo-600 text-white rounded-full"
                title={copied ? "Copied!" : "Copy to Clipboard"}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PdfUpload;