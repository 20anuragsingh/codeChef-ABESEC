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
  ArrowRight, 
  CheckCircle2, 
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
    showToast(`Registered for ${payload.eventTitle}!`);
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
      showToast('Event updated successfully.');
    } else {
      addEvent(payload);
      showToast('New event created.');
    }
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
    showToast('Event removed.');
  };

  const handleDeleteRegistration = (id) => {
    deleteRegistration(id);
    showToast('Registration deleted.');
  };

  const handleToggleAttendance = (id) => {
    const updated = toggleRegistrationAttendance(id);
    showToast(updated.attended ? 'Marked present.' : 'Attendance unmarked.');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all events and registrations to default demo data?')) {
      resetToDemoData();
      showToast('Reset to demo data.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 shadow-md text-xs sm:text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
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

      {/* Main Content */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div>
            
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

            {/* Upcoming Events Preview */}
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Upcoming Events
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentView('events')}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>View All ({events.length})</span>
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

            {/* Club Introduction */}
            <ClubIntroduction 
              onExploreEvents={() => setCurrentView('events')}
            />

          </div>
        )}

        {/* VIEW 2: EVENTS PAGE */}
        {currentView === 'events' && (
          <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                All Campus Events
              </h1>
              <p className="text-sm text-gray-600 mt-1 max-w-xl">
                Browse and register for hackathons, workshops, and coding contests organized by CodeChef ABESEC.
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
              <div className="py-16 text-center bg-white border border-gray-200 rounded-xl p-6">
                <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <h3 className="text-base font-semibold text-gray-900">No events found</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Try adjusting your search query or selected category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedStatus('All');
                  }}
                  className="mt-4 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
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
          <div>
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

      {/* DIGITAL TICKET PASS MODAL */}
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
