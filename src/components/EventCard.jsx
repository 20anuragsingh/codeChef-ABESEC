import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  Clock, 
  CheckCircle,
  ExternalLink
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
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      
      <div>
        {/* Card Thumbnail / Header Image */}
        <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
          <img 
            src={event.bannerImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />

          {/* Badges on Top */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DEF7EC] text-[#03543F] border border-green-200 shadow-xs">
              {event.entryFee || 'Free'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/95 text-gray-800 shadow-xs border border-gray-200">
              {event.mode || 'In Campus'}
            </span>
          </div>

          {/* Days Left badge at bottom */}
          <div className="absolute bottom-2.5 left-3">
            {!isPast ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 shadow-xs">
                🔥 {daysLeft > 0 ? `${daysLeft} days left` : 'Happening today'}
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                Concluded
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          
          {/* Organization & Category Bar */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 truncate">
              <span className="w-5 h-5 rounded-md bg-[#1C4980] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                CC
              </span>
              <span className="font-semibold text-gray-700 truncate">CodeChef ABESEC</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EBF3FC] text-[#0073E6] shrink-0">
              {event.category}
            </span>
          </div>

          {/* Opportunity Title */}
          <h3 
            onClick={() => onViewDetails(event)}
            className="text-base font-bold text-[#1C4980] hover:text-[#0073E6] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {event.title}
          </h3>

          {/* Unstop Metadata Chips */}
          <div className="mt-3 space-y-1.5 text-xs text-gray-600">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{event.date} • {event.time}</span>
            </div>

            {event.prizes && (
              <div className="flex items-center gap-1.5 text-amber-700 font-medium truncate">
                <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{event.prizes}</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            <span><strong className="text-gray-900">{registrationCount}</strong> applied</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(event)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Details
            </button>

            <button
              onClick={() => onRegister(event)}
              disabled={isPast || isFull}
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all ${
                isPast
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  : isFull
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
                  : 'bg-[#0073E6] hover:bg-[#0060c0] text-white shadow-xs'
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
