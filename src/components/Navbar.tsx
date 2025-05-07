// components/Navbar.tsx
"use client"
// components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        delay: 0.8,
      }}>
        <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white shadow-md'
          : 'py-5 bg-white/95'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Left side - Logo (now reversed) */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-7 w-7 text-indigo-600" />
            <span className="text-indigo-600 font-bold text-xl">Study</span>
          </Link>
        </div>

        {/* Right side - Navigation links and button (now reversed) */}
        <div className="flex items-center space-x-6 md:space-x-10">
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <span className="text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                Home
              </span>
            </Link>
            <Link href="/about">
              <span className="text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                About
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                Contact Us
              </span>
            </Link>
          </div>
          
          <Link href={"/HomePage"}>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 md:px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
            Get Started
          </button>
          </Link>
        </div>
        
        {/* Mobile Menu Button - Only visible on mobile */}
        <button className="md:hidden text-slate-700 hover:text-indigo-600 ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
    </motion.div>
  );
};

export default Navbar;