// src/components/ResultScreen.jsx
const ResultScreen = ({ score, total, motivation }) => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Quiz Completed!</h2>
        <p className="text-2xl text-gray-800 mb-2">Your Score: {score} / {total}</p>
        <p className="text-lg text-gray-600 mb-6">{motivation}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </div>
  );
  
  export default ResultScreen;