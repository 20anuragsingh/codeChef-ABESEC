import React from 'react';
import { 
  X, 
  Printer, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  CheckCircle, 
  Code2, 
  QrCode,
  Download
} from 'lucide-react';

export const TicketModal = ({ isOpen, onClose, registration, event }) => {
  if (!isOpen || !registration || !event) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close pass dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Pass Container */}
        <div id="student-pass-printable" className="p-6 sm:p-7 space-y-6">
          
          {/* Ticket Header */}
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-amber-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base">CodeChef ABESEC</span>
                <span className="px-1.5 py-0.2 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                  OFFICIAL PASS
                </span>
              </div>
              <p className="text-xs text-slate-400">Campus Event Entry Verification</p>
            </div>
          </div>

          {/* Event Title */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              {event.category}
            </span>
            <h3 className="text-xl font-extrabold text-white mt-1 leading-snug">
              {event.title}
            </h3>
          </div>

          {/* Student Pass Badge Details */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-850">
              <span className="text-slate-400 font-sans">Pass Code:</span>
              <span className="text-amber-400 font-bold tracking-wider">{registration.ticketCode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-sans">Attendee:</span>
              <span className="text-white font-sans font-semibold">{registration.fullName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-sans">College/Year:</span>
              <span className="text-slate-200">{registration.collegeYear}</span>
            </div>
            {registration.department && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-sans">Department:</span>
                <span className="text-slate-200 truncate max-w-[190px]">{registration.department}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-sans">Status:</span>
              <span className="text-emerald-400 font-sans font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Verified Registration
              </span>
            </div>
          </div>

          {/* Event Schedule & Location */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
              <span className="text-slate-400 block mb-1">DATE & TIME</span>
              <span className="font-semibold text-white">{event.date}</span>
              <span className="block text-indigo-300 font-mono mt-0.5">{event.time}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
              <span className="text-slate-400 block mb-1">VENUE</span>
              <span className="font-semibold text-white truncate block">{event.venue}</span>
              <span className="block text-amber-300 mt-0.5 font-mono">{event.mode || 'Offline'}</span>
            </div>
          </div>

          {/* Simulated QR Code & Barcode */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-850 px-2">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center shadow-md">
                <QrCode className="w-12 h-12 text-slate-900" />
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                <span className="text-slate-300 font-semibold block">Scan for Gate Check-in</span>
                <span>ABESEC Campus Security Gate</span>
              </div>
            </div>
            <div className="text-right text-[10px] font-mono text-slate-500">
              ID: {registration.id}
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-2.5">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pass</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl font-medium text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
