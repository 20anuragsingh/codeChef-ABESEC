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
  CheckCircle2, 
  RotateCcw,
  ArrowLeft,
  Ticket,
  Mail,
  Phone,
  Lock,
  Check,
  FileSpreadsheet
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
  const [eventCategoryFilter, setEventCategoryFilter] = useState('All Events');

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
    const matchCategory = eventCategoryFilter === 'All Events' || evt.category === eventCategoryFilter;
    return matchSearch && matchCategory;
  });

  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const term = regSearch.toLowerCase();
    const matchSearch = 
      (reg.fullName && reg.fullName.toLowerCase().includes(term)) ||
      (reg.rollNumber && reg.rollNumber.toLowerCase().includes(term)) ||
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
    <div className="min-h-screen bg-gray-50 text-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                <Lock className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Coordinator Panel • CodeChef ABESEC
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Add or edit club events, track student registrations, verify attendance, and download participant lists.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onBackToStudentView}
              className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Student View</span>
            </button>

            <button
              onClick={() => onResetDemoData()}
              className="px-3 py-2 rounded-lg text-xs font-medium bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 flex items-center gap-1.5 transition-colors"
              title="Reset data back to clean sample events"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            <button
              onClick={() => onAddEvent()}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Event</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-2xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Club Events</span>
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{events.length}</div>
            <p className="text-xs text-gray-500 mt-0.5">{upcomingEventsCount} upcoming</p>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-2xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Total Registrations</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{registrations.length}</div>
            <p className="text-xs text-gray-500 mt-0.5">Students registered</p>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-2xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Marked Present</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">{attendedCount}</div>
            <p className="text-xs text-gray-500 mt-0.5">Verified at campus venue</p>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-2xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Download Excel/CSV</span>
              <FileSpreadsheet className="w-4 h-4 text-gray-500" />
            </div>
            <button
              onClick={() => exportRegistrationsToCSV(filteredRegistrations)}
              className="mt-2 w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-3 px-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'events'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Manage Events ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('registrations')}
            className={`pb-3 px-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'registrations'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Registered Students ({registrations.length})</span>
          </button>
        </div>

        {/* TAB 1: MANAGE EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  placeholder="Search events by title or venue..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={() => onAddEvent()}
                className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Event</span>
              </button>
            </div>

            {/* Events Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-gray-50 text-gray-700 border-b border-gray-200 font-bold text-xs uppercase tracking-wide">
                  <tr>
                    <th className="py-3 px-4">Event Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Registered</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500">
                        No events found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((evt) => {
                      const eventRegs = registrations.filter((r) => r.eventId === evt.id);
                      return (
                        <tr key={evt.id} className="hover:bg-gray-50 transition-colors">
                          
                          <td className="py-3 px-4 max-w-xs">
                            <span className="font-bold text-gray-900 block leading-snug">{evt.title}</span>
                            <span className="text-xs text-gray-500 truncate block mt-0.5">{evt.venue}</span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                              {evt.category}
                            </span>
                            <span className="block text-xs text-gray-500 mt-1">
                              {evt.mode || 'In Campus'}
                            </span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="text-gray-900 block font-medium">{evt.date}</span>
                            <span className="text-xs text-gray-500">{evt.time}</span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="font-bold text-blue-600">{eventRegs.length}</span>
                            <span className="text-gray-500"> / {evt.capacity || 100}</span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                              evt.status === 'Completed'
                                ? 'bg-gray-100 text-gray-600'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {evt.status || 'Upcoming'}
                            </span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => onEditEvent(evt)}
                                className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                title="Edit this event"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmation({ type: 'event', id: evt.id, name: evt.title })}
                                className="p-1.5 rounded-lg bg-gray-100 text-red-600 hover:bg-red-50 transition-colors"
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
          <div className="space-y-4">
            
            <div className="p-3.5 bg-white border border-gray-200 rounded-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs">
              
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  placeholder="Search students by name, roll number, email, or slip code..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Filter className="w-3.5 h-3.5 text-blue-600" />
                  <span>Event:</span>
                </div>
                <select
                  value={regEventFilter}
                  onChange={(e) => setRegEventFilter(e.target.value)}
                  className="py-1.5 px-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-[200px] truncate"
                >
                  <option value="All">All Events ({registrations.length})</option>
                  {events.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.title}
                    </option>
                  ))}
                </select>

                <select
                  value={regStatusFilter}
                  onChange={(e) => setRegStatusFilter(e.target.value)}
                  className="py-1.5 px-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="All">All Attendance</option>
                  <option value="Attended">Present</option>
                  <option value="Pending">Absent / Pending</option>
                </select>

                <button
                  onClick={() => exportRegistrationsToCSV(filteredRegistrations)}
                  className="py-1.5 px-3.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                  title="Export to Excel / CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

            </div>

            <div className="text-xs text-gray-500 px-1">
              Found <strong>{filteredRegistrations.length}</strong> student registrations
            </div>

            {/* Registrations Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-gray-50 text-gray-700 border-b border-gray-200 font-bold text-xs uppercase tracking-wide">
                  <tr>
                    <th className="py-3 px-4">Pass No & Name</th>
                    <th className="py-3 px-4">University Roll No</th>
                    <th className="py-3 px-4">Year & Branch</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Registered Event</th>
                    <th className="py-3 px-4">Attendance</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-gray-500">
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
                        <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                          
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                              {reg.ticketCode}
                            </span>
                            <span className="font-bold text-gray-900 block mt-1">{reg.fullName}</span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="font-mono text-xs font-medium text-gray-900">
                              {reg.rollNumber || 'N/A'}
                            </span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="text-gray-900 block font-medium">{reg.collegeYear}</span>
                            <span className="text-xs text-gray-500 block truncate max-w-[180px]">
                              {reg.department || 'CSE'}
                            </span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-gray-700">
                              <Mail className="w-3.5 h-3.5 text-gray-400" />
                              <span>{reg.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 mt-0.5">
                              <Phone className="w-3.5 h-3.5 text-gray-400" />
                              <span>{reg.phone}</span>
                            </div>
                          </td>

                          <td className="py-3 px-4 max-w-xs">
                            <span className="text-gray-900 block truncate font-medium">
                              {reg.eventTitle || matchedEvent.title}
                            </span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <button
                              onClick={() => onToggleAttendance(reg.id)}
                              className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                                reg.attended
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                              title="Toggle check-in status"
                            >
                              {reg.attended ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-800" />
                                  <span>Present</span>
                                </>
                              ) : (
                                <span>Mark Present</span>
                              )}
                            </button>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => onViewTicket(reg, matchedEvent)}
                                className="p-1.5 rounded-lg bg-gray-100 text-blue-600 hover:bg-blue-50 transition-colors"
                                title="View registration pass"
                              >
                                <Ticket className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmation({ type: 'registration', id: reg.id, name: `${reg.fullName} (${reg.rollNumber || reg.ticketCode})` })}
                                className="p-1.5 rounded-lg bg-gray-100 text-red-600 hover:bg-red-50 transition-colors"
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
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-gray-900">
                Confirm Deletion
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Are you sure you want to delete <strong>"{deleteConfirmation.name}"</strong>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white"
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
