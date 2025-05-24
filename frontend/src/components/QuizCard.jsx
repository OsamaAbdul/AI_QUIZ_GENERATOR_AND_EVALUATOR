import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const QuizCard = ({ question, options, selected, correctAnswerText, onAnswer }) => {
  const [feedback, setFeedback] = useState(null);

  // Helper to extract answer text from a labeled option string like "A: Web Dev"
  const extractText = (option) =>
    option?.split(":").slice(1).join(":").trim().toLowerCase();

  // Handle feedback display
  useEffect(() => {
    if (selected) {
      const selectedText = extractText(selected);
      const correctText = correctAnswerText?.toLowerCase();
      const isCorrect = selectedText === correctText;

      setFeedback(isCorrect ? "Correct!" : "Incorrect!");
      if (isCorrect) {
        confetti({ particleCount: 30, spread: 40 });
      }

      const timer = setTimeout(() => setFeedback(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [selected, correctAnswerText]);

  const getButtonStyles = (opt) => {
    const selectedText = extractText(selected);
    const currentText = extractText(opt);
    const isSelected = selected === opt;
    const isCorrect = currentText === correctAnswerText?.toLowerCase();

    return {
      base: `w-full p-3 sm:p-4 text-left rounded-lg border flex items-center space-x-2 sm:space-x-3 transition-all duration-200
        ${selected ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-600"}`,
      selected: isSelected
        ? isCorrect
          ? "bg-green-900/50 border-green-500 text-green-200 animate-glow"
          : "bg-red-900/50 border-red-500 text-red-200 animate-shake"
        : "bg-gray-700/50 border-gray-600 text-gray-200",
      correct: selected && isCorrect ? "ring-2 ring-green-400" : "",
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 mb-4 border border-gray-700"
    >
      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{question}</h3>
      <div className="space-y-2 sm:space-y-3">
        {options.map((opt, idx) => (
          <motion.button
            key={idx}
            onClick={() => onAnswer(opt)}
            disabled={selected !== null}
            whileHover={selected ? {} : { scale: 1.02 }}
            whileTap={selected ? {} : { scale: 0.98 }}
            className={`${getButtonStyles(opt).base} ${getButtonStyles(opt).selected} ${getButtonStyles(opt).correct}`}
            title={selected ? "Answers locked" : "Select this option"}
          >
            <span className="font-semibold w-5 sm:w-6">{String.fromCharCode(65 + idx)}.</span>
            <span className="flex-1 text-sm sm:text-base">{extractText(opt)}</span>
            <AnimatePresence>
              {selected === opt && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-auto"
                >
                  {extractText(opt) === correctAnswerText?.toLowerCase() ? (
                    <FaCheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  ) : (
                    <FaTimesCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* <AnimatePresence>
        {feedback && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={`mt-3 sm:mt-4 text-center text-sm sm:text-base font-semibold ${
              feedback === "Correct!" ? "text-green-400" : "text-red-400"
            }`}
          >
            {feedback}
          </motion.p>
        )}
      </AnimatePresence> */}
    </motion.div>
  );
};

export default QuizCard;
