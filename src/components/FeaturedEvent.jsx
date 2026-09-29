import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Users, 
  ArrowRight,
  ShieldAlert,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const FeaturedEvent = ({ event, registrationCount, onRegister, onViewDetails }) => {
  if (!event) return null;

  // Countdown timer calculations
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
    <section id="featured-event-section" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>Flagship Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Club Event
            </h2>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            High Priority
          </span>
        </div>

        {/* Featured Card */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900/90 border border-amber-500/30 shadow-2xl shadow-amber-500/10 glow-amber transition-all">
          
          {/* Ambient header glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-indigo-500 to-amber-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Cover Column */}
            <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] overflow-hidden">
              <img 
                src={event.bannerImage || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"} 
                alt={event.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-500 text-slate-950 shadow-md">
                  {event.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-white/10">
                  {event.mode || 'Offline'}
                </span>
              </div>

              {event.prizes && (
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
                  <Trophy className="w-4 h-4 shrink-0 text-amber-400" />
                  <span className="truncate font-semibold">{event.prizes}</span>
                </div>
              )}
            </div>

            {/* Event Info Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                
                {/* Countdown display */}
                {!isPast && (
                  <div className="mb-5 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      Starts in:
                    </span>
                    <div className="flex items-center gap-2 sm:gap-3 text-center">
                      <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-850">
                        <span className="text-sm sm:text-base font-bold text-white font-mono">{timeLeft.days}</span>
                        <span className="text-[10px] block text-slate-400 uppercase">Days</span>
                      </div>
                      <span className="text-slate-600 font-bold">:</span>
                      <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-850">
                        <span className="text-sm sm:text-base font-bold text-white font-mono">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="text-[10px] block text-slate-400 uppercase">Hrs</span>
                      </div>
                      <span className="text-slate-600 font-bold">:</span>
                      <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-850">
                        <span className="text-sm sm:text-base font-bold text-white font-mono">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="text-[10px] block text-slate-400 uppercase">Min</span>
                      </div>
                      <span className="text-slate-600 font-bold">:</span>
                      <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-850">
                        <span className="text-sm sm:text-base font-bold text-amber-400 font-mono">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="text-[10px] block text-slate-400 uppercase">Sec</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Event Name */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {event.title}
                </h3>

                {/* Event Meta: Date & Venue */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="font-medium text-white">{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate text-slate-200">{event.venue}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {event.description}
                </p>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {event.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md text-xs bg-slate-800 text-slate-300 border border-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Capacity Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Registrations: <strong className="text-white">{registeredCount}</strong> / {capacity} seats</span>
                    </span>
                    <span className="font-semibold text-amber-400">{percentFull}% filled</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentFull}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onRegister(event)}
                  disabled={isPast || percentFull >= 100}
                  className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg ${
                    isPast
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      : percentFull >= 100
                      ? 'bg-slate-800 text-amber-400 cursor-not-allowed border border-amber-500/30'
                      : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isPast ? 'Event Concluded' : percentFull >= 100 ? 'Event Full (Registrations Closed)' : 'Register for Featured Event'}
                  </span>
                </button>

                <button
                  onClick={() => onViewDetails(event)}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-300 bg-slate-800/80 hover:bg-slate-750 hover:text-white border border-slate-700 transition-all text-center"
                >
                  Full Details & Schedule
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
