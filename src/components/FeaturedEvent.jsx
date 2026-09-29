import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Users, 
  Flame
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
    <section id="featured-event-section" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4" />
              <span>Spotlight</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Event
            </h2>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
            Flagship Event
          </span>
        </div>

        {/* Featured Card */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Image */}
            <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[280px] bg-gray-100">
              <img 
                src={event.bannerImage || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-white text-gray-900 shadow-xs border border-gray-200">
                  {event.category}
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-medium bg-gray-900 text-white">
                  {event.mode || 'Offline'}
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                
                {/* Countdown display */}
                {!isPast && (
                  <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between flex-wrap gap-2 text-xs">
                    <span className="font-medium text-gray-600 flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      Starts in:
                    </span>
                    <div className="flex items-center gap-2 font-medium text-gray-900">
                      <span className="px-2 py-0.5 bg-white border border-gray-200 rounded">{timeLeft.days}d</span>
                      <span>:</span>
                      <span className="px-2 py-0.5 bg-white border border-gray-200 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
                      <span>:</span>
                      <span className="px-2 py-0.5 bg-white border border-gray-200 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                      <span>:</span>
                      <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-blue-600 font-bold">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                    </div>
                  </div>
                )}

                {/* Event Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                  {event.title}
                </h3>

                {/* Meta Information */}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {event.description}
                </p>

                {/* Perks */}
                {event.prizes && (
                  <div className="mt-3 p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 flex items-center gap-2 text-xs text-blue-900">
                    <Trophy className="w-4 h-4 text-blue-600 shrink-0" />
                    <span><strong>Prizes:</strong> {event.prizes}</span>
                  </div>
                )}

                {/* Capacity Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span>{registeredCount} of {capacity} seats registered</span>
                    </span>
                    <span className="font-semibold text-gray-700">{percentFull}% filled</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${percentFull}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onRegister(event)}
                  disabled={isPast || percentFull >= 100}
                  className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                    isPast
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                      : percentFull >= 100
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isPast ? 'Event Ended' : percentFull >= 100 ? 'Event Full' : 'Register Now'}
                </button>

                <button
                  onClick={() => onViewDetails(event)}
                  className="px-4 py-2.5 rounded-lg font-medium text-sm text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 transition-colors"
                >
                  View Details
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
