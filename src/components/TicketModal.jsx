import React from 'react';
import { 
  X, 
  Printer, 
  CheckCircle, 
  Code2, 
  QrCode
} from 'lucide-react';

export const TicketModal = ({ isOpen, onClose, registration, event }) => {
  if (!isOpen || !registration || !event) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close pass dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Pass Container */}
        <div id="student-pass-printable" className="p-6 space-y-5">
          
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-base">CodeChef ABESEC</span>
                <span className="px-1.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded">
                  PASS
                </span>
              </div>
              <p className="text-xs text-gray-500">Official Campus Event Ticket</p>
            </div>
          </div>

          {/* Event Title */}
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase">
              {event.category}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-0.5 leading-snug">
              {event.title}
            </h3>
          </div>

          {/* Attendee Details */}
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-2.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Pass Code:</span>
              <span className="text-blue-600 font-bold font-mono text-sm">{registration.ticketCode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Attendee:</span>
              <span className="text-gray-900 font-semibold">{registration.fullName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">College / Year:</span>
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
                Verified
              </span>
            </div>
          </div>

          {/* Event Schedule & Location */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-gray-500 block mb-0.5">DATE & TIME</span>
              <span className="font-semibold text-gray-900 block">{event.date}</span>
              <span className="text-gray-600">{event.time}</span>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-gray-500 block mb-0.5">VENUE</span>
              <span className="font-semibold text-gray-900 truncate block">{event.venue}</span>
              <span className="text-gray-600">{event.mode || 'Offline'}</span>
            </div>
          </div>

          {/* QR Code and verification */}
          <div className="pt-2 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 border border-gray-300 p-1 rounded-lg flex items-center justify-center">
                <QrCode className="w-10 h-10 text-gray-800" />
              </div>
              <div className="text-xs text-gray-500">
                <span className="text-gray-800 font-medium block">Entry Verification</span>
                <span>Present at venue entrance</span>
              </div>
            </div>
            <div className="text-right text-xs font-mono text-gray-400">
              ID: {registration.id}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg font-medium text-xs text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pass</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium text-xs text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
