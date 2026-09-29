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
  Ticket,
  ShieldCheck
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
      await new Promise((resolve) => setTimeout(resolve, 300));

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

      confetti({
        particleCount: 70,
        spread: 60,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Unstop Blue Top Header Bar */}
        <div className="bg-[#1C4980] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-300" />
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-blue-200 block">
                Unstop Style Application
              </span>
              <h2 className="text-base font-bold text-white leading-tight">
                {event.title}
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SUCCESS CONFIRMATION STATE */}
        {successRegistration ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#DEF7EC] text-[#03543F] flex items-center justify-center mx-auto border border-green-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#03543F]">
                Application Submitted
              </span>
              <h3 className="text-xl font-bold text-[#1C4980] mt-1">
                You're In, {successRegistration.fullName}!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Your registration for <strong>{event.title}</strong> has been confirmed.
              </p>
            </div>

            {/* Unstop Application Pass Box */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-left text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Application Number:</span>
                <span className="text-[#0073E6] font-bold font-mono text-sm">{successRegistration.ticketCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Applicant:</span>
                <span className="text-gray-900 font-semibold">{successRegistration.fullName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">College / Year:</span>
                <span className="text-gray-900">{successRegistration.collegeYear}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Venue:</span>
                <span className="text-gray-900 truncate max-w-[200px]">{event.venue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Date & Time:</span>
                <span className="text-gray-900">{event.date} • {event.time}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onShowTicket(successRegistration, event);
                  handleClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-full font-bold text-xs sm:text-sm bg-[#0073E6] text-white hover:bg-[#0060c0] flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Ticket className="w-4 h-4" />
                <span>View Hall Ticket / Pass</span>
              </button>
              <button
                onClick={handleClose}
                className="py-2.5 px-5 rounded-full font-semibold text-xs sm:text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <div className="p-6">
            
            {/* Quick Opportunity Meta Bar */}
            <div className="mb-5 p-3 rounded-xl bg-[#EBF3FC] border border-[#BFDBFE] flex items-center justify-between text-xs text-[#1C4980]">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#0073E6]" />
                {event.date} ({event.time})
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DEF7EC] text-[#03543F]">
                Free Entry
              </span>
            </div>

            {generalError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{generalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0073E6] transition-all ${
                      errors.fullName ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. yourname@abes.ac.in or personal email"
                    className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0073E6] transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
                )}
              </div>

              {/* College & Year & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    College & Academic Year <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <select
                      name="collegeYear"
                      value={formData.collegeYear}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0073E6]"
                    >
                      {COLLEGE_YEARS.map((cy) => (
                        <option key={cy} value={cy}>
                          {cy}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Department / Branch
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0073E6] truncate"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Contact Number (WhatsApp Updates) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0073E6] transition-all ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>
                )}
              </div>

              <p className="text-[11px] text-gray-500 pt-1 leading-relaxed">
                By clicking Submit Application, you agree to CodeChef ABESEC code of conduct and event eligibility guidelines.
              </p>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-full font-bold text-white text-sm bg-[#0073E6] hover:bg-[#0060c0] shadow-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting Application...
                    </span>
                  ) : (
                    <span>Submit Application</span>
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
