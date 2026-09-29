import React from 'react';
import { 
  Code2, 
  Terminal, 
  Trophy, 
  Cpu, 
  GraduationCap, 
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Award
} from 'lucide-react';

export const ClubIntroduction = ({ onExploreEvents }) => {
  const pillars = [
    {
      icon: <Terminal className="w-5 h-5 text-[#0073E6]" />,
      title: "Competitive Programming",
      desc: "Weekly contests, editorial breakdowns, and practice ladders for ICPC and CodeChef rated rounds."
    },
    {
      icon: <Trophy className="w-5 h-5 text-amber-500" />,
      title: "Campus Hackathons",
      desc: "Annual flagship hackathons with cash prize pools, mentorship sprints, and prototype demos."
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#0073E6]" />,
      title: "Hands-on Tech Bootcamps",
      desc: "Masterclasses in Full Stack Development, AI engineering, Git workflows, and Web3."
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-green-600" />,
      title: "Placement Mentorship",
      desc: "Guidance from alumni working at top tech firms with resume reviews and mock rounds."
    }
  ];

  const faqs = [
    {
      q: "Who is eligible to apply for opportunities?",
      a: "All students from ABESEC across all departments (CSE, IT, AIML, DS, ECE, MCA) and all years can apply. Beginners are encouraged to participate."
    },
    {
      q: "Are the registrations and applications free?",
      a: "Yes! All club contests, hackathons, and bootcamps are 100% free of charge for students."
    },
    {
      q: "Do I get a participation certificate?",
      a: "Yes, verified participants who attend events receive official digital certificates of participation signed by the faculty coordinator."
    },
    {
      q: "How can I join the club core team?",
      a: "Recruitments open at the start of each semester following the Chapter Orientation."
    }
  ];

  return (
    <section id="club-intro-section" className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FC] text-[#0073E6] text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Organizer Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C4980]">
            About CodeChef ABESEC Chapter
          </h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            The CodeChef ABESEC Student Chapter is an active technology and competitive programming community at <strong>ABES Engineering College, Ghaziabad</strong>, bridging academic curriculum and industry engineering practices.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-gray-50 border border-gray-200 hover:border-blue-200 hover:bg-blue-50/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3 shadow-2xs">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Opportunity Banner (Unstop style CTA) */}
        <div className="rounded-2xl bg-gradient-to-r from-[#1C4980] to-[#0073E6] text-white p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-200">
              Student Opportunity Portal
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-1">
              Ready to compete and elevate your coding skills?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              Register for upcoming campus hackathons and CP challenges. Compete for cash prizes, certificates, and recognition.
            </p>
          </div>
          <button
            onClick={onExploreEvents}
            className="px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-white text-[#1C4980] hover:bg-gray-100 shrink-0 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Explore Opportunities</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-xl font-bold text-[#1C4980]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-gray-500 mt-1">Everything you need to know about participating</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0073E6] shrink-0" />
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
