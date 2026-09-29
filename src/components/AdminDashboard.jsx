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
  ShieldCheck,
  Check,
  Trophy,
  Award
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
  const [eventCategoryFilter, setEventCategoryFilter] = useState('All Opportunities');

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
    const matchCategory = eventCategoryFilter === 'All Opportunities' || evt.category === eventCategoryFilter;
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
    <div className="min-h-screen bg-[#F7F9FB] text-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#EBF3FC] text-[#0073E6]">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-[#1C4980]">
                Unstop for Organizers • CodeChef ABESEC
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Host opportunities, track student applications, and manage campus event participation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onBackToStudentView}
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portal</span>
            </button>

            <button
              onClick={() => onResetDemoData()}
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 flex items-center gap-1.5 transition-colors"
              title="Reset all events and registrations back to clean default demo data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            <button
              onClick={() => onAddEvent()}
              className="px-5 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#0073E6] hover:bg-[#0060c0] text-white flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Host Opportunity</span>
            </button>
          </div>
        </div>

        {/* Metric Cards (Unstop Analytics Style) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Opportunities</span>
              <Calendar className="w-4 h-4 text-[#0073E6]" />
            </div>
            <div className="text-2xl font-bold text-[#1C4980]">{events.length}</div>
            <p className="text-xs text-gray-500 mt-1">{upcomingEventsCount} open now</p>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Applications</span>
              <Users className="w-4 h-4 text-[#0073E6]" />
            </div>
            <div className="text-2xl font-bold text-[#0073E6]">{registrations.length}</div>
            <p className="text-xs text-gray-500 mt-1">Confirmed student passes</p>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Attendance Verified</span>
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{attendedCount}</div>
            <p className="text-xs text-gray-500 mt-1">Checked in at venue</p>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Download Report</span>
              <Download className="w-4 h-4 text-gray-500" />
            </div>
            <button
              onClick={() => exportRegistrationsToCSV(filteredRegistrations)}
              className="mt-2 w-full py-1.5 px-3 rounded-full text-xs font-bold bg-[#EBF3FC] hover:bg-blue-100 text-[#1C4980] border border-blue-200 flex items-center justify-center gap-1.5 transition-colors"
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
                ? 'border-[#0073E6] text-[#0073E6]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Manage Opportunities</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
              {events.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('registrations')}
            className={`pb-3 px-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'registrations'
                ? 'border-[#0073E6] text-[#0073E6]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Candidate Applications</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-[#EBF3FC] text-[#0073E6] font-bold">
              {registrations.length}
            </span>
          </button>
        </div>

        {/* TAB 1: MANAGE OPPORTUNITIES */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  placeholder="Search opportunities by title..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0073E6]"
                />
              </div>

              <button
                onClick={() => onAddEvent()}
                className="w-full sm:w-auto px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#0073E6] hover:bg-[#0060c0] text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Host Opportunity</span>
              </button>
            </div>

            {/* Opportunities Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-gray-50 text-gray-700 border-b border-gray-200 font-bold text-xs uppercase tracking-wide">
                  <tr>
                    <th className="py-3 px-4">Opportunity</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Schedule</th>
                    <th className="py-3 px-4">Applications</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500">
                        No opportunities found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((evt) => {
                      const eventRegs = registrations.filter((r) => r.eventId === evt.id);
                      return (
                        <tr key={evt.id} className="hover:bg-gray-50 transition-colors">
                          
                          <td className="py-3.5 px-4 max-w-xs">
                            <span className="font-bold text-[#1C4980] block leading-snug">{evt.title}</span>
                            <span className="text-xs text-gray-500 truncate block mt-0.5">{evt.venue}</span>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EBF3FC] text-[#0073E6]">
                              {evt.category}
                            </span>
                            <span className="block text-xs text-gray-500 mt-1">
                              {evt.mode || 'In Campus'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="text-gray-900 block font-medium">{evt.date}</span>
                            <span className="text-xs text-gray-500">{evt.time}</span>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-bold text-[#0073E6]">{eventRegs.length}</span>
                            <span className="text-gray-500"> / {evt.capacity || 100}</span>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              evt.status === 'Completed'
                                ? 'bg-gray-100 text-gray-600'
                                : 'bg-[#DEF7EC] text-[#03543F] border border-green-200'
                            }`}>
                              {evt.status || 'Live'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => onEditEvent(evt)}
                                className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                title="Edit this opportunity"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmation({ type: 'event', id: evt.id, name: evt.title })}
                                className="p-1.5 rounded-lg bg-gray-100 text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete this opportunity"
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

        {/* TAB 2: CANDIDATE APPLICATIONS */}
        {activeTab === 'registrations' && (
          <div className="space-y-4">
            
            <div className="p-3.5 bg-white border border-gray-200 rounded-2xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-xs">
              
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  placeholder="Search applicants by name, email, phone, or application code..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0073E6]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Filter className="w-3.5 h-3.5 text-[#0073E6]" />
                  <span>Opportunity:</span>
                </div>
                <select
                  value={regEventFilter}
                  onChange={(e) => setRegEventFilter(e.target.value)}
                  className="py-1.5 px-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0073E6] max-w-[200px] truncate"
                >
                  <option value="All">All Opportunities ({registrations.length})</option>
                  {events.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.title}
                    </option>
                  ))}
                </select>

                <select
                  value={regStatusFilter}
                  onChange={(e) => setRegStatusFilter(e.target.value)}
                  className="py-1.5 px-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0073E6]"
                >
                  <option value="All">All Status</option>
                  <option value="Attended">Present</option>
                  <option value="Pending">Pending Check-in</option>
                </select>

                <button
                  onClick={() => exportRegistrationsToCSV(filteredRegistrations)}
                  className="py-1.5 px-4 rounded-full text-xs font-bold bg-[#0073E6] hover:bg-[#0060c0] text-white flex items-center gap-1.5 transition-colors shadow-xs"
                  title="Export filtered registrations to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

            </div>

            <div className="text-xs text-gray-500 px-1">
              Found <strong className="text-[#1C4980]">{filteredRegistrations.length}</strong> candidate applications
            </div>

            {/* Registrations Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-gray-50 text-gray-700 border-b border-gray-200 font-bold text-xs uppercase tracking-wide">
                  <tr>
                    <th className="py-3 px-4">Application ID & Candidate</th>
                    <th className="py-3 px-4">College / Batch</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Applied For</th>
                    <th className="py-3 px-4">Check-in</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500">
                        No candidate applications found matching the specified filters.
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((reg) => {
                      const matchedEvent = events.find((e) => e.id === reg.eventId) || {
                        title: reg.eventTitle || 'Campus Opportunity',
                        date: 'Upcoming',
                        time: '',
                        venue: 'ABESEC'
                      };

                      return (
                        <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                          
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3FC] text-[#0073E6]">
                              {reg.ticketCode}
                            </span>
                            <span className="font-bold text-gray-900 block mt-1">{reg.fullName}</span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="text-gray-900 block font-medium">{reg.collegeYear}</span>
                            <span className="text-xs text-gray-500 block truncate max-w-[190px]">
                              {reg.department || 'Computer Science'}
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
                              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors ${
                                reg.attended
                                  ? 'bg-[#DEF7EC] text-[#03543F]'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                              title="Toggle check-in status"
                            >
                              {reg.attended ? (
                                <>
                                  <Check className="w-3 h-3 text-[#03543F]" />
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
                                className="p-1.5 rounded-lg bg-gray-100 text-[#0073E6] hover:bg-blue-50 transition-colors"
                                title="View candidate e-pass"
                              >
                                <Ticket className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmation({ type: 'registration', id: reg.id, name: `${reg.fullName} (${reg.ticketCode})` })}
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
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-gray-900">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-600">
                Are you sure you want to delete <strong>"{deleteConfirmation.name}"</strong>?
              </p>
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white"
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
