// src/components/QuizHeader.jsx
import { FaClock } from 'react-icons/fa';

const QuizHeader = ({ index, total, timeLeft }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold text-gray-800">
      Question {index + 1} / {total}
    </h2>
    <div className="flex items-center space-x-2 text-gray-600">
      <FaClock className="h-5 w-5" />
      <span className={`font-medium ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}>
        {timeLeft}s
      </span>
    </div>
  </div>
);

export default QuizHeader;