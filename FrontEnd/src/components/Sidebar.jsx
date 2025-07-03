import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    {
      label: 'Dashboard',
      to: '/dashboard',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8c-2.21 0-4 1.79-4 4h4v4c2.21 0 4-1.79 4-4s-1.79-4-4-4z"
        />
      )
    },
    {
      label: 'Home',
      to: '/',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-1a1 1 0 00-1-1H6a1 1 0 00-1 1z"
        />
      )
    },
    {
      label: 'Study',
      to: '/study',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      )
    },
    {
      label: 'Courses',
      to: '/courses',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 10v6m0 0l-4-8m4 8l4-8m-4 8v6"
        />
      )
    },
    {
      label: 'Study Lists',
      to: '/study-lists',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m3 4h1a1 1 0 001-1v-6a1 1 0 00-1-1h-1m-1 4l-3 3m0 0l-3-3m3 3V5"
        />
      )
    },
    {
      label: 'Social',
      to: '/social',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2a3 3 0 015.356-1.857M7 20H2m15 0v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6"
        />
      )
    },
    {
      label: 'Newsfeed',
      to: '/newsfeed',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z"
        />
      )
    }
  ];

  return (
    <div className="w-64 h-full bg-gradient-to-b from-purple-900 to-purple-600 text-white shadow-xl p-4 space-y-6">
      {/* Logo */}
      <div className="flex items-center space-x-3 border-b border-white/20 pb-4">
        <img src="/studydrive-logo.svg" alt="StudyDrive Logo" className="h-8" />
        <span className="text-xl font-bold tracking-wide">StudyDrive</span>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition duration-200 ${
                    isActive ? 'bg-white/30' : 'hover:bg-white/20'
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {item.icon}
                </svg>
                <span className="text-white font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
