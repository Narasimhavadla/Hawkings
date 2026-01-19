import React from "react";
import olympiadImg from "../assets/banner.png";
import Testimonials from "../components/testinomials";
import RewardsSection from "../components/RewardsSection";
import ExamScheduleComp from "../components/examSchedComp";
import ClassApplySection from "../components/syllabusComp";

function LandingPage() {
  return (
    <div className="w-full bg-gray-50">

      {/* Banner */}
      <img
        src={olympiadImg}
        alt="Olympiad Banner"
        className="mx-auto mt-12 rounded-xl shadow-lg"
      />

      {/* Intro */}
      <div className="mt-8 text-center px-4">
        <h1 className="text-3xl md:text-4xl text-purple-600 font-bold">
          BY HAWKINGS
        </h1>
        <h2 className="text-xl md:text-2xl mt-3 font-semibold">
          Let's Crack It at the National Level
        </h2>

        <p className="max-w-4xl mx-auto mt-5 text-gray-600 text-lg">
          Hawkings Maths Olympiad nurtures analytical thinking, problem-solving
          skills, and competitive spirit among young learners across India.
        </p>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mt-20">
        Exam Journey
      </h1>

      {/* Scroll Stack */}
      <div className="relative mt-24 space-y-52 pb-40">

        {/* LEVEL 1 */}
        <div className="sticky top-36 w-[80%] md:w-[70%] mx-auto">
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 
                          text-white rounded-3xl p-8 shadow-2xl
                          transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-3xl font-bold mb-4 text-center">Level 1</h2>

            <div className="grid md:grid-cols-2 gap-6 text-lg">
              <ul className="space-y-2">
                <li>✔ 35 MCQ Questions</li>
                <li>✔ Duration: 40 Minutes</li>
                <li>✔ 2 Marks per question</li>
                <li>✔ −1 Negative marking</li>
              </ul>

              <div className="bg-white/20 rounded-xl p-4 content-center">
                <p className="font-semibold text-center ">
                  🎯 Top 10 students per class from each zone qualify for Level 2
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LEVEL 2 */}
        <div className="sticky top-40 w-[80%] md:w-[70%] mx-auto">
          <div className="bg-gradient-to-br from-green-400 to-green-600 
                          text-white rounded-3xl p-8 shadow-2xl
                          transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-3xl font-bold mb-4 text-center">Level 2</h2>

            <div className="grid md:grid-cols-2 gap-6 text-lg">
              <ul className="space-y-2">
                <li>✔ Advanced Olympiad MCQs</li>
                <li>✔ Duration: 60 Minutes</li>
                <li>✔ Concept + Logic based</li>
                <li>✔ National ranking</li>
              </ul>

              <div className="bg-white/20 rounded-xl p-4 content-center">
                <p className="font-semibold text-center">
                  🏆 Top performers qualify for Final Round
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL ROUND */}
        <div className="sticky top-44 w-[80%] md:w-[70%] mx-auto">
          <div className="bg-gradient-to-br from-orange-400 to-red-500 
                          text-white rounded-3xl p-8 shadow-2xl
                          transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Final Round
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-lg">
              <ul className="space-y-2">
                <li>✔ High-level problem solving</li>
                <li>✔ National finalists</li>
                <li>✔ Expert evaluation</li>
                <li>✔ Scholarships & awards</li>
              </ul>

              <div className="bg-white/20 rounded-xl p-4 content-center">
                <p className="font-semibold text-center">
                  🥇 Final results & national recognition
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* leve-4 */}

        <div className="sticky top-44 w-[80%] md:w-[70%] mx-auto mt-10">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 
                          text-white rounded-3xl p-8 shadow-2xl
                          transition-all duration-300 hover:scale-[1.02] ">
            {/* <h2 className="text-3xl font-bold mb-4 text-center">
              Final Round
            </h2> */}

            <div className="grid md:grid-cols-2 gap-6 text-lg items-center h-36 ">

                <h1>Registration Fee ₹1.00/- only which is less than a pizza.</h1>
                <div className="bg-white/20 rounded-xl p-4 content-center border w-40">
                    {/* <button className="font-semibold text-center">
                    APPLY NOW
                    </button> */}
                    <a href="/maths-competetion-registration" className="font-semibold px-4 mx-auto  " >Apply now</a>
                </div>
            </div>
          </div>
        </div>

      </div>
      
      <RewardsSection />
      <ExamScheduleComp />
      <ClassApplySection />

      {/* testinomials */}

      <Testimonials />
    </div>
  );
}

export default LandingPage;
