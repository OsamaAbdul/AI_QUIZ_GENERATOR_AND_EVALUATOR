// src/hooks/useQuizTimer.js
import { useEffect, useRef, useState } from 'react';

const useQuizTimer = (initialTime, onTimeUp, showResult, hasQuiz) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerRef = useRef(null);

  const resetTimer = () => setTimeLeft(initialTime);
  const clearTimer = () => clearInterval(timerRef.current);

  useEffect(() => {
    if (!showResult && hasQuiz) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [showResult, hasQuiz, onTimeUp]);

  return { timeLeft, resetTimer, clearTimer };
};

export default useQuizTimer;