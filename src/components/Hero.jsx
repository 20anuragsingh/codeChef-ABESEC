import React from 'react';
import { 
  Calendar, 
  ArrowRight, 
  Users, 
  Trophy, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

export const Hero = ({ onExploreEvents, onScrollToFeatured, stats }) => {
  return (
    <section className="bg-white border-b border-gray-200 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>CodeChef Campus Chapter • ABESEC Ghaziabad</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Manage & Explore College Club Events
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
              Welcome to the official event platform for CodeChef ABESEC. Register for upcoming hackathons, competitive programming contests, workshops, and guest speaker sessions.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreEvents}
                className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2"
              >
                <span>View All Events</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToFeatured}
                className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 transition-colors"
              >
                Featured Event
              </button>
            </div>

            {/* Simple highlights */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Free Student Registrations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Instant Digital Passes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Event Certificates</span>
              </div>
            </div>

          </div>

          {/* Quick Metrics */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Club Overview
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Total Events</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats?.totalEvents || 45}+
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Conducted on campus</p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Active Members</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    1,200+
                  </div>
                  <p className="text-xs text-gray-500 mt-1">ABESEC students</p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Trophy className="w-4 h-4 text-blue-600" />
                    <span>Prize Pool</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    ₹1.5L+
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Awarded to winners</p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Registrations</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats?.totalRegistrations || 850}+
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Total participants</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
