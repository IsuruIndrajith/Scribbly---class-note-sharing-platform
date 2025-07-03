import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { HiOutlinePlusCircle } from 'react-icons/hi';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const documents = [
    {
      id: 1,
      thumbnail: '/document1.jpg',
      title: 'Cell Structure and Function.docx',
      category: 'Lectures',
      subject: 'Biology',
      courseCode: 'BIO101',
      language: 'English',
    },
    {
      id: 2,
      thumbnail: '/document2.jpg',
      title: 'FinalComputerSystemAssignment.docx',
      category: 'Assignments',
      subject: 'Software Engineering',
      courseCode: 'SE205',
      language: 'English',
    },
    {
      id: 3,
      thumbnail: '/document3.jpg',
      title: '46177_ch03.pdf',
      category: 'Lectures',
      subject: 'Organizational Management',
      courseCode: 'OM301',
      language: 'Sinhala',
    },
    {
      id: 4,
      thumbnail: '/document4.jpg',
      title: 'Lesson 1 - Introduction to Marketing.pdf',
      category: 'Summaries',
      subject: 'Marketing',
      courseCode: 'MK101',
      language: 'English',
    },
    {
      id: 5,
      thumbnail: '/document5.jpg',
      title: 'Marketing Environment Analysis.pdf',
      category: 'Summaries',
      subject: 'Marketing',
      courseCode: 'MK101',
      language: 'Tamil',
    },
    {
      id: 6,
      thumbnail: '/document6.jpg',
      title: 'Consumer Behavior.pdf',
      category: 'Summaries',
      subject: 'Marketing',
      courseCode: 'MK102',
      language: 'English',
    },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = selectedCourse ? doc.courseCode === selectedCourse : true;
    const matchesCategory = selectedCategory ? doc.category === selectedCategory : true;
    const matchesLanguage = selectedLanguage ? doc.language === selectedLanguage : true;

    return matchesSearch && matchesCourse && matchesCategory && matchesLanguage;
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto backdrop-blur-md bg-white/10 rounded-l-3xl m-4 shadow-md">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-lg flex flex-col gap-4">
          {/* Search and Add Button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input
              type="text"
              placeholder="Search documents by title or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-2/3 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none"
            />
            <button className="flex items-center gap-2 bg-yellow-400 text-purple-800 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-all">
              <HiOutlinePlusCircle size={20} />
              Add Notes
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-purple-500 text-purple-100 px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-700"
            >
              <option value="">All Courses</option>
              {[...new Set(documents.map((doc) => doc.courseCode))].map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-purple-500 text-purple-100 px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-700"
            >
              <option value="">All Categories</option>
              {[...new Set(documents.map((doc) => doc.category))].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-purple-500 text-purple-100 px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-700"
            >
              <option value="">All Languages</option>
              {[...new Set(documents.map((doc) => doc.language))].map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recommended Documents */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl animate-float">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v6"
              />
            </svg>
            Recommended Documents
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="bg-white/10 p-4 rounded-xl shadow-md">
                <div className="flex items-center justify-between">
                  <img
                    src={doc.thumbnail}
                    alt="Thumbnail"
                    className="w-16 h-16 object-cover rounded border border-white/20"
                  />
                  <span className="bg-yellow-400 text-purple-800 px-2 py-1 rounded text-xs font-semibold">
                    {doc.category}
                  </span>
                </div>
                <h3 className="text-base font-bold mt-3">{doc.title}</h3>
                <p className="text-white/70 text-sm mt-1">{doc.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
