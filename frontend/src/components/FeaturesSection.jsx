import { FaFilePdf, FaRobot, FaBrain, FaLock, FaReact, FaRocket } from 'react-icons/fa';

function FeaturesSection() {
  return (
    <section id="features" className="py-12 md:py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">✨ Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-sm sm:max-w-3xl md:max-w-5xl mx-auto">
        {[
          {
            icon: <FaFilePdf className="text-4xl md:text-5xl text-primary" />,
            title: 'PDF Text Extraction',
            desc: 'Upload PDFs and extract clean, structured content.',
          },
          {
            icon: <FaRobot className="text-4xl md:text-5xl text-primary" />,
            title: 'AI-Generated Quizzes',
            desc: 'Generate dynamic MCQs using Gemini or OpenAI based on extracted text.',
          },
          {
            icon: <FaBrain className="text-4xl md:text-5xl text-primary" />,
            title: 'Instant Evaluation',
            desc: 'Get immediate feedback, scores, and explanations.',
          },
          {
            icon: <FaLock className="text-4xl md:text-5xl text-primary" />,
            title: 'Secure Auth System',
            desc: 'JWT-based login/registration to protect your content and results.',
          },
          {
            icon: <FaReact className="text-4xl md:text-5xl text-primary" />,
            title: 'Modern React UI',
            desc: 'Smooth, responsive frontend with routing, quiz-taking screens, and loading states.',
          },
          {
            icon: <FaRocket className="text-4xl md:text-5xl text-primary" />,
            title: 'Ready for Deployment',
            desc: 'Deploy frontend on Netlify, backend on Render/Heroku.',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="feature-card bg-gray-800/50 p-4 md:p-6 rounded-lg flex flex-col items-center text-center hover:scale-105 transition-all min-h-[200px] md:min-h-[240px]"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm md:text-base">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;