"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, BookOpen, Brain } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";

const HeroSectionOne = () => {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center mt-30">
      {/* Decorative gradient borders */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 py-10 md:py-20 w-full">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="relative z-10 max-w-4xl text-center lg:text-left text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300">
            {"Unlock the Power of Video Learning".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="relative z-10 max-w-xl py-4 text-center lg:text-left text-lg font-normal text-neutral-600 dark:text-neutral-400"
          >
            Revolutionize your learning experience. Upload, engage, and track your progress with our interactive video platform. Built for learners who want to do more than just watch.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1.2,
            }}
            className="relative z-10 mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <Link href="/upload">
              <Button className="w-60 transform rounded-lg bg-black px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Column - Visual Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="hidden lg:flex justify-center items-center relative w-full"  // Make sure it takes full width on larger screens
        >
          {/* Main Illustration -  Placeholder for a video player or engaging graphic */}
          <div className="relative z-10 bg-white/50 dark:bg-slate-800/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm border border-gray-100 dark:border-gray-700 w-full max-w-[500px] h-auto">  {/* Adjusted max-width and height */}
            {/* Placeholder Content - Replace with actual video player or image */}
            <div className="flex flex-col items-center justify-center w-full h-full">
              <PlayCircle className="w-16 h-16 text-blue-500 dark:text-blue-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-center text-lg">Interactive Video Platform</p>
              <p className="text-gray-500 dark:text-gray-500 text-center text-sm mt-2">Upload, Engage, Learn.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature Highlights Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="w-full px-4 py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-slate-200">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: Interactive Videos */}
          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-blue-100 dark:border-blue-800 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                <PlayCircle className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                Interactive Videos
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Embed quizzes, polls, and more directly into your videos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 dark:text-slate-300">Boost learner engagement and knowledge retention.</p>
            </CardContent>
          </Card>

          {/* Feature 2: Progress Tracking */}
          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-emerald-100 dark:border-emerald-800 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                <BookOpen className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
                Progress Tracking
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Monitor learner progress and identify areas for improvement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 dark:text-slate-300">Get detailed insights into learner activity and performance.</p>
            </CardContent>
          </Card>

          {/* Feature 3: Personalized Learning */}
          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-purple-100 dark:border-purple-800 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
                <Brain className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                Personalized Learning
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Tailor the learning experience to individual needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 dark:text-slate-300">Deliver customized content and recommendations.</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSectionOne;

