import React from 'react';
import { 
  Code2, 
  Terminal, 
  Trophy, 
  Cpu, 
  GraduationCap, 
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  Users
} from 'lucide-react';
import { TEAM_MEMBERS } from '../data/mockEvents';

export const ClubIntroduction = ({ onExploreEvents }) => {
  const pillars = [
    {
      icon: <Terminal className="w-5 h-5 text-blue-600" />,
      title: "Competitive Programming",
      desc: "Weekly practice rounds on CodeChef & LeetCode, contest problem editorials, and guidance for ICPC & campus rated contests."
    },
    {
      icon: <Trophy className="w-5 h-5 text-amber-500" />,
      title: "College Hackathons",
      desc: "Annual 24-hour hackathons (HackABES), ideathons, and mentorship to help students build real-world project portfolios."
    },
    {
      icon: <Cpu className="w-5 h-5 text-blue-600" />,
      title: "Hands-on Workshops",
      desc: "Peer-led hands-on sessions in lab covering C++, Python, Git/GitHub, React, Node.js, and Full Stack Web Development."
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-green-600" />,
      title: "Placement Mentorship",
      desc: "Guidance from 4th-year placed seniors with resume reviews, coding test patterns, and mock technical interviews."
    }
  ];

  const faqs = [
    {
      q: "Can freshers or 1st year students join events?",
      a: "Yes! Most of our introductory workshops and contests are beginner-friendly and designed specifically for 1st and 2nd year students."
    },
    {
      q: "Are the registrations and events free?",
      a: "Yes, all workshops, contests, and hackathons hosted by the CodeChef ABESEC Chapter are 100% free for ABESEC students."
    },
    {
      q: "Will I get attendance / duty leave for participating in hackathons?",
      a: "For official college-level hackathons like HackABES, duty leave is officially requested through the CSE department faculty coordinator."
    },
    {
      q: "How can I become a volunteer or join the core team?",
      a: "Core team recruitment forms are circulated on WhatsApp and college notice boards at the beginning of each semester."
    }
  ];

  return (
    <section id="club-intro-section" className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
            About The Chapter
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            About CodeChef ABESEC Student Chapter
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
            Founded by passionate students of ABES Engineering College, our chapter aims to cultivate a strong coding culture on campus. We bridge the gap between classroom theory and industry-ready software engineering skills through peer learning and contest culture.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-3 shadow-2xs">
                  {pillar.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{pillar.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Core Team / Student Leads Section (Real College Club Feel!) */}
        <div className="mb-14 pt-8 border-t border-gray-100">
          <div className="mb-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
              People Behind The Club
            </span>
            <h3 className="text-xl font-bold text-gray-900">
              Meet the Student Core Team (2025-26)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Students and faculty coordinating events, workshops, and contests</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs text-left">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="text-sm font-bold text-gray-900 leading-tight">{member.name}</h4>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">{member.role}</p>
                <p className="text-[11px] text-gray-500 mt-1">{member.batch}</p>
                <p className="text-[11px] text-gray-600 mt-1.5 leading-snug">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="pt-8 border-t border-gray-100">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Common questions from students across all branches</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-4xl">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
