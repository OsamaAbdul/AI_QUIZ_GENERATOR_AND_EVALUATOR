// src/components/ProgressBar.jsx
const ProgressBar = ({ index, total }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${((index + 1) / total) * 100}%` }}
      ></div>
    </div>
  );
  
  export default ProgressBar;