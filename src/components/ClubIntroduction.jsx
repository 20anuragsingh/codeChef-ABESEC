import React from 'react';
import { 
  Code2, 
  Terminal, 
  Trophy, 
  Users, 
  Cpu, 
  Globe, 
  GraduationCap, 
  Zap, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export const ClubIntroduction = ({ onExploreEvents }) => {
  const pillars = [
    {
      icon: <Terminal className="w-6 h-6 text-indigo-400" />,
      title: "Competitive Programming",
      desc: "Regular campus contest rounds, curated DSA question ladders, CodeChef contest editorials, and targeted training for ICPC & Global CP platforms."
    },
    {
      icon: <Trophy className="w-6 h-6 text-amber-400" />,
      title: "Flagship Hackathons",
      desc: "Annual inter-college hackathons with real-world problem statements, ₹50,000+ prize pools, tech hardware labs, and mentor-guided hacking sprints."
    },
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      title: "Bootcamps & AI Workshops",
      desc: "Hands-on masterclasses covering Full Stack Engineering, Generative AI & Autonomous Agents, Systems Design, and Smart Contracts."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
      title: "Placement & Mentorship",
      desc: "Direct guidance from alumni working at top tech firms (Google, Microsoft, Amazon, Razorpay) with resume reviews and mock technical interviews."
    }
  ];

  const faqs = [
    {
      q: "Who can participate in CodeChef ABESEC events?",
      a: "All college students from any department (CSE, IT, AIML, DS, ECE, MCA, etc.) and any academic year are warmly welcome. Beginners are encouraged!"
    },
    {
      q: "Are the event registrations free?",
      a: "Yes! All workshops, hackathons, and campus CP contests organized by the CodeChef ABESEC chapter are 100% free of charge for students."
    },
    {
      q: "Do I get a participation certificate?",
      a: "Yes, verified attendees receive an official digital participation certificate signed by the CodeChef chapter faculty coordinator and lead."
    },
    {
      q: "How can I join the club core team?",
      a: "Core team recruitments open at the start of each semester following the Chapter Orientation. Active participation in hackathons and contests increases your chances!"
    }
  ];

  return (
    <section id="club-intro-section" className="py-16 sm:py-24 border-t border-slate-900 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>About CodeChef ABESEC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Building a Culture of Algorithmic Excellence
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            The CodeChef ABESEC Student Chapter is a community-driven technology ecosystem at 
            <strong> ABES Engineering College</strong>, dedicated to bridging the gap between academic theory 
            and real-world software engineering mastery.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/20 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 shadow-md">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chapter Journey & Campus Location Card */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-8 sm:p-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Student Community Impact
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                From Campus Labs to Global Leaderboards
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Whether you're writing your first <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded font-mono">print("Hello World")</code> or optimizing tree DP with bitmasking, CodeChef ABESEC provides the peer support, contest pressure, and mentor roadmap you need to thrive.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
                <span className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800">
                  📍 Campus: ABESEC, 19th KM Stone, NH-09, Ghaziabad
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800">
                  ⭐ CodeChef Campus Chapter Rating: Grade A+
                </span>
              </div>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                onClick={onExploreEvents}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Join Our Next Event</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Got Questions?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-sm sm:text-base font-bold text-white mb-2">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
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
