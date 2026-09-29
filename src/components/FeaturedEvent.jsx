import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Users, 
  Flame, 
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
    <section id="featured-event-section" className="py-8 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-100 text-amber-800">
              <Flame className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-gray-900">
              Flagship College Event
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
              Annual Hackathon
            </span>
          </div>

          <button
            onClick={() => onViewDetails(event)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Read Problem Statements & Rules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[280px] bg-gray-100 overflow-hidden">
              <img 
                src={event.bannerImage || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                  Free Registration
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-white text-gray-800 border border-gray-200">
                  {event.mode || 'In Campus'}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-slate-900/80 px-3 py-1.5 rounded-lg">
                <span>Eligibility: All Branches</span>
                <span>Team: 2 - 4 Students</span>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                
                {/* Countdown */}
                {!isPast && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-3">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Registration Closes in:</span>
                    <span className="font-bold text-amber-950 font-mono">
                      {timeLeft.days}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
                    </span>
                  </div>
                )}

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                  {event.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Organized by <strong>{event.organizer}</strong> • {event.college}
                </p>

                {/* Details Grid */}
                <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                    <span><strong>Date:</strong> {event.date} ({event.time})</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="truncate"><strong>Venue:</strong> {event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 sm:col-span-2">
                    <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                    <span><strong>Prizes:</strong> {event.prizes}</span>
                  </div>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>

                {/* Capacity */}
                <div className="mt-3.5">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span>{registeredCount} students registered of {capacity} seats</span>
                    </span>
                    <span className="font-semibold text-gray-700">{percentFull}% filled</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${percentFull}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onRegister(event)}
                  disabled={isPast || percentFull >= 100}
                  className={`px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-colors ${
                    isPast
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                      : percentFull >= 100
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isPast ? 'Event Concluded' : percentFull >= 100 ? 'Seats Full' : 'Register for HackABES'}
                </button>

                <button
                  onClick={() => onViewDetails(event)}
                  className="px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 transition-colors"
                >
                  Guidelines & Schedule
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
