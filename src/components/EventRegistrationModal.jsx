import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  GraduationCap, 
  Phone, 
  Calendar, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Ticket
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COLLEGE_YEARS, DEPARTMENTS } from '../data/mockEvents';

export const EventRegistrationModal = ({ 
  isOpen, 
  onClose, 
  event, 
  onRegisterSubmit,
  onShowTicket 
}) => {
  if (!isOpen || !event) return null;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    collegeYear: 'ABESEC - 2nd Year',
    department: 'Computer Science & Engineering (CSE)',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState(null);
  const [generalError, setGeneralError] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.collegeYear) {
      newErrors.collegeYear = 'Please select your College/Year';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-+]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setGeneralError('');

    try {
      // Simulate brief network feedback
      await new Promise((resolve) => setTimeout(resolve, 400));

      const payload = {
        eventId: event.id,
        eventTitle: event.title,
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        collegeYear: formData.collegeYear,
        department: formData.department,
        phone: formData.phone.trim()
      };

      const result = onRegisterSubmit(payload);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSuccessRegistration(result);
    } catch (err) {
      setGeneralError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccessRegistration(null);
    setGeneralError('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-amber-400 to-indigo-500" />

        {/* Modal Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SUCCESS STATE */}
        {successRegistration ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Registration Confirmed!
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                You're in, {successRegistration.fullName}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-sm mx-auto">
                We've secured your seat for <strong className="text-white">{event.title}</strong>.
              </p>
            </div>

            {/* Ticket Preview Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left font-mono text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">PASS CODE</span>
                <span className="text-amber-400 font-bold">{successRegistration.ticketCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">STUDENT</span>
                <span className="text-white font-medium">{successRegistration.fullName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">VENUE</span>
                <span className="text-white truncate max-w-[200px]">{event.venue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">DATE & TIME</span>
                <span className="text-white">{event.date} • {event.time}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onShowTicket(successRegistration, event);
                  handleClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-600 shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>View & Print Pass</span>
              </button>
              <button
                onClick={handleClose}
                className="py-3 px-5 rounded-xl font-medium text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM STATE */
          <div className="p-6 sm:p-8">
            
            {/* Modal Header */}
            <div className="mb-6">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Event Registration
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                Register for {event.title}
              </h2>
              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  {event.date} • {event.time}
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span className="truncate max-w-[220px]">{event.venue}</span>
                </span>
              </div>
            </div>

            {/* General Error Banner */}
            {generalError && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{generalError}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Anurag Singh"
                    className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-slate-700/80 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-400 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. anurag@abes.ac.in or personal email"
                    className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-700/80 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400 font-medium">{errors.email}</p>
                )}
              </div>

              {/* College & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    College & Year <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <select
                      name="collegeYear"
                      value={formData.collegeYear}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {COLLEGE_YEARS.map((cy) => (
                        <option key={cy} value={cy} className="bg-slate-900 text-white">
                          {cy}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Department / Branch */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Department / Branch
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 truncate"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept} className="bg-slate-900 text-white">
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Phone Number (WhatsApp Updates) <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number (e.g. 9876543210)"
                    className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-700/80 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-400 font-medium">{errors.phone}</p>
                )}
              </div>

              {/* Terms note */}
              <p className="text-[11px] text-slate-400 pt-1">
                By submitting, you agree to attend on time at ABESEC campus. Entry is free for verified students.
              </p>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Securing Your Registration...
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Submit Registration</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
