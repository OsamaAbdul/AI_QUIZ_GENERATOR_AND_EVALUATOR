import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaRobot, FaBrain, FaLock, FaReact, FaServer, FaRocket } from 'react-icons/fa';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-blue-900 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Quiz Generator</h1>
          <div className="space-x-4">
            <a href="#features" className="hover:text-primary">Features</a>
            <a href="#how-to-use" className="hover:text-primary">How to Use</a>
            <Link to="/login" className="bg-primary text-white px-4 py-2 rounded glow hover:bg-secondary transition">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="min-h-screen flex items-center justify-center px-4 pt-16"
      >
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Welcome to AI Quiz Generator & Evaluator For Students
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Transform learning into an interactive and personalized experience — powered by state-of-the-art AI APIs. Upload your PDFs, auto-generate quizzes, evaluate answers in real-time, and get smarter feedback instantly.
            <br />
            <span className="font-semibold">Whether you're a student, teacher, or lifelong learner — this tool is your smart study partner.</span>
          </p>
          <Link
            to="/register"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg glow hover:bg-secondary transition text-lg"
          >
            Start Learning Now
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            ✨ Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaFilePdf />, title: 'PDF Text Extraction', desc: 'Upload PDFs and extract clean, structured content.' },
              { icon: <FaRobot />, title: 'AI-Generated Quizzes', desc: 'Generate dynamic MCQs using Gemini or OpenAI based on extracted text.' },
              { icon: <FaBrain />, title: 'Instant Evaluation', desc: 'Get immediate feedback, scores, and explanations.' },
              { icon: <FaLock />, title: 'Secure Auth System', desc: 'JWT-based login/registration to protect your content and results.' },
              { icon: <FaReact />, title: 'Modern React UI', desc: 'Smooth, responsive frontend with routing, quiz-taking screens, and loading states.' },
              { icon: <FaServer />, title: 'Robust Backend', desc: 'Built with Express.js and MongoDB, supporting scalable deployment.' },
              { icon: <FaRocket />, title: 'Ready for Deployment', desc: 'Deploy frontend on Netlify, backend on Render/Heroku.' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                className="bg-gray-900 p-6 rounded-lg glow hover:scale-105 transition"
              >
                <div className="text-4xl text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to-use" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            How to Use
          </motion.h2>
          <ol className="space-y-6 text-lg">
            {[
              'Register/Login to access your personalized dashboard.',
              'Upload any PDF of your choice. e.g., osama-abdullahi.pdf.',
              'Generate a quiz — our AI creates questions based on your content.',
              'Take the quiz by selecting the right answers and clicking on the submit or next button.',
              'View results with AI-powered feedback and scores.',
            ].map((step, index) => (
              <motion.li
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                className="flex items-start"
              >
                <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                  {index + 1}
                </span>
                <p>{step}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to up Your Learning Game? Try Us</h2>
          <p className="text-lg mb-8">Join thousands of learners transforming their study experience with AI-powered quizzes.</p>
          <Link
            to="/register"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg glow hover:bg-secondary transition text-lg"
          >
            Get Started for Free
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-center">
        <p>&copy; 2025 AI Quiz Generator & Evaluator. All rights reserved. Developed By Osama Abdullahi</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;