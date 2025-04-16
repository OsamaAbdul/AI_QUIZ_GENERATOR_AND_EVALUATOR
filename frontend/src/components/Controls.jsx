// src/components/Controls.jsx
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Controls = ({ index, total, selected, onBack, onSubmit, onNext }) => (
  <div className="flex justify-between items-center mt-6">
    <button
      onClick={onBack}
      disabled={index === 0}
      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FaArrowLeft className="h-4 w-4" />
      <span>Back</span>
    </button>

    <button
      onClick={onSubmit}
      disabled={!selected}
      className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:scale-105"
    >
      {index + 1 === total ? 'Finish' : 'Submit'}
    </button>

    <button
      onClick={onNext}
      disabled={index + 1 >= total || selected}
      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>Next</span>
      <FaArrowRight className="h-4 w-4" />
    </button>
  </div>
);

export default Controls;