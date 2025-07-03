import React from "react";
import bgImage from '../assets/imageQ2.jpg';
import botImage from '../assets/imageQ4.png';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row text-white text-sm md:text-base">

        {/* Left side */}
        <div className="md:w-1/2 p-10 flex flex-col items-center justify-center text-white rounded-r-[80px] z-10 bg-gradient-to-b from-purple-900 to-purple-400">
          <img
            src={botImage}
            alt="Bot"
            className="w-[280px] h-[310px] mb-6 object-contain animate-float" 
              />
          <h2 className="text-3xl font-bold mb-2">Romanchat</h2>
          <p className="text-white/80 text-sm px-4">
            Welcome to your AI-powered chat companion. Sign up and start exploring the conversation!
          </p>
        </div>

        {/* Right side */}
        <div className="md:w-1/2 p-8 animate-fadeUp">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
          <p className="text-white/80 text-center text-sm mb-6">
            Create your account. It’s free and only takes a minute.
          </p>

          <form className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none"
            />

            <div className="flex items-center text-xs space-x-2">
              <input type="checkbox" className="form-checkbox text-purple-500" />
              <span>I accept the <span className="underline cursor-pointer text-white/90">Terms</span> & <span className="underline cursor-pointer text-white/90">Privacy</span></span>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-purple-800 font-semibold py-2 rounded-full hover:bg-purple-100 transition-all"
              onClick={handleLogin}
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-4 text-white/90 text-sm">
            Already have an account?{" "}
            <a
              href="#"
              onClick={handleLogin}
              className="text-white font-bold hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
