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
        particleCount: 60,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Accent */}
        <div className="h-1 bg-blue-600" />

        {/* Modal Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SUCCESS CONFIRMATION STATE */}
        {successRegistration ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Registration Confirmed
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                You're Registered, {successRegistration.fullName}!
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Your entry pass for <strong>{event.title}</strong> is confirmed.
              </p>
            </div>

            {/* Pass Preview Box */}
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-left text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Ticket Pass Code:</span>
                <span className="text-blue-600 font-bold font-mono">{successRegistration.ticketCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Attendee:</span>
                <span className="text-gray-900 font-medium">{successRegistration.fullName}</span>
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
                className="flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Ticket className="w-4 h-4" />
                <span>View & Print Pass</span>
              </button>
              <button
                onClick={handleClose}
                className="py-2.5 px-4 rounded-lg font-medium text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <div className="p-6 sm:p-7">
            
            <div className="mb-5">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Event Registration
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-2">
                {event.title}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  {event.date} at {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span className="truncate max-w-[220px]">{event.venue}</span>
                </span>
              </div>
            </div>

            {generalError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{generalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
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
                    placeholder="e.g. Anurag Singh"
                    className={`w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
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
                    placeholder="e.g. anurag@abes.ac.in"
                    className={`w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* College & Year and Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    College & Year <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <select
                      name="collegeYear"
                      value={formData.collegeYear}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  <label className="block text-xs font-medium text-gray-700 mb-1">
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
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 truncate"
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
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
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
                    className={`w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
                      errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>

              <p className="text-xs text-gray-500 pt-1">
                Entry is free for all registered students. Please carry your college ID.
              </p>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Registration...' : 'Submit Registration'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
