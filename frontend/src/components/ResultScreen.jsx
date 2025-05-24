import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaRedo, FaShareAlt } from 'react-icons/fa';
import { useEffect } from 'react';

// Animation variants for smooth transitions
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const ResultScreen = ({ score, total, motivation }) => {
  const navigate = useNavigate();
  const percentage = Math.round((score / total) * 100);

  // Share functionality
  const shareResult = async () => {
    const shareData = {
      title: 'My Quiz Result',
      text: `I scored ${score}/${total} (${percentage}%) on this quiz! ${motivation}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert('Share your result: ' + shareData.text);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Dynamic motivation message based on score
  const getMotivationMessage = () => {
    if (percentage >= 80) return `Outstanding! ${motivation}`;
    if (percentage >= 50) return `Great effort! ${motivation}`;
    return `Keep practicing! ${motivation}`;
  };

  // Accessibility: Focus management on mount
  useEffect(() => {
    document.querySelector('h2')?.focus();
  }, []);

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      role="region"
      aria-label="Quiz Results"
    >
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center">
        <FaTrophy className="text-5xl text-yellow-400 mx-auto mb-4" aria-hidden="true" />
        <h2
          className="text-3xl font-bold text-indigo-800 mb-4 outline-none"
          tabIndex={0}
        >
          Congratulations {''}
          <p>Quiz Completed!</p>
        </h2>
        <div className="mb-6">
          <p className="text-4xl font-semibold text-gray-800 mb-2">
            {score} / {total}
            <span className="text-lg text-gray-500 ml-2">({percentage}%)</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              className="bg-indigo-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          </div>
          <p className="text-lg text-gray-600 italic">{getMotivationMessage()}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
         <motion.button
          className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => window.location.reload()} // Reload the current page
          aria-label="Try Quiz Again"
        >
          <FaRedo /> Try Again
        </motion.button>
          <motion.button
            className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold flex items-center justify-center gap-2"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={shareResult}
            aria-label="Share Quiz Result"
          >
            <FaShareAlt /> Share
          </motion.button>
          <motion.button
            className="px-6 py-3 bg-gray-600 text-white rounded-full font-semibold"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/upload-pdf')}
            aria-label="Return to Home"
          >
            Home
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultScreen;