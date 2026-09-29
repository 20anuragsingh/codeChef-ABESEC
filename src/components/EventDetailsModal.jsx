import React from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  Share2, 
  Tag, 
  CheckCircle2, 
  Award,
  Clock,
  Building
} from 'lucide-react';

export const EventDetailsModal = ({ isOpen, onClose, event, registrationCount = 0, onRegister }) => {
  if (!isOpen || !event) return null;

  const isPast = event.status === 'Completed' || new Date(event.dateTimeIso || event.date) < new Date();
  const capacity = event.capacity || 100;
  const isFull = registrationCount >= capacity;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Opportunity link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Badges */}
        <div className="relative h-56 sm:h-64 w-full bg-gray-100 overflow-hidden">
          <img 
            src={event.bannerImage || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DEF7EC] text-[#03543F] shadow-xs">
              {event.entryFee || 'Free Entry'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-gray-900 shadow-xs">
              {event.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1C4980] text-white">
              {event.mode || 'In Campus'}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          
          <div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <span className="font-semibold text-[#1C4980]">{event.organizer}</span>
              <span>•</span>
              <span>{event.college}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C4980] leading-tight">
              {event.title}
            </h2>
          </div>

          {/* Unstop Opportunity Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">Eligibility</span>
              <span className="font-semibold text-gray-900 block mt-0.5 truncate">{event.eligibility || 'Open to All'}</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">Team Size</span>
              <span className="font-semibold text-gray-900 block mt-0.5">{event.teamSize || 'Individual'}</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">Impressions</span>
              <span className="font-semibold text-gray-900 block mt-0.5">{event.impressions || '2.4k Views'}</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">Applications</span>
              <span className="font-semibold text-[#0073E6] block mt-0.5">{registrationCount} of {capacity}</span>
            </div>
          </div>

          {/* Schedule & Venue Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#EBF3FC] border border-[#BFDBFE] flex items-center gap-2.5 text-[#1C4980]">
              <Calendar className="w-5 h-5 text-[#0073E6] shrink-0" />
              <div>
                <span className="font-bold block">Date & Reporting Time</span>
                <span>{event.date} ({event.time})</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2.5 text-gray-800">
              <MapPin className="w-5 h-5 text-[#0073E6] shrink-0" />
              <div className="truncate">
                <span className="font-bold block">Venue Location</span>
                <span className="truncate block">{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Stages & Guidelines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Opportunity Overview & Guidelines
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Rewards & Prizes */}
          {event.prizes && (
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
              <Trophy className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-amber-900 uppercase">
                  Prizes & Certificates
                </h5>
                <p className="text-sm font-semibold text-amber-950 mt-0.5">
                  {event.prizes}
                </p>
              </div>
            </div>
          )}

          {/* Topic Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {event.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Bar */}
          <div className="text-xs text-gray-500 flex items-center justify-between border-t border-gray-100 pt-3">
            <span>Verified Organizer: <strong className="text-gray-800">{event.organizer}</strong></span>
            <button 
              onClick={handleShare}
              className="text-xs text-[#0073E6] hover:text-[#005bb5] flex items-center gap-1 font-bold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Opportunity</span>
            </button>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full font-semibold text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onRegister(event);
            }}
            disabled={isPast || isFull}
            className={`px-6 py-2 rounded-full font-bold text-xs sm:text-sm transition-colors shadow-xs ${
              isPast
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : isFull
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
                : 'bg-[#0073E6] hover:bg-[#0060c0] text-white'
            }`}
          >
            {isPast ? 'Opportunity Ended' : isFull ? 'Applications Closed' : 'Apply Now on Unstop'}
          </button>
        </div>

      </div>
    </div>
  );
};
