// LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/imageQ.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 animate-shimmer pointer-events-none z-0" />

      <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-8 rounded-xl text-center z-10 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-2 drop-shadow animate-fadeUp">
          <span className="inline-block animate-jiggle animate-glow">
            EXPLORE THE
          </span>
        </h1>
        <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-6 drop-shadow animate-fadeUp">
          <span className="inline-block animate-jiggle animate-glow delay-200">
            WORLD OF KNOWLEDGE
          </span>
        </h1>
        <button
          onClick={handleGetStarted}
          className="bg-purple-600 hover:bg-purple-800 transition-colors duration-300 text-white px-8 py-3 rounded-full text-lg shadow-xl"
        >
          GET STARTED
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
