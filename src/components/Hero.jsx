import React from 'react';
import { 
  Trophy, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  ArrowRight,
  MapPin,
  Flame,
  Award
} from 'lucide-react';

export const Hero = ({ onExploreEvents, onScrollToFeatured, stats }) => {
  return (
    <section className="bg-white border-b border-gray-200">
      
      {/* Organizer Banner / Cover */}
      <div className="h-28 sm:h-36 bg-gradient-to-r from-[#1C4980] via-[#0073E6] to-[#1C4980] relative">
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-14 pb-8">
        
        {/* Organizer Header Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 shadow-xs">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            
            {/* Logo & Org Details */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-gray-100 shadow-sm flex items-center justify-center p-2 shrink-0">
                <div className="w-full h-full bg-[#1C4980] rounded-xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-xs">
                  CC
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1C4980]">
                    CodeChef ABESEC Chapter
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-[#0073E6] border border-blue-200 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-[#0073E6] text-white" />
                    Verified Campus Chapter
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>ABES Engineering College, Ghaziabad • AKTU Code 032</span>
                </p>

                <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-2xl leading-relaxed">
                  The official student-run technical community at ABESEC. Participating in hackathons, CP sprints, workshops, and inter-college championships.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end md:self-center">
              <button
                onClick={onExploreEvents}
                className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#0073E6] hover:bg-[#0060c0] text-white shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Browse Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToFeatured}
                className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#EBF3FC] text-[#1C4980] hover:bg-blue-100 transition-colors flex items-center gap-1.5"
              >
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Featured Challenge</span>
              </button>
            </div>

          </div>

          {/* Unstop Chapter Statistics Bar */}
          <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0073E6]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-gray-900 block leading-tight">
                  {stats?.totalEvents || 45}+
                </span>
                <span className="text-[11px] text-gray-500">Opportunities Hosted</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-gray-900 block leading-tight">
                  1,200+
                </span>
                <span className="text-[11px] text-gray-500">Active Participants</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-gray-900 block leading-tight">
                  ₹1.5 Lakh+
                </span>
                <span className="text-[11px] text-gray-500">Prize Pool Awarded</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                <Star className="w-5 h-5 fill-purple-600 text-purple-600" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-gray-900 block leading-tight">
                  4.9 / 5.0
                </span>
                <span className="text-[11px] text-gray-500">Student Satisfaction</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
