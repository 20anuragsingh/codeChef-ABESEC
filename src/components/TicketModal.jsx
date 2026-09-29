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
        className="relative w-full max-w-md bg-white border border-gray-300 rounded-xl shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Receipt Container */}
        <div id="student-pass-printable" className="p-6 space-y-4">
          
          {/* Official College Chapter Header */}
          <div className="text-center border-b border-gray-200 pb-4">
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              ABES ENGINEERING COLLEGE
            </h2>
            <p className="text-xs text-gray-600 font-medium">
              CodeChef Student Chapter • Campus Event Entry Slip
            </p>
            <div className="mt-2 inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-green-100 text-green-800 border border-green-200">
              REGISTRATION CONFIRMED
            </div>
          </div>

          {/* Event Details */}
          <div>
            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">
              {event.category}
            </span>
            <h3 className="text-base font-bold text-gray-900 mt-0.5 leading-snug">
              {event.title}
            </h3>
          </div>

          {/* Student & Pass Data */}
          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 space-y-2 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
              <span className="text-gray-500 font-medium">Slip / Pass ID:</span>
              <span className="text-blue-700 font-bold font-mono">{registration.ticketCode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Student Name:</span>
              <span className="text-gray-900 font-semibold">{registration.fullName}</span>
            </div>
            {registration.rollNumber && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500">University Roll No:</span>
                <span className="text-gray-900 font-mono font-medium">{registration.rollNumber}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Branch & Batch:</span>
              <span className="text-gray-900">{registration.collegeYear}</span>
            </div>
            {registration.department && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Department:</span>
                <span className="text-gray-900 truncate max-w-[200px]">{registration.department}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Registered On:</span>
              <span className="text-gray-700">{new Date(registration.registeredAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Schedule & Reporting Venue */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">Reporting Time</span>
              <span className="font-semibold text-gray-900 block mt-0.5">{event.date}</span>
              <span className="text-gray-600 text-[11px]">{event.time}</span>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">Venue</span>
              <span className="font-semibold text-gray-900 truncate block mt-0.5">{event.venue}</span>
              <span className="text-gray-600 text-[11px]">ABESEC Campus</span>
            </div>
          </div>

          {/* Instructions note */}
          <div className="p-2.5 rounded bg-blue-50 border border-blue-100 text-[11px] text-blue-900 space-y-0.5">
            <span className="font-bold block">Important Instructions:</span>
            <span>• Please bring your physical College ID card for verification.</span>
            <span>• For coding bootcamps & hackathons, please bring your personal laptop and charger.</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg font-semibold text-xs text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Entry Slip</span>
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
