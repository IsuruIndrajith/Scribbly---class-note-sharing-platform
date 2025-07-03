import React from "react";
import bgImage from '../assets/imageQ2.jpg';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };
  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-sm text-white text-sm md:text-base">
        <h2 className="text-2xl font-bold text-center mb-6 animate-fadeUp">
          Login
        </h2>

        <form>
          <label className="block mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none mb-4"
          />

          <label className="block mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none mb-4"
          />

          <div className="flex justify-between items-center text-xs mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-purple-500"
              />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-white/80 hover:underline">
              Forget Password
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-purple-800 font-semibold py-2 rounded-full hover:bg-purple-100 transition-all"
            onClick={handleDashboard}
          >
            Log in
          </button>
        </form>

        <p className="text-center mt-4 text-white/90 text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" 
            onClick={handleRegister}
            className="text-white font-bold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
