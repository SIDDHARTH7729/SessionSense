// app/about/page.tsx or pages/about.tsx
"use client"
import React from "react";
import {motion} from "framer-motion";

const About = () => {
  return (
    <motion.div initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        delay: 0.4,
      }} className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Our Story</h1>
            <div className="w-20 h-1 bg-indigo-600 mb-8"></div>
            <p className="text-lg text-gray-600 mb-6">
              We started Study with a simple mission: create learning experiences that people actually enjoy. Too many educational platforms felt robotic, impersonal, and frankly, boring.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Founded in 2025 by a team of developers, educators, and lifelong learners, we're building a platform trusted by leading companies worldwide.
            </p>
            <div className="flex space-x-4 mb-8">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium">
                Our Team
              </button>
              <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium">
                Our Mission
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Makes Us Different</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert-Led Content",
                desc: "Industry veterans who know how to make complex concepts click.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                ),
              },
              {
                title: "Interactive Learning",
                desc: "Hands-on projects and real-time feedback that cement your skills.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                ),
              },
              {
                title: "Community Support",
                desc: "A vibrant community of learners to collaborate with globally.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                ),
              },
            ].map(({ title, desc, icon }, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-8 mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
            {[
              ["5K+", "Active Students"],
              ["94%", "Completion Rate"],
              ["50+", "Expert Instructors"],
              ["20+", "Countries Reached"],
            ].map(([stat, label], index) => (
              <div key={index}>
                <p className="text-3xl font-bold text-indigo-600">{stat}</p>
                <p className="text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-600 text-white rounded-2xl p-8 mb-16 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Join Us?</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto">Start your learning journey today.</p>
          <div className="flex justify-center space-x-6 mt-6">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium">Get Started</button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-medium">View Courses</button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Trusted By Leading Companies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Google", "Microsoft", "Airbnb", "Meta"].map((company, index) => (
              <div key={index} className="text-gray-500 font-medium text-xl">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
