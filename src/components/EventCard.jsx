import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  Clock, 
  ArrowRight
} from 'lucide-react';

export const EventCard = ({ event, registrationCount = 0, onRegister, onViewDetails }) => {
  const isPast = event.status === 'Completed' || new Date(event.dateTimeIso || event.date) < new Date();
  const capacity = event.capacity || 100;
  const isFull = registrationCount >= capacity;

  // Calculate days left
  const calculateDaysLeft = () => {
    const target = new Date(event.dateTimeIso || event.date).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const daysLeft = calculateDaysLeft();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-sm hover:border-gray-300 transition-all flex flex-col justify-between">
      
      <div>
        {/* Cover Image */}
        <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
          <img 
            src={event.bannerImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"} 
            alt={event.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-white text-gray-800 border border-gray-200 shadow-2xs">
              {event.category}
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-900 text-white">
              {event.mode || 'In Campus'}
            </span>
          </div>

          <div className="absolute bottom-2.5 right-3">
            {!isPast ? (
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-100 text-amber-900 border border-amber-200">
                {daysLeft > 0 ? `${daysLeft} days to go` : 'Today'}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                Concluded
              </span>
            )}
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5">
          
          {/* Date & Time */}
          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold mb-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{event.date} • {event.time}</span>
          </div>

          {/* Event Title */}
          <h3 
            onClick={() => onViewDetails(event)}
            className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {event.title}
          </h3>

          {/* Venue & Perks */}
          <div className="mt-2.5 space-y-1.5 text-xs text-gray-600">
            <div className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>

            {event.prizes && (
              <div className="flex items-center gap-1.5 text-amber-800 font-medium">
                <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="line-clamp-1">{event.prizes}</span>
              </div>
            )}
          </div>

          {/* Short Description */}
          <p className="mt-2.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {event.shortDescription || event.description}
          </p>

        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            <span><strong className="text-gray-900">{registrationCount}</strong> / {capacity} seats</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(event)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Details
            </button>

            <button
              onClick={() => onRegister(event)}
              disabled={isPast || isFull}
              className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-colors ${
                isPast
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  : isFull
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isPast ? 'Closed' : isFull ? 'Full' : 'Register'}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
