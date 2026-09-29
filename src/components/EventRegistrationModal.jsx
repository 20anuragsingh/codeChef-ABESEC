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
  FileText
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
    rollNumber: '',
    email: '',
    collegeYear: '2nd Year (2024-28)',
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
      newErrors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'University Roll Number is required';
    } else if (formData.rollNumber.trim().length < 5) {
      newErrors.rollNumber = 'Please enter a valid roll number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.collegeYear) {
      newErrors.collegeYear = 'Please select your current year';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'WhatsApp number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-+]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
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
        rollNumber: formData.rollNumber.trim().toUpperCase(),
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
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-blue-300 block uppercase tracking-wider">
              ABES Engineering College • CodeChef Chapter
            </span>
            <h2 className="text-base font-bold text-white mt-0.5">
              Event Registration
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SUCCESS CONFIRMATION STATE */}
        {successRegistration ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Registration Confirmed
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                Seat Reserved, {successRegistration.fullName}!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                You have successfully registered for <strong>{event.title}</strong>.
              </p>
            </div>

            {/* Registration Slip Summary Box */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-left text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Registration Slip No:</span>
                <span className="text-blue-600 font-bold font-mono text-sm">{successRegistration.ticketCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Student Name:</span>
                <span className="text-gray-900 font-semibold">{successRegistration.fullName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">University Roll No:</span>
                <span className="text-gray-900 font-mono font-medium">{successRegistration.rollNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Branch & Year:</span>
                <span className="text-gray-900">{successRegistration.collegeYear}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Venue:</span>
                <span className="text-gray-900 truncate max-w-[210px]">{event.venue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Date & Time:</span>
                <span className="text-gray-900">{event.date} • {event.time}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={() => {
                  onShowTicket(successRegistration, event);
                  handleClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Ticket className="w-4 h-4" />
                <span>View & Print Entry Slip</span>
              </button>
              <button
                onClick={handleClose}
                className="py-2.5 px-4 rounded-lg font-semibold text-xs sm:text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <div className="p-6">
            
            {/* Event Header Card */}
            <div className="mb-4 p-3 bg-blue-50/60 border border-blue-200 rounded-lg">
              <h3 className="text-xs sm:text-sm font-bold text-blue-950">
                {event.title}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-blue-800">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  {event.date} ({event.time})
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span className="truncate max-w-[200px]">{event.venue}</span>
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name (as per college ID) <span className="text-red-500">*</span>
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
                    className={`w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* University Roll Number & WhatsApp Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    University Roll Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      placeholder="e.g. 2200320100014"
                      className={`w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.rollNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.rollNumber && (
                    <p className="mt-1 text-xs text-red-600">{errors.rollNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    WhatsApp Number <span className="text-red-500">*</span>
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
                      placeholder="10-digit number"
                      className={`w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* College Email */}
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
                    placeholder="e.g. student@abes.ac.in or personal email"
                    className={`w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Year of Study & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Year of Study <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <select
                      name="collegeYear"
                      value={formData.collegeYear}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 truncate"
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

              <p className="text-[11px] text-gray-500 pt-1 leading-relaxed">
                Registration is completely free for ABESEC students. Room & lab allotment details will be shared on WhatsApp.
              </p>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-lg font-bold text-white text-sm bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Registering your seat...' : 'Confirm Registration'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
