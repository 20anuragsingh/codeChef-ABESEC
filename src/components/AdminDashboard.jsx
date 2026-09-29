import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  RotateCcw,
  ArrowLeft,
  Ticket,
  Mail,
  Phone,
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  Building2,
  Check
} from 'lucide-react';
import { exportRegistrationsToCSV } from '../services/storageService';

export const AdminDashboard = ({ 
  events, 
  registrations, 
  onAddEvent, 
  onEditEvent, 
  onDeleteEvent, 
  onDeleteRegistration,
  onToggleAttendance,
  onResetDemoData,
  onBackToStudentView,
  onViewTicket
}) => {
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'registrations'

  // Events search & filter
  const [eventSearch, setEventSearch] = useState('');
  const [eventCategoryFilter, setEventCategoryFilter] = useState('All');

  // Registrations search & filter
  const [regSearch, setRegSearch] = useState('');
  const [regEventFilter, setRegEventFilter] = useState('All');
  const [regStatusFilter, setRegStatusFilter] = useState('All'); // 'All' | 'Attended' | 'Pending'

  // Confirm delete modal state
  const [deleteConfirmation, setDeleteConfirmation] = useState(null); // { type: 'event'|'reg', id, name }

  // Filter events
  const filteredEvents = events.filter((evt) => {
    const matchSearch = evt.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
      (evt.venue && evt.venue.toLowerCase().includes(eventSearch.toLowerCase()));
    const matchCategory = eventCategoryFilter === 'All' || evt.category === eventCategoryFilter;
    return matchSearch && matchCategory;
  });

  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const term = regSearch.toLowerCase();
    const matchSearch = 
      (reg.fullName && reg.fullName.toLowerCase().includes(term)) ||
      (reg.email && reg.email.toLowerCase().includes(term)) ||
      (reg.phone && reg.phone.includes(term)) ||
      (reg.ticketCode && reg.ticketCode.toLowerCase().includes(term)) ||
      (reg.eventTitle && reg.eventTitle.toLowerCase().includes(term));

    const matchEvent = regEventFilter === 'All' || reg.eventId === regEventFilter;
    const matchStatus = 
      regStatusFilter === 'All' ||
      (regStatusFilter === 'Attended' && reg.attended) ||
      (regStatusFilter === 'Pending' && !reg.attended);

    return matchSearch && matchEvent && matchStatus;
  });

  const upcomingEventsCount = events.filter((e) => e.status !== 'Completed').length;
  const attendedCount = registrations.filter((r) => r.attended).length;

  const handleDeleteConfirmed = () => {
    if (!deleteConfirmation) return;
    if (deleteConfirmation.type === 'event') {
      onDeleteEvent(deleteConfirmation.id);
    } else if (deleteConfirmation.type === 'registration') {
      onDeleteRegistration(deleteConfirmation.id);
    }
    setDeleteConfirmation(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Admin Operations Portal
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage CodeChef ABESEC club events, track registrations, and verify campus attendees.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onBackToStudentView}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Student View</span>
            </button>

            <button
              onClick={() => onResetDemoData()}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Reset all events and registrations back to clean default demo data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            <button
              onClick={() => onAddEvent()}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Total Events</span>
              <Calendar className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{events.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">{upcomingEventsCount} upcoming</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Student Registrations</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">{registrations.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">Confirmed student passes</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Attendance Verified</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{attendedCount}</div>
            <p className="text-[11px] text-slate-400 mt-1">Checked in at campus</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>CSV Quick Export</span>
              <Download className="w-4 h-4 text-cyan-400" />
            </div>
            <button
              onClick={() => exportRegistrationsToCSV(filteredRegistrations)}
              className="mt-2 w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-3 px-4 font-bold text-sm sm:text-base border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'events'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Manage Events</span>
            <span className="px-2 py-0.2 rounded-full text-xs bg-slate-800 text-slate-300">
              {events.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('registrations')}
            className={`pb-3 px-4 font-bold text-sm sm:text-base border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'registrations'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Registered Students</span>
            <span className="px-2 py-0.2 rounded-full text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {registrations.length}
            </span>
          </button>
        </div>

        {/* TAB 1: MANAGE EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            
            {/* Search & Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  placeholder="Search events by title or venue..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => onAddEvent()}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Event</span>
                </button>
              </div>
            </div>

            {/* Events Table / List */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] font-mono border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Event Details</th>
                    <th className="py-3.5 px-4">Category & Mode</th>
                    <th className="py-3.5 px-4">Schedule</th>
                    <th className="py-3.5 px-4">Capacity</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        No events found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((evt) => {
                      const eventRegs = registrations.filter((r) => r.eventId === evt.id);
                      return (
                        <tr key={evt.id} className="hover:bg-slate-850/50 transition-colors">
                          
                          {/* Title & Featured */}
                          <td className="py-4 px-4 max-w-xs">
                            <div className="flex items-start gap-2.5">
                              {evt.featured && (
                                <span className="text-amber-400 shrink-0 mt-0.5" title="Featured Spotlight">
                                  ★
                                </span>
                              )}
                              <div>
                                <span className="font-bold text-white block leading-snug">{evt.title}</span>
                                <span className="text-[11px] text-slate-400 truncate block mt-0.5">{evt.venue}</span>
                              </div>
                            </div>
                          </td>

                          {/* Category & Mode */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                              {evt.category}
                            </span>
                            <span className="block text-[11px] text-slate-400 mt-1 font-mono">
                              {evt.mode || 'Offline'}
                            </span>
                          </td>

                          {/* Date & Time */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="font-medium text-white">{evt.date}</span>
                            <span className="block text-[11px] text-slate-400 font-mono">{evt.time}</span>
                          </td>

                          {/* Capacity / Regs */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="font-bold text-amber-300">{eventRegs.length}</span>
                            <span className="text-slate-400"> / {evt.capacity || 100}</span>
                            <div className="w-16 h-1 rounded-full bg-slate-800 mt-1.5 overflow-hidden">
                              <div 
                                className="h-full bg-indigo-500 rounded-full"
                                style={{ width: `${Math.min(100, ((eventRegs.length) / (evt.capacity || 100)) * 100)}%` }}
                              />
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              evt.status === 'Completed'
                                ? 'bg-slate-800 text-slate-400'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}>
                              {evt.status || 'Upcoming'}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-4 whitespace-nowrap text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => onEditEvent(evt)}
                                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 transition-colors"
                                title="Edit this event"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmation({ type: 'event', id: evt.id, name: evt.title })}
                                className="p-2 rounded-lg bg-slate-800 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                                title="Delete this event"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: REGISTERED STUDENTS */}
        {activeTab === 'registrations' && (
          <div className="space-y-6">
            
            {/* Search & Filter Registrations */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              
              {/* Search text input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  placeholder="Search students by name, email, phone, or ticket pass code..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Filter by Event */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Filter className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Event:</span>
                </div>
                <select
                  value={regEventFilter}
                  onChange={(e) => setRegEventFilter(e.target.value)}
                  className="py-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-[200px] truncate"
                >
                  <option value="All">All Events ({registrations.length})</option>
                  {events.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.title}
                    </option>
                  ))}
                </select>

                {/* Filter by Attendance */}
                <select
                  value={regStatusFilter}
                  onChange={(e) => setRegStatusFilter(e.target.value)}
                  className="py-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Status</option>
                  <option value="Attended">Attended</option>
                  <option value="Pending">Pending Check-in</option>
                </select>

                {/* CSV Download */}
                <button
                  onClick={() => exportRegistrationsToCSV(filteredRegistrations)}
                  className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Export filtered registrations to CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

            </div>

            {/* Results count banner */}
            <div className="text-xs text-slate-400 flex items-center justify-between px-1">
              <span>
                Found <strong className="text-amber-400">{filteredRegistrations.length}</strong> student registrations
              </span>
            </div>

            {/* Registrations Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] font-mono border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Pass & Attendee</th>
                    <th className="py-3.5 px-4">College / Year & Branch</th>
                    <th className="py-3.5 px-4">Contact Info</th>
                    <th className="py-3.5 px-4">Registered Event</th>
                    <th className="py-3.5 px-4">Attendance</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        No registrations found matching the specified filters.
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((reg) => {
                      const matchedEvent = events.find((e) => e.id === reg.eventId) || {
                        title: reg.eventTitle || 'Campus Event',
                        date: 'Upcoming',
                        time: '',
                        venue: 'ABESEC'
                      };

                      return (
                        <tr key={reg.id} className="hover:bg-slate-850/50 transition-colors">
                          
                          {/* Pass Code & Name */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                {reg.ticketCode}
                              </span>
                            </div>
                            <span className="font-bold text-white block mt-1">{reg.fullName}</span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              Reg: {new Date(reg.registeredAt).toLocaleDateString()}
                            </span>
                          </td>

                          {/* College/Year & Dept */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="text-white block font-medium">{reg.collegeYear}</span>
                            <span className="text-xs text-slate-400 block truncate max-w-[200px]">
                              {reg.department || 'Computer Science'}
                            </span>
                          </td>

                          {/* Contact Info */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <Mail className="w-3.5 h-3.5 text-indigo-400" />
                              <span>{reg.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                              <Phone className="w-3.5 h-3.5 text-amber-400" />
                              <span className="font-mono text-xs">{reg.phone}</span>
                            </div>
                          </td>

                          {/* Event Title */}
                          <td className="py-4 px-4 max-w-xs">
                            <span className="font-semibold text-slate-200 block truncate">
                              {reg.eventTitle || matchedEvent.title}
                            </span>
                          </td>

                          {/* Attendance Status Toggle */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <button
                              onClick={() => onToggleAttendance(reg.id)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                reg.attended
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                              }`}
                              title="Click to toggle attendance check-in"
                            >
                              {reg.attended ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>Present</span>
                                </>
                              ) : (
                                <span>Mark Present</span>
                              )}
                            </button>
                          </td>

                          {/* Actions: View Pass & Delete */}
                          <td className="py-4 px-4 whitespace-nowrap text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => onViewTicket(reg, matchedEvent)}
                                className="p-2 rounded-lg bg-slate-800 text-indigo-400 hover:text-indigo-300 hover:bg-slate-750 transition-colors"
                                title="View digital attendee ticket"
                              >
                                <Ticket className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmation({ type: 'registration', id: reg.id, name: `${reg.fullName} (${reg.ticketCode})` })}
                                className="p-2 rounded-lg bg-slate-800 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                                title="Cancel registration"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {deleteConfirmation && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-white">
                  Confirm Deletion
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  Are you sure you want to delete <strong className="text-white">"{deleteConfirmation.name}"</strong>? 
                  {deleteConfirmation.type === 'event' && ' This will also remove any associated registrations.'}
                </p>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-750"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/30"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
