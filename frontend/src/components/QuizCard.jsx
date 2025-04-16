// src/components/QuizCard.jsx
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const QuizCard = ({ question, options, selected, correctAnswer, onAnswer }) => (
  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{question}</h3>
    <div className="space-y-3">
      {options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => onAnswer(opt)}
          disabled={selected !== null}
          className={`w-full p-3 text-left rounded-lg border flex items-center space-x-3 transition-all duration-300 transform hover:scale-102
            ${
              selected === opt
                ? opt === correctAnswer
                  ? 'bg-green-100 border-green-400 text-green-800'
                  : 'bg-red-100 border-red-400 text-red-800'
                : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
            }
            ${selected && opt === correctAnswer ? 'ring-2 ring-green-400' : ''}`}
        >
          <span className="font-semibold w-6">{String.fromCharCode(65 + idx)}.</span>
          <span className="flex-1">{opt}</span>
          {selected === opt && (
            <span className="ml-auto">
              {opt === correctAnswer ? (
                <FaCheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <FaTimesCircle className="h-5 w-5 text-red-600" />
              )}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default QuizCard;