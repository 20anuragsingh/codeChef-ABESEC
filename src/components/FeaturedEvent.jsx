import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Users, 
  Flame, 
  Eye, 
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const FeaturedEvent = ({ event, registrationCount, onRegister, onViewDetails }) => {
  if (!event) return null;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(event.dateTimeIso || event.date).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [event]);

  const capacity = event.capacity || 100;
  const registeredCount = registrationCount || 0;
  const percentFull = Math.min(100, Math.round((registeredCount / capacity) * 100));
  const isPast = event.status === 'Completed' || new Date(event.dateTimeIso || event.date) < new Date();

  return (
    <section id="featured-event-section" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-50 text-amber-600">
              <Flame className="w-4 h-4 fill-amber-500" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Featured Opportunity
            </h2>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EBF3FC] text-[#0073E6]">
              High Impact
            </span>
          </div>

          <button
            onClick={() => onViewDetails(event)}
            className="text-xs font-semibold text-[#0073E6] hover:text-[#005bb5] flex items-center gap-1"
          >
            <span>View Opportunity Guidelines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Unstop Spotlight Opportunity Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[280px] bg-gray-100 overflow-hidden">
              <img 
                src={event.bannerImage || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#DEF7EC] text-[#03543F] border border-green-200 shadow-xs">
                  Free Entry
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-gray-800 shadow-xs border border-gray-200">
                  {event.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{event.impressions || '2.4k Views'}</span>
                </span>
                <span>Team Size: {event.teamSize || '1 - 4 Members'}</span>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                
                {/* Countdown Timer Pill */}
                {!isPast && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-800 mb-3">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span className="font-semibold">Registration Closes in:</span>
                    <span className="font-mono font-bold text-amber-900">
                      {timeLeft.days}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
                    </span>
                  </div>
                )}

                {/* Opportunity Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#1C4980] leading-snug">
                  {event.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Organized by <strong className="text-gray-800">{event.organizer}</strong> • {event.college}
                </p>

                {/* Key Chips */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <Calendar className="w-4 h-4 text-[#0073E6] shrink-0" />
                    <span><strong>Date:</strong> {event.date} ({event.time})</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <MapPin className="w-4 h-4 text-[#0073E6] shrink-0" />
                    <span className="truncate"><strong>Venue:</strong> {event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="truncate"><strong>Prizes:</strong> {event.prizes}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <Award className="w-4 h-4 text-green-600 shrink-0" />
                    <span className="truncate"><strong>Eligibility:</strong> {event.eligibility}</span>
                  </div>
                </div>

                {/* Description snippet */}
                <p className="mt-3.5 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {event.shortDescription || event.description}
                </p>

                {/* Registration Count Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span>{registeredCount} students registered of {capacity} seats</span>
                    </span>
                    <span className="font-semibold text-gray-700">{percentFull}% filled</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className="h-full bg-[#0073E6] rounded-full transition-all duration-300"
                      style={{ width: `${percentFull}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onRegister(event)}
                  disabled={isPast || percentFull >= 100}
                  className={`px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all shadow-xs ${
                    isPast
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                      : percentFull >= 100
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
                      : 'bg-[#0073E6] hover:bg-[#0060c0] text-white hover:shadow'
                  }`}
                >
                  {isPast ? 'Opportunity Closed' : percentFull >= 100 ? 'Seats Full' : 'Register on Unstop Style'}
                </button>

                <button
                  onClick={() => onViewDetails(event)}
                  className="px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm text-[#1C4980] bg-white hover:bg-gray-50 border border-gray-300 transition-colors"
                >
                  View Details & Rounds
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
