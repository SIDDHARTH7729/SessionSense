'use client';

import React from 'react';

const OfferingsPage = () => {
  return (
    <div className="bg-white min-h-screen w-full px-4 sm:px-6 lg:px-12 py-12">
      {/* Section Heading */}
      <h1 className="text-5xl font-extrabold text-center text-purple-500 mb-4">
        What Do We Offer?
      </h1>
      <p className="text-lg text-zinc-600 text-center mb-12">
        Explore how our smart focus-tracking solutions benefit learners and platforms alike.
      </p>

      {/* Content Container */}
      <div className="max-w-3xl mx-auto space-y-16">
        {/* For Learners */}
        <section>
          <h2 className="text-3xl font-bold text-zinc-800 mb-4">
            For Individual Learners: Learn Smarter, Not Just Harder
          </h2>
          <p className="text-zinc-700 text-lg leading-relaxed mb-6">
            Are you looking to get the most out of your online learning experience? Our innovative focus-tracking technology provides you with unprecedented insights into how you engage with learning content.
          </p>
          <ul className="list-disc list-inside space-y-3 text-zinc-700">
            <li>🧠 <strong>Understand Your Focus:</strong> Gain clarity on when you're truly engaged and identify moments of distraction.</li>
            <li>⏱️ <strong>Optimize Study Time:</strong> Discover your peak focus periods and ideal session lengths.</li>
            <li>🔍 <strong>Identify Areas for Review:</strong> Pinpoint dips in attention that highlight tougher content.</li>
            <li>📈 <strong>Track Engagement Improvement:</strong> See how your focus evolves over time.</li>
            <li>🎯 <strong>Personalize Your Learning:</strong> Make smarter decisions using data about your habits and preferences.</li>
          </ul>
          <p className="text-zinc-700 text-lg mt-6">
            Take control of your educational journey and achieve better outcomes with less wasted effort.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-zinc-800 mb-4">
            For Companies and Learning Platforms: Elevate Your Ecosystem
          </h2>
          <p className="text-zinc-700 text-lg leading-relaxed mb-6">
            Empower your learners and gain a competitive edge with our advanced focus and engagement analytics.
          </p>
          <h3 className="text-xl font-semibold text-zinc-700 mb-2">Key Benefits:</h3>
          <ul className="list-disc list-inside space-y-3 text-zinc-700">
            <li>📊 <strong>Deeper Content Insights:</strong> See which parts of your course captivate — and which don’t.</li>
            <li>⚠️ <strong>Identify Challenging Sections:</strong> Spot patterns in learner drop-off or disengagement.</li>
            <li>💡 <strong>Improve Based on Data:</strong> Continuously optimize based on real engagement stats.</li>
            <li>🎯 <strong>Enable Personalization:</strong> Offer learners tailored paths and better recommendations.</li>
            <li>📈 <strong>Measure Effectiveness:</strong> Correlate engagement with outcomes and completions.</li>
            <li>🤝 <strong>Support Instructors:</strong> Equip teachers with focus-based learner insights.</li>
            <li>⭐ <strong>Stand Out:</strong> Offer features beyond video hosting — insights that learners actually value.</li>
          </ul>
          <p className="text-zinc-700 text-lg mt-6">
            Deliver more effective, learner-centered experiences — all backed by meaningful data.
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-8">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4">
            Ready to Unlock the Power of Focus Insights?
          </h2>
          <p className="text-lg text-zinc-600 mb-6">
            Contact us today to learn more about how our technology can transform your learning experience.
          </p>
          <button className="bg-purple-600 hover:bg-purple-500 transition text-white font-semibold py-3 px-6 rounded-xl shadow-sm">
            Get in Touch
          </button>
        </section>
      </div>
    </div>
  );
};

export default OfferingsPage;
