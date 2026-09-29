import React from 'react';
import { 
  X, 
  Printer, 
  CheckCircle, 
  Code2, 
  QrCode,
  ShieldCheck,
  Calendar,
  MapPin
} from 'lucide-react';

export const TicketModal = ({ isOpen, onClose, registration, event }) => {
  if (!isOpen || !registration || !event) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close pass dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Pass Container */}
        <div id="student-pass-printable">
          
          {/* Header */}
          <div className="bg-[#1C4980] text-white p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base">CodeChef ABESEC</span>
                <span className="px-1.5 py-0.2 text-[10px] font-bold bg-[#DEF7EC] text-[#03543F] rounded">
                  E-PASS
                </span>
              </div>
              <p className="text-xs text-blue-200">Official Campus Event Hall Ticket</p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            
            {/* Event Name */}
            <div>
              <span className="text-[11px] font-bold text-[#0073E6] uppercase tracking-wide">
                {event.category}
              </span>
              <h3 className="text-base font-bold text-gray-900 mt-0.5 leading-snug">
                {event.title}
              </h3>
            </div>

            {/* Applicant Details */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-500 font-medium">Application Code:</span>
                <span className="text-[#0073E6] font-bold font-mono text-sm">{registration.ticketCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Candidate:</span>
                <span className="text-gray-900 font-semibold">{registration.fullName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">College / Batch:</span>
                <span className="text-gray-900">{registration.collegeYear}</span>
              </div>
              {registration.department && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Department:</span>
                  <span className="text-gray-900 truncate max-w-[190px]">{registration.department}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="text-green-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified Registration
                </span>
              </div>
            </div>

            {/* Date & Location */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block text-[10px] uppercase font-semibold">Date & Time</span>
                <span className="font-semibold text-gray-900 block mt-0.5">{event.date}</span>
                <span className="text-gray-600 text-[11px]">{event.time}</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block text-[10px] uppercase font-semibold">Venue</span>
                <span className="font-semibold text-gray-900 truncate block mt-0.5">{event.venue}</span>
                <span className="text-gray-600 text-[11px]">{event.mode || 'In Campus'}</span>
              </div>
            </div>

            {/* Simulated QR Code Barcode */}
            <div className="pt-2 flex items-center justify-between border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border border-gray-300 p-1 rounded-lg flex items-center justify-center shadow-xs">
                  <QrCode className="w-10 h-10 text-gray-800" />
                </div>
                <div className="text-xs text-gray-500 leading-tight">
                  <span className="text-gray-900 font-semibold block">Gate Scanner QR</span>
                  <span>Present at college lab entrance</span>
                </div>
              </div>
              <div className="text-right text-xs font-mono text-gray-400">
                ID: {registration.id}
              </div>
            </div>

          </div>

        </div>

        {/* Action Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-2.5">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-full font-semibold text-xs text-white bg-[#0073E6] hover:bg-[#0060c0] flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print E-Pass</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full font-semibold text-xs text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
