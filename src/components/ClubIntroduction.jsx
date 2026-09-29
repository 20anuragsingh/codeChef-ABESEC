import React from 'react';
import { 
  Code2, 
  Terminal, 
  Trophy, 
  Cpu, 
  GraduationCap, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export const ClubIntroduction = ({ onExploreEvents }) => {
  const pillars = [
    {
      icon: <Terminal className="w-5 h-5 text-blue-600" />,
      title: "Competitive Programming",
      desc: "Weekly contests, editorial breakdowns, and practice ladders for ICPC and CodeChef rated rounds."
    },
    {
      icon: <Trophy className="w-5 h-5 text-blue-600" />,
      title: "Hackathons & Contests",
      desc: "Annual campus hackathons with cash prizes, team mentorship, and practical product building."
    },
    {
      icon: <Cpu className="w-5 h-5 text-blue-600" />,
      title: "Hands-on Workshops",
      desc: "Masterclasses in Full Stack Development, AI engineering, Git workflows, and Web3."
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      title: "Mentorship & Placements",
      desc: "Guidance from senior students and alumni working across top tech companies."
    }
  ];

  const faqs = [
    {
      q: "Who is eligible to participate in club events?",
      a: "All students from ABESEC across all departments (CSE, IT, AIML, DS, ECE, MCA) and all years can participate. Beginners are welcome."
    },
    {
      q: "Are the registrations free?",
      a: "Yes, all club contests, hackathons, and bootcamps are completely free for students."
    },
    {
      q: "Will I get a participation certificate?",
      a: "Yes, verified participants who attend events receive official digital certificates."
    },
    {
      q: "How can I join the club core team?",
      a: "Recruitments open at the start of each semester following the Chapter Orientation."
    }
  ];

  return (
    <section id="club-intro-section" className="py-14 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <Code2 className="w-3.5 h-3.5" />
            <span>About The Club</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            About CodeChef ABESEC
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            The CodeChef ABESEC Student Chapter is a community at ABES Engineering College helping students build coding skills, solve algorithmic problems, and collaborate on tech projects.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-3">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Community Info Banner */}
        <div className="rounded-xl bg-blue-50/70 border border-blue-200 p-6 sm:p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-blue-950">
              Ready to take part in our next event?
            </h3>
            <p className="text-sm text-blue-800 mt-1 max-w-xl">
              Check out our upcoming schedule, register for free, and connect with peers at ABESEC Ghaziabad campus.
            </p>
          </div>
          <button
            onClick={onExploreEvents}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shrink-0 flex items-center gap-1.5 transition-colors"
          >
            <span>Explore Events</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-gray-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
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
