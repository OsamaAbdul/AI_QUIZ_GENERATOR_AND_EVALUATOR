// src/components/Explanation.jsx
import React from 'react';

const Explanation = ({ text }) => (
  <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-sm animate-fade-in">
    <p className="text-center font-bold text-green-700">{text}</p>
  </div>
);

export default Explanation;