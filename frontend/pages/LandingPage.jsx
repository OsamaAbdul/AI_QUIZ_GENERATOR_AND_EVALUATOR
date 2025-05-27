import { Link } from 'react-router-dom';
import FeaturesSection from '../src/components/FeaturesSection';


function LandingPage() {
  return (
    <div className="gradient-bg min-h-screen pt-16 md:pt-20">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-darkBg/80 backdrop-blur-sm z-10 ">
        <div className="flex justify-between items-center px-4 py-4 md:px-8">
        <div className="flex items-center space-x-5 md:space-x-10 text-sm md:text-base">
          <img
            src="/OsAI-master.jpg"
            alt="OsAI QuizMaster Logo"
            className="w-8 h-10 md:w-10 md:h-15 rounded-full object-contain"
          />
          <a href="/" className="text-gray-400 hover:text-white" aria-label="OsAI QuizMaster Home">
            OsAI QuizMaster
          </a>
        </div>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 pt-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Welcome to OsAI  <br className="hidden sm:block" /> QuizMaster
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-xl md:max-w-2xl mb-8 leading-relaxed text-gray-300">
          Transform learning into an interactive and personalized experience powered by state-of-the-art AI APIs. Upload your PDFs, auto-generate quizzes, evaluate answers in real-time, and get smarter feedback instantly. <br className="hidden sm:block" />
          Whether you’re a student, teacher, or lifelong learner, this tool is your smart study partner.
        </p>
        <Link to="/login" className="btn-primary">Start Learning Now</Link>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* How to Use Section */}
      <section id="how-to-use" className="py-12 md:py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">How to Use</h2>
        <div className="max-w-xl md:max-w-2xl mx-auto space-y-6">
          {[
            'Register/Login to access your personalized dashboard.',
            'Upload any PDF of your choice, e.g. osama-abdullahi.pdf.',
            'Generate a quiz — our AI creates questions based on your content.',
            'Take the quiz by selecting the right answers and clicking the submit or next button.',
            'View results with AI-powered feedback and scores.',
          ].map((step, index) => (
            <div key={index} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                {index + 1}
              </span>
              <p className="text-sm md:text-base">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-400 text-sm md:text-base">
        <p>© {new Date().getFullYear()} OsAI QuizMaster. Developed By Osama Abdul</p>
      </footer>
    </div>
  );
}

export default LandingPage;