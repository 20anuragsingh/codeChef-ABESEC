import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Flame, 
  SlidersHorizontal 
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

  // Search & Filter state for Opportunities Page
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Opportunities');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');

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

  // Filtered events for Opportunities Page
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch = 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.description && e.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.venue && e.venue.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.eligibility && e.eligibility.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.tags && e.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesCategory = selectedCategory === 'All Opportunities' || e.category === selectedCategory;
      
      const isPast = e.status === 'Completed' || new Date(e.dateTimeIso || e.date) < new Date();
      const matchesStatus = 
        selectedStatus === 'All' ||
        (selectedStatus === 'Upcoming' && !isPast) ||
        (selectedStatus === 'Completed' && isPast);

      const matchesMode = selectedMode === 'All' || e.mode === selectedMode;

      return matchesSearch && matchesCategory && matchesStatus && matchesMode;
    });
  }, [events, searchTerm, selectedCategory, selectedStatus, selectedMode]);

  // Handlers for Registration
  const handleRegisterSubmit = (payload) => {
    const newReg = registerStudentForEvent(payload);
    showToast(`Application submitted for ${payload.eventTitle}!`);
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
      showToast('Opportunity updated successfully.');
    } else {
      addEvent(payload);
      showToast('New opportunity published on Unstop!');
    }
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
    showToast('Opportunity removed.');
  };

  const handleDeleteRegistration = (id) => {
    deleteRegistration(id);
    showToast('Application cancelled.');
  };

  const handleToggleAttendance = (id) => {
    const updated = toggleRegistrationAttendance(id);
    showToast(updated.attended ? 'Candidate marked present.' : 'Attendance removed.');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all opportunities and applications to default demo data?')) {
      resetToDemoData();
      showToast('Reset to demo data.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] text-gray-900 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1C4980] text-white shadow-lg text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0" />
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
        onSearchClick={() => {
          const el = document.getElementById('search-input');
          if (el) el.focus();
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div>
            
            {/* Unstop Organizer Profile Header */}
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

            {/* Featured Opportunity Spotlight */}
            {featuredEvent && (
              <FeaturedEvent 
                event={featuredEvent}
                registrationCount={registrationsByEventId[featuredEvent.id] || 0}
                onRegister={(evt) => setRegisterEvent(evt)}
                onViewDetails={(evt) => setDetailsEvent(evt)}
              />
            )}

            {/* Live & Upcoming Opportunities Grid Preview */}
            <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-[#0073E6] text-xs font-bold uppercase tracking-wider mb-0.5">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Live & Upcoming</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1C4980]">
                    Campus Opportunities
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentView('events')}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0073E6] hover:text-[#005bb5] transition-colors"
                >
                  <span>Explore All {events.length} Opportunities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

            {/* Club Introduction & FAQs */}
            <ClubIntroduction 
              onExploreEvents={() => setCurrentView('events')}
            />

          </div>
        )}

        {/* VIEW 2: ALL OPPORTUNITIES PAGE */}
        {currentView === 'events' && (
          <div className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-[#0073E6] text-xs font-bold uppercase tracking-wider mb-1">
                <span>CodeChef ABESEC Opportunity Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1C4980]">
                All Opportunities & Contests
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
                Browse hackathons, coding challenges, workshops, and speaker sessions. Apply online, compete, and receive verified certificates.
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
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              totalResults={filteredEvents.length}
            />

            {/* Opportunity Cards Grid */}
            {filteredEvents.length === 0 ? (
              <div className="py-16 text-center bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
                <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-[#1C4980]">No opportunities found</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Try adjusting your search query, mode, or category filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All Opportunities');
                    setSelectedStatus('All');
                    setSelectedMode('All');
                  }}
                  className="mt-4 px-4 py-2 rounded-full text-xs font-bold bg-[#0073E6] text-white hover:bg-[#0060c0] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

        {/* VIEW 4: ADMIN / HOST DASHBOARD */}
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

      {/* DIGITAL TICKET / E-PASS MODAL */}
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
