import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users
} from 'lucide-react';

export const EventCard = ({ event, registrationCount = 0, onRegister, onViewDetails }) => {
  const isPast = event.status === 'Completed' || new Date(event.dateTimeIso || event.date) < new Date();
  const capacity = event.capacity || 100;
  const isFull = registrationCount >= capacity;
  const percentFull = Math.min(100, Math.round((registrationCount / capacity) * 100));

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
      
      {/* Event Cover Image */}
      <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
        <img 
          src={event.bannerImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"} 
          alt={event.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-white text-gray-800 shadow-xs border border-gray-200">
            {event.category}
          </span>
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-900 text-white">
            {event.mode || 'Offline'}
          </span>
        </div>

        {/* Status Tag */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            isPast 
              ? 'bg-gray-100 text-gray-600 border border-gray-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {isPast ? 'Concluded' : 'Upcoming'}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-xs font-medium text-blue-600 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{event.date}</span>
            <span className="text-gray-300">•</span>
            <Clock className="w-3.5 h-3.5" />
            <span>{event.time}</span>
          </div>

          {/* Event Title */}
          <h3 
            onClick={() => onViewDetails(event)}
            className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {event.title}
          </h3>

          {/* Venue */}
          <div className="mt-2 flex items-start gap-1.5 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>

          {/* Description */}
          <p className="mt-2.5 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {event.shortDescription || event.description}
          </p>

          {/* Capacity Progress */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                <span>{registrationCount} registered</span>
              </span>
              <span>{capacity - registrationCount > 0 ? `${capacity - registrationCount} seats left` : 'Full'}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${percentFull}%` }}
              />
            </div>
          </div>
        </div>

        {/* Buttons Footer */}
        <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-2">
          <button
            onClick={() => onRegister(event)}
            disabled={isPast || isFull}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold text-xs transition-colors ${
              isPast
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : isFull
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isPast ? 'Closed' : isFull ? 'Event Full' : 'Register Now'}
          </button>

          <button
            onClick={() => onViewDetails(event)}
            className="py-2 px-3 rounded-lg font-medium text-xs text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 transition-colors"
          >
            Details
          </button>
        </div>

      </div>

    </div>
  );
};
