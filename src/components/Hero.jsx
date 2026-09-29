import React from 'react';
import { 
  Calendar, 
  Users, 
  Trophy, 
  ArrowRight, 
  MapPin, 
  CheckCircle2,
  Sparkles,
  MessageCircle
} from 'lucide-react';

export const Hero = ({ onExploreEvents, onScrollToFeatured, stats }) => {
  return (
    <section className="bg-white border-b border-gray-200 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>CodeChef Campus Chapter • ABES Engineering College, Ghaziabad</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Learn to Code, Build Projects & Crack Placements
            </h1>

            <p className="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
              We are a student-run technical society at ABESEC. We organize 24-hour campus hackathons, rated coding contests, hands-on DSA workshops, and guidance sessions with placed 4th-year seniors.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreEvents}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>View Campus Events</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToFeatured}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
              >
                HackABES 2026
              </button>

              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Group</span>
              </a>
            </div>

            {/* Highlights */}
            <div className="pt-3 flex flex-wrap items-center gap-5 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Free Entry for All Branches</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Official College Gate Passes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Verified Certificates</span>
              </div>
            </div>

          </div>

          {/* College Club Stats Box */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    ABES
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Chapter Highlights</h3>
                    <p className="text-[11px] text-gray-500">Academic Year 2025-26</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Total Events</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {stats?.totalEvents || 15}+
                  </div>
                  <p className="text-[11px] text-gray-500">Contests & bootcamps</p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Members</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    500+
                  </div>
                  <p className="text-[11px] text-gray-500">ABESEC students</p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>Prize Money</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    ₹75,000+
                  </div>
                  <p className="text-[11px] text-gray-500">Awarded to winners</p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Registrations</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {stats?.totalRegistrations || 420}+
                  </div>
                  <p className="text-[11px] text-gray-500">Event participants</p>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
                <span>📍 Ramanujan & Bhabha Block Labs</span>
                <span className="font-semibold text-blue-700">Campus Events</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
