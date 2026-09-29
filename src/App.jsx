import React, { useState, useEffect, useMemo } from 'react';
import { 
  getEvents, 
  getRegistrations, 
  addEvent, 
  updateEvent, 
  deleteEvent, 
  registerStudentForEvent, 
  deleteRegistration, 
  toggleRegistrationAttendance, 
  resetToDemoData, 
  subscribeToStorageChanges 
} from './services/storageService';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedEvent } from './components/FeaturedEvent';
import { EventCard } from './components/EventCard';
import { SearchAndFilter } from './components/SearchAndFilter';
import { EventRegistrationModal } from './components/EventRegistrationModal';
import { EventDetailsModal } from './components/EventDetailsModal';
import { TicketModal } from './components/TicketModal';
import { ClubIntroduction } from './components/ClubIntroduction';
import { AdminDashboard } from './components/AdminDashboard';
import { EventFormModal } from './components/EventFormModal';
import { Footer } from './components/Footer';

import { 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Flame,
  Search
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'events' | 'about' | 'admin'
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  // Modals state
  const [registerEvent, setRegisterEvent] = useState(null);
  const [detailsEvent, setDetailsEvent] = useState(null);
  const [ticketModalState, setTicketModalState] = useState(null); // { registration, event }
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  // Search & Filter state for Events Page
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Load initial data and subscribe to storage changes
  useEffect(() => {
    const refreshData = () => {
      setEvents(getEvents());
      setRegistrations(getRegistrations());
    };

    refreshData();
    const unsubscribe = subscribeToStorageChanges(refreshData);
    return () => unsubscribe();
  }, []);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Find the featured event (or first upcoming event if none marked featured)
  const featuredEvent = useMemo(() => {
    const explicitFeatured = events.find((e) => e.featured);
    if (explicitFeatured) return explicitFeatured;
    return events.find((e) => e.status !== 'Completed') || events[0];
  }, [events]);

  // Registrations counter by event ID
  const registrationsByEventId = useMemo(() => {
    const map = {};
    registrations.forEach((r) => {
      map[r.eventId] = (map[r.eventId] || 0) + 1;
    });
    return map;
  }, [registrations]);

  // Upcoming events for Home preview
  const upcomingEvents = useMemo(() => {
    return events
      .filter((e) => e.status !== 'Completed')
      .slice(0, 3);
  }, [events]);

  // Filtered events for Events Page
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch = 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.description && e.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.venue && e.venue.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.tags && e.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
      
      const isPast = e.status === 'Completed' || new Date(e.dateTimeIso || e.date) < new Date();
      const matchesStatus = 
        selectedStatus === 'All' ||
        (selectedStatus === 'Upcoming' && !isPast) ||
        (selectedStatus === 'Completed' && isPast);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [events, searchTerm, selectedCategory, selectedStatus]);

  // Handlers for Registration
  const handleRegisterSubmit = (payload) => {
    const newReg = registerStudentForEvent(payload);
    showToast(`Successfully registered for ${payload.eventTitle}!`);
    return newReg;
  };

  // Handlers for Admin Events
  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setIsEventFormOpen(true);
  };

  const handleOpenEditEvent = (evt) => {
    setEditingEvent(evt);
    setIsEventFormOpen(true);
  };

  const handleSaveEvent = (payload) => {
    if (editingEvent && editingEvent.id) {
      updateEvent(editingEvent.id, payload);
      showToast('Event updated successfully!');
    } else {
      addEvent(payload);
      showToast('New event created and published!');
    }
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
    showToast('Event deleted successfully.');
  };

  const handleDeleteRegistration = (id) => {
    deleteRegistration(id);
    showToast('Registration cancelled.');
  };

  const handleToggleAttendance = (id) => {
    const updated = toggleRegistrationAttendance(id);
    showToast(updated.attended ? 'Student marked present!' : 'Attendance removed.');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all events and registrations to default demo data?')) {
      resetToDemoData();
      showToast('Reset to default demo data.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 border border-indigo-500/40 text-white shadow-2xl text-xs sm:text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        eventCount={events.length}
        registrationCount={registrations.length}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div className="space-y-12 sm:space-y-16">
            
            {/* Hero Section */}
            <Hero 
              onExploreEvents={() => setCurrentView('events')}
              onScrollToFeatured={() => {
                const el = document.getElementById('featured-event-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              stats={{
                totalEvents: events.length,
                totalRegistrations: registrations.length + 840
              }}
            />

            {/* Featured Event Spotlight */}
            {featuredEvent && (
              <FeaturedEvent 
                event={featuredEvent}
                registrationCount={registrationsByEventId[featuredEvent.id] || 0}
                onRegister={(evt) => setRegisterEvent(evt)}
                onViewDetails={(evt) => setDetailsEvent(evt)}
              />
            )}

            {/* Upcoming Events Grid Preview */}
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Campus Calendar</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Upcoming Club Events
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentView('events')}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>View All {events.length} Events</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((evt) => (
                  <EventCard 
                    key={evt.id}
                    event={evt}
                    registrationCount={registrationsByEventId[evt.id] || 0}
                    onRegister={(event) => setRegisterEvent(event)}
                    onViewDetails={(event) => setDetailsEvent(event)}
                  />
                ))}
              </div>
            </section>

            {/* Club Introduction & Pillars */}
            <ClubIntroduction 
              onExploreEvents={() => setCurrentView('events')}
            />

          </div>
        )}

        {/* VIEW 2: EVENTS PAGE */}
        {currentView === 'events' && (
          <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header banner */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>CodeChef ABESEC Schedule</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                All Campus Events & Hackathons
              </h1>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
                Browse upcoming contests, workshops, bootcamps, and technical talks organized for ABESEC students. Instant registration with verified digital passes.
              </p>
            </div>

            {/* Search & Filter Component */}
            <SearchAndFilter 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              totalResults={filteredEvents.length}
            />

            {/* Event Cards Grid */}
            {filteredEvents.length === 0 ? (
              <div className="py-20 text-center rounded-3xl bg-slate-900/50 border border-slate-800 p-8">
                <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">No events found</h3>
                <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                  We couldn't find any events matching your selected criteria. Try adjusting your search keywords or category filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedStatus('All');
                  }}
                  className="mt-5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((evt) => (
                  <EventCard 
                    key={evt.id}
                    event={evt}
                    registrationCount={registrationsByEventId[evt.id] || 0}
                    onRegister={(event) => setRegisterEvent(event)}
                    onViewDetails={(event) => setDetailsEvent(event)}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* VIEW 3: ABOUT CLUB PAGE */}
        {currentView === 'about' && (
          <div className="pt-6">
            <ClubIntroduction 
              onExploreEvents={() => setCurrentView('events')}
            />
          </div>
        )}

        {/* VIEW 4: ADMIN DASHBOARD */}
        {currentView === 'admin' && (
          <AdminDashboard 
            events={events}
            registrations={registrations}
            onAddEvent={handleOpenAddEvent}
            onEditEvent={handleOpenEditEvent}
            onDeleteEvent={handleDeleteEvent}
            onDeleteRegistration={handleDeleteRegistration}
            onToggleAttendance={handleToggleAttendance}
            onResetDemoData={handleResetData}
            onBackToStudentView={() => setCurrentView('home')}
            onViewTicket={(reg, evt) => setTicketModalState({ registration: reg, event: evt })}
          />
        )}

      </main>

      {/* FOOTER */}
      <Footer 
        onNavigate={(view) => setCurrentView(view)}
        onOpenAdmin={() => setCurrentView('admin')}
      />

      {/* EVENT REGISTRATION MODAL */}
      <EventRegistrationModal 
        isOpen={Boolean(registerEvent)}
        onClose={() => setRegisterEvent(null)}
        event={registerEvent}
        onRegisterSubmit={handleRegisterSubmit}
        onShowTicket={(reg, evt) => setTicketModalState({ registration: reg, event: evt })}
      />

      {/* EVENT FULL DETAILS MODAL */}
      <EventDetailsModal 
        isOpen={Boolean(detailsEvent)}
        onClose={() => setDetailsEvent(null)}
        event={detailsEvent}
        registrationCount={detailsEvent ? (registrationsByEventId[detailsEvent.id] || 0) : 0}
        onRegister={(evt) => setRegisterEvent(evt)}
      />

      {/* DIGITAL TICKET / PASS MODAL */}
      {ticketModalState && (
        <TicketModal 
          isOpen={Boolean(ticketModalState)}
          onClose={() => setTicketModalState(null)}
          registration={ticketModalState.registration}
          event={ticketModalState.event}
        />
      )}

      {/* ADMIN ADD / EDIT EVENT MODAL */}
      <EventFormModal 
        isOpen={isEventFormOpen}
        onClose={() => {
          setIsEventFormOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        initialData={editingEvent}
      />

    </div>
  );
}
