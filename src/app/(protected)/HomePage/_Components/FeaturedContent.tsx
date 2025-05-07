"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FocusInsightsPitch() {
  const [isHoveredLeft, setIsHoveredLeft] = useState(false);
  const [isHoveredRight, setIsHoveredRight] = useState(false);

  const leftCardVariants = {
    initial: {
      x: "-120%",
      rotate: -15,
      opacity: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    animate: {
      x: "-20%",
      rotate: -5,
      opacity: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      x: "-120%",
      rotate: -10,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const rightCardVariants = {
    initial: {
      x: "120%",
      rotate: 15,
      opacity: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    animate: {
      x: "20%",
      rotate: 5,
      opacity: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      x: "120%",
      rotate: 10,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="py-16 bg-white rounded-lg shadow-xl text-black"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Unlock Deeper Learning with Focus Insights
        </h2>
        <p className="text-lg text-gray-400 mb-8">
          Tired of passively consuming content? Our innovative technology goes
          beyond simple progress tracking. We provide you with valuable insights
          into <span className="font-semibold text-purple-400">how focused you are</span> while engaging with learning materials,
          helping you optimize your study habits and maximize knowledge retention.
        </p>

        <Button className="w-40 mx-auto mt-5 cursor-pointer bg-blue-500 font-serif hover:bg-blue-600 hover:scale-110">Lets start Concentrating</Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-20 mb-20">
          {/* Left Card */}
          <div className="relative group">
            <motion.div
              className="p-6 bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300 hover:bg-blue-100 cursor-pointer"
              whileHover={{ y: -5 }}
              onMouseEnter={() => setIsHoveredLeft(true)}
              onMouseLeave={() => setIsHoveredLeft(false)}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-400 text-black mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-blue-700 text-xl mb-2">Understand Your Engagement</h3>
              <p className="text-blue-600 text-base text-shadow-black font-serif">
                Gain clarity on when you're truly absorbed in the content and identify moments of distraction. Our detailed tracking helps you understand your personal learning patterns.
              </p>
            </motion.div>

            {isHoveredLeft && (
              <motion.div
                className="absolute top-0 right-full mr-4 w-64 bg-white text-black p-4 rounded-md shadow-lg pointer-events-none origin-right z-50"
                variants={leftCardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <h4 className="text-lg font-semibold mb-2">Your Session Insights</h4>
                <p className="text-sm text-gray-600 mb-2">A quick look at your activity:</p>
                <div className="mb-1">
                  <span className="font-medium text-purple-500 mr-1">Time:</span>
                  <span className="text-gray-700">29 min 30 secs</span>
                </div>
                <div className="mb-1">
                  <span className="font-medium text-blue-500 mr-1">Pauses:</span>
                  <span className="text-gray-700">8 Times</span>
                </div>
                <div className="mb-1">
                  <span className="font-medium text-green-500 mr-1">Fwd:</span>
                  <span className="text-gray-700">2</span>
                </div>
                <div className="mb-1">
                  <span className="font-medium text-yellow-500 mr-1">Rwd:</span>
                  <span className="text-gray-700">5</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Analyze your interactions to boost focus.</p>
              </motion.div>
            )}
          </div>

          {/* Right Card */}
          <div className="relative group">
            <motion.div
              className="p-6 bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300  hover:bg-red-200 cursor-pointer"
              whileHover={{ y: -5 }}
              onMouseEnter={() => setIsHoveredRight(true)}
              onMouseLeave={() => setIsHoveredRight(false)}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white mb-4">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-red-700">Optimize Your Learning Strategy</h3>
              <p className="text-red-600 font-serif">
                Leverage insights into your focus levels to refine your study schedule, identify optimal learning times, and adjust your environment for better concentration.
              </p>
            </motion.div>

            {isHoveredRight && (
              <motion.div
                className="absolute top-0 left-full ml-4 w-72 bg-white text-black p-4 rounded-md shadow-lg pointer-events-none origin-left z-50"
                variants={rightCardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <h4 className="text-lg font-semibold mb-2 text-red-600">Experiment & Adapt</h4>
                <p className="text-sm text-gray-600 mb-2">Personalize your learning journey through data-driven adjustments:</p>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  <li className="mb-1"><strong>Optimal Session Length:</strong> Discover how long you stay engaged.</li>
                  <li className="mb-1"><strong>Environment Impact:</strong> Test different study settings and their effect on focus.</li>
                  <li className="mb-1"><strong>Pacing Strategies:</strong> Adjust your learning speed based on engagement cues.</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">Make informed decisions about your learning habits for better results.</p>
              </motion.div>
            )}
          </div>
        </div>

        

        <div className="mt-10">
          <p className="text-gray-700 mb-4 font-bold text-xl">
            For educators and platforms like Udemy and Coursera, our technology offers:
          </p>
          <ul className="text-gray-700">
            <li className="mb-2">🧠 Deeper understanding of learner engagement with content.</li>
            <li className="mb-2">🔍 Opportunities to identify challenging sections or areas of disinterest.</li>
            <li className="mb-2">📊 Data-driven insights to improve content design and delivery.</li>
            <li className="mb-2">🚀 A unique selling proposition for attracting and retaining learners.</li>
          </ul>
        </div>

        <div className="mt-12">
          <Button size="lg" className="bg-purple-500 hover:bg-purple-400">
            Learn More About Focus Tracking
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
