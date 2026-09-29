import React from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  Share2, 
  Tag
} from 'lucide-react';

export const EventDetailsModal = ({ isOpen, onClose, event, registrationCount = 0, onRegister }) => {
  if (!isOpen || !event) return null;

  const isPast = event.status === 'Completed' || new Date(event.dateTimeIso || event.date) < new Date();
  const capacity = event.capacity || 100;
  const isFull = registrationCount >= capacity;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Event Banner */}
        <div className="relative h-56 sm:h-64 w-full bg-gray-100 overflow-hidden">
          <img 
            src={event.bannerImage || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 flex gap-2">
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-white text-gray-900 shadow-xs border border-gray-200">
              {event.category}
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-medium bg-gray-900 text-white">
              {event.mode || 'Offline'}
            </span>
            {event.featured && (
              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-600 text-white">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {event.title}
          </h2>

          {/* Key Info Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-1.5 text-xs text-blue-600 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date & Time</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">{event.date}</p>
              <p className="text-xs text-gray-500">{event.time}</p>
            </div>

            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-1.5 text-xs text-blue-600 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Venue</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{event.venue}</p>
              <p className="text-xs text-gray-500">ABES Engineering College</p>
            </div>

            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-1.5 text-xs text-blue-600 mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>Registrations</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">
                {registrationCount} / {capacity}
              </p>
              <p className="text-xs text-gray-500">{isFull ? 'Seats Full' : 'Open'}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Description
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Perks & Prizes */}
          {event.prizes && (
            <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200 flex items-start gap-2.5">
              <Trophy className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-blue-900 uppercase">
                  Prizes & Certificates
                </h5>
                <p className="text-xs sm:text-sm text-blue-950 mt-0.5">
                  {event.prizes}
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div>
              <h5 className="text-xs font-medium text-gray-500 mb-1.5 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Tags</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {event.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded text-xs bg-gray-100 text-gray-700 border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Organizer & Share */}
          <div className="text-xs text-gray-500 flex items-center justify-between border-t border-gray-100 pt-3">
            <span>Organized by: <strong className="text-gray-800">{event.organizer || 'CodeChef ABESEC'}</strong></span>
            <button 
              onClick={handleShare}
              className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium text-sm text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onRegister(event);
            }}
            disabled={isPast || isFull}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-colors ${
              isPast
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : isFull
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isPast ? 'Ended' : isFull ? 'Event Full' : 'Register Now'}
          </button>
        </div>

      </div>
    </div>
  );
};
