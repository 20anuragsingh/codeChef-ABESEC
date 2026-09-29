import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRight, 
  Sparkles,
  Trophy,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const EventCard = ({ event, registrationCount = 0, onRegister, onViewDetails }) => {
  const isPast = event.status === 'Completed' || new Date(event.dateTimeIso || event.date) < new Date();
  const capacity = event.capacity || 100;
  const isFull = registrationCount >= capacity;
  const percentFull = Math.min(100, Math.round((registrationCount / capacity) * 100));

  // Category color mapper
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Hackathon':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Competitive Programming':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'Workshop':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Tech Talk':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="flex flex-col rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-950/30 group">
      
      {/* Event Image & Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img 
          src={event.bannerImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"} 
          alt={event.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-md ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700">
            {event.mode || 'Offline'}
          </span>
        </div>

        {/* Featured Tag if applicable */}
        {event.featured && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500 text-slate-950 shadow-md">
              <Sparkles className="w-3 h-3" />
              Featured Event
            </span>
          </div>
        )}

        {/* Status tag */}
        <div className="absolute bottom-3 right-3">
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
            isPast 
              ? 'bg-slate-800 text-slate-400 border border-slate-700' 
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {isPast ? 'Concluded' : 'Upcoming'}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-xs font-medium text-indigo-400 mb-2">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{event.date}</span>
            <span className="text-slate-600">•</span>
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{event.time}</span>
          </div>

          {/* Event Name */}
          <h3 
            onClick={() => onViewDetails(event)}
            className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {event.title}
          </h3>

          {/* Venue */}
          <div className="mt-2.5 flex items-start gap-1.5 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>

          {/* Description */}
          <p className="mt-3 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
            {event.shortDescription || event.description}
          </p>

          {/* Capacity and Registration count */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span><strong className="text-white">{registrationCount}</strong> registered</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {capacity - registrationCount > 0 ? `${capacity - registrationCount} seats left` : 'Fully Booked'}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  percentFull >= 90 ? 'bg-amber-500' : 'bg-indigo-500'
                }`}
                style={{ width: `${percentFull}%` }}
              />
            </div>
          </div>
        </div>

        {/* Buttons / Card Action Footer */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2">
          <button
            onClick={() => onRegister(event)}
            disabled={isPast || isFull}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
              isPast
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : isFull
                ? 'bg-slate-800 text-amber-400/90 cursor-not-allowed border border-amber-500/20'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 active:scale-[0.98]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isPast ? 'Closed' : isFull ? 'Event Full' : 'Register Now'}
            </span>
          </button>

          <button
            onClick={() => onViewDetails(event)}
            className="py-2.5 px-3 rounded-xl font-semibold text-xs text-slate-300 bg-slate-800 hover:bg-slate-700/90 hover:text-white border border-slate-700 transition-colors"
            title="View complete event description and details"
          >
            Details
          </button>
        </div>

      </div>

    </div>
  );
};
