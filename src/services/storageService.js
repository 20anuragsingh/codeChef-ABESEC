import { INITIAL_EVENTS, INITIAL_REGISTRATIONS } from '../data/mockEvents';

const EVENTS_KEY = 'codechef_abesec_events_v2';
const REGISTRATIONS_KEY = 'codechef_abesec_registrations_v2';

// Initialize storage if not already present
export const initializeStorage = () => {
  if (!localStorage.getItem(EVENTS_KEY)) {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(INITIAL_EVENTS));
  }
  if (!localStorage.getItem(REGISTRATIONS_KEY)) {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(INITIAL_REGISTRATIONS));
  }
};

// Events CRUD
export const getEvents = () => {
  initializeStorage();
  try {
    const data = localStorage.getItem(EVENTS_KEY);
    return data ? JSON.parse(data) : INITIAL_EVENTS;
  } catch (e) {
    console.error('Failed to parse events from localStorage', e);
    return INITIAL_EVENTS;
  }
};

export const getEventById = (id) => {
  const events = getEvents();
  return events.find((e) => e.id === id);
};

export const saveEvents = (events) => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  notifyStorageChange();
};

export const addEvent = (eventData) => {
  const events = getEvents();
  const newEvent = {
    ...eventData,
    id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    status: eventData.status || 'Upcoming',
    createdAt: new Date().toISOString()
  };

  let updatedEvents = [...events];
  if (newEvent.featured) {
    updatedEvents = updatedEvents.map((e) => ({ ...e, featured: false }));
  }
  updatedEvents.unshift(newEvent);
  saveEvents(updatedEvents);
  return newEvent;
};

export const updateEvent = (id, updatedData) => {
  const events = getEvents();
  let updatedEvents = events.map((e) => {
    if (e.id === id) {
      return { ...e, ...updatedData };
    }
    if (updatedData.featured && e.id !== id) {
      return { ...e, featured: false };
    }
    return e;
  });
  saveEvents(updatedEvents);
  return updatedEvents.find((e) => e.id === id);
};

export const deleteEvent = (id) => {
  const events = getEvents();
  const filteredEvents = events.filter((e) => e.id !== id);
  saveEvents(filteredEvents);

  const registrations = getRegistrations();
  const filteredRegistrations = registrations.filter((r) => r.eventId !== id);
  saveRegistrations(filteredRegistrations);
  return true;
};

// Registrations CRUD
export const getRegistrations = () => {
  initializeStorage();
  try {
    const data = localStorage.getItem(REGISTRATIONS_KEY);
    return data ? JSON.parse(data) : INITIAL_REGISTRATIONS;
  } catch (e) {
    console.error('Failed to parse registrations from localStorage', e);
    return INITIAL_REGISTRATIONS;
  }
};

export const saveRegistrations = (registrations) => {
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
  notifyStorageChange();
};

export const registerStudentForEvent = (registrationData) => {
  const registrations = getRegistrations();
  
  // Check if student already registered for this event with same email or roll number
  const existing = registrations.find(
    (r) => r.eventId === registrationData.eventId && 
    (r.email.toLowerCase() === registrationData.email.toLowerCase() || 
     (registrationData.rollNumber && r.rollNumber === registrationData.rollNumber))
  );

  if (existing) {
    throw new Error('You have already registered for this event with this email or roll number.');
  }

  const randomTicketSuffix = Math.floor(1000 + Math.random() * 9000);
  const newRegistration = {
    ...registrationData,
    id: `REG-2026-${randomTicketSuffix}`,
    ticketCode: `ABES-${randomTicketSuffix}`,
    registeredAt: new Date().toISOString(),
    status: 'Confirmed',
    attended: false
  };

  const updated = [newRegistration, ...registrations];
  saveRegistrations(updated);
  return newRegistration;
};

export const deleteRegistration = (id) => {
  const registrations = getRegistrations();
  const updated = registrations.filter((r) => r.id !== id);
  saveRegistrations(updated);
  return true;
};

export const toggleRegistrationAttendance = (id) => {
  const registrations = getRegistrations();
  const updated = registrations.map((r) =>
    r.id === id ? { ...r, attended: !r.attended } : r
  );
  saveRegistrations(updated);
  return updated.find((r) => r.id === id);
};

// Reset to default seed data
export const resetToDemoData = () => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(INITIAL_EVENTS));
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(INITIAL_REGISTRATIONS));
  notifyStorageChange();
};

// Export to CSV
export const exportRegistrationsToCSV = (filteredRegistrations) => {
  const data = filteredRegistrations || getRegistrations();
  if (data.length === 0) {
    alert('No student registrations found to export.');
    return;
  }

  const headers = [
    'Registration ID',
    'Pass Code',
    'Event Name',
    'Student Name',
    'University Roll No',
    'College Email',
    'Year of Study',
    'Department',
    'WhatsApp Number',
    'Registration Date',
    'Attendance'
  ];

  const rows = data.map((r) => [
    `"${r.id}"`,
    `"${r.ticketCode || ''}"`,
    `"${(r.eventTitle || '').replace(/"/g, '""')}"`,
    `"${(r.fullName || '').replace(/"/g, '""')}"`,
    `"${r.rollNumber || ''}"`,
    `"${r.email || ''}"`,
    `"${r.collegeYear || ''}"`,
    `"${r.department || ''}"`,
    `"${r.phone || ''}"`,
    `"${new Date(r.registeredAt).toLocaleString()}"`,
    `"${r.attended ? 'Present' : 'Absent'}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `CodeChef_ABESEC_Student_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Event listener mechanism for cross-component sync
const storageListeners = new Set();

export const subscribeToStorageChanges = (callback) => {
  storageListeners.add(callback);
  return () => storageListeners.delete(callback);
};

const notifyStorageChange = () => {
  storageListeners.forEach((callback) => {
    try {
      callback();
    } catch (err) {
      console.error(err);
    }
  });
};
