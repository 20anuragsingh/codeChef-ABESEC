import React from 'react';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  Trophy, 
  Users, 
  CalendarDays, 
  Flame,
  CheckCircle2
} from 'lucide-react';

export const Hero = ({ onExploreEvents, onScrollToFeatured, stats }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-16 sm:pb-20">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[300px] h-[250px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Chapter Pill */}
        <div className="flex justify-center sm:justify-start mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium shadow-sm hover:border-indigo-400/50 transition-colors">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white">CodeChef Campus Chapter</span>
            <span className="text-slate-500">•</span>
            <span>ABES Engineering College</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 text-center sm:text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Code. Compete. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Conquer the Tech Arena.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Welcome to the premier tech club of <strong className="text-white font-semibold">ABESEC Ghaziabad</strong>. 
              We organize high-octane 24-hour hackathons, rated competitive programming sprints, hands-on development bootcamps, and direct industry mentor connections.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center sm:justify-start">
              <button
                onClick={onExploreEvents}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <CalendarDays className="w-5 h-5 text-indigo-200" />
                <span>Explore Events & Contests</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={onScrollToFeatured}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-all"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>View Flagship Event</span>
              </button>
            </div>

            {/* Quick trust checkmarks */}
            <div className="mt-7 flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free Student Registrations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Digital Passes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Recognized Certificates</span>
              </div>
            </div>
          </div>

          {/* Interactive Stats Panel */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl glow-indigo">
              <div className="flex items-center justify-between pb-5 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Chapter Impact</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  LIVE SEASON 2026
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40">
                  <div className="flex items-center gap-2 text-indigo-400 mb-1">
                    <CalendarDays className="w-4 h-4" />
                    <span className="text-xs font-medium text-slate-400">Total Events</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    {stats?.totalEvents || 45}+
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Hackathons & bootcamps</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40">
                  <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-medium text-slate-400">Active Coders</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    1,200+
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">From CSE, IT & AI wings</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Trophy className="w-4 h-4" />
                    <span className="text-xs font-medium text-slate-400">Prize Pool</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    ₹1.5L+
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Awarded to top coders</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-medium text-slate-400">Registrations</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    {stats?.totalRegistrations || 850}+
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Student attendees</p>
                </div>
              </div>

              {/* Code snippet decoration */}
              <div className="mt-5 p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-400 flex items-center justify-between">
                <span className="text-indigo-400">$ codechef abesec --register</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  READY
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
