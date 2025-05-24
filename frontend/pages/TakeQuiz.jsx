// src/components/TakeQuiz.jsx
import React, { useEffect, useState } from 'react';
import QuizHeader from '../src/components/QuizHeader.jsx';
import ProgressBar from '../src/components/ProgressBar.jsx';
import QuizCard from '../src/components/QuizCard.jsx';
import Explanation from '../src/components/Explanation.jsx';
import Controls from '../src/components/Controls.jsx';
import ResultScreen from '../src/components/ResultScreen.jsx';
import { shuffleArray, getMotivation } from '../src/utils/QuizUtils.jsx';
import useQuizTimer from '../src/hooks/useQuizTimer.jsx';

const TakeQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const { timeLeft, resetTimer, clearTimer } = useQuizTimer(30, () => handleSubmit(), showResult, quiz.length);

  useEffect(() => {
    const quizData = JSON.parse(localStorage.getItem('quizData'));
    if (quizData) {
      setQuiz(shuffleArray(quizData));
    }
  }, []);

  const handleAnswer = (option) => {
    if (!selected) setSelected(option);
  };

  const handleSubmit = () => {
    if (selected) {
      // Compare by clean text: strip "A: ..." label and compare to correctAnswerText
      const extractText = (opt) => opt?.split(':').slice(1).join(':').trim().toLowerCase();
      const selectedText = extractText(selected);
      const correctText = quiz[index].correctAnswerText?.toLowerCase();

      if (selectedText === correctText) {
        setScore((prev) => prev + 1);
      }

      if (index + 1 < quiz.length) {
        setIndex(index + 1);
        setSelected(null);
        resetTimer();
      } else {
        clearTimer();
        setShowResult(true);
      }
    }
  };

  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
      setSelected(null);
      resetTimer();
    }
  };

  const handleNext = () => {
    if (index + 1 < quiz.length && !selected) {
      setIndex(index + 1);
      resetTimer();
    }
  };

  if (!quiz.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading quiz...</p>
      </div>
    );
  }

  if (showResult) {
    return <ResultScreen score={score} total={quiz.length} motivation={getMotivation(score, quiz.length)} />;
  }

  const current = quiz[index];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all duration-500">
        {selected && <Explanation text={current.explanation} />}
        <QuizHeader index={index} total={quiz.length} timeLeft={timeLeft} />
        <ProgressBar index={index} total={quiz.length} />

        <QuizCard
          question={current.question}
          options={current.options}
          selected={selected}
          correctAnswerText={current.correctAnswerText}
          onAnswer={handleAnswer}
        />

        <Controls
          index={index}
          total={quiz.length}
          selected={selected}
          onBack={handleBack}
          onSubmit={handleSubmit}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default TakeQuiz;
