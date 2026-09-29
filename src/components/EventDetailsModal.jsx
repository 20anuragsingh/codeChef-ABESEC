import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Users, 
  CheckCircle, 
  Sparkles, 
  Share2, 
  ShieldCheck,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Image */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950">
          <img 
            src={event.bannerImage || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900 backdrop-blur-md transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 shadow">
                {event.category}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/80 backdrop-blur-md text-white border border-white/10">
                {event.mode || 'Offline'}
              </span>
              {event.featured && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow">
                  ★ Flagship
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Key Info Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-indigo-400 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date & Time</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white">{event.date}</p>
              <p className="text-xs text-slate-400 font-mono">{event.time}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Venue</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white truncate">{event.venue}</p>
              <p className="text-xs text-slate-400">ABES Engineering College</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>Registration</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white">
                {registrationCount} / {capacity}
              </p>
              <p className="text-xs text-slate-400">{isFull ? 'Seats Full' : 'Open for All'}</p>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
              Event Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Perks & Prizes */}
          {event.prizes && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                  Perks, Rewards & Recognition
                </h5>
                <p className="text-sm font-medium text-amber-100 mt-0.5">
                  {event.prizes}
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Topic Tags</span>
              </h5>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Organizer */}
          <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-4">
            <span>Organized by: <strong className="text-white">{event.organizer || 'CodeChef ABESEC'}</strong></span>
            <button 
              onClick={handleShare}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Event</span>
            </button>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-medium text-sm text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onRegister(event);
            }}
            disabled={isPast || isFull}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
              isPast
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : isFull
                ? 'bg-slate-800 text-amber-400 cursor-not-allowed border border-amber-500/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isPast ? 'Concluded' : isFull ? 'Event Full' : 'Proceed to Registration'}
          </button>
        </div>

      </div>
    </div>
  );
};
