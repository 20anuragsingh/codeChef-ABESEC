import React, { useState } from 'react';
import { 
  Code2, 
  Calendar, 
  ShieldCheck, 
  Menu, 
  X
} from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView, eventCount, registrationCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-gray-900">
                  CodeChef
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-50 text-blue-700 border border-blue-200">
                  ABESEC
                </span>
              </div>
              <p className="text-xs text-gray-500">College Club</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'home'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView('events')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                currentView === 'events'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
              {eventCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                  {eventCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('about')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'about'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              About Club
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setCurrentView('admin')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors ${
                currentView === 'admin'
                  ? 'bg-gray-900 text-white border-gray-900 font-semibold'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Admin Dashboard</span>
              {registrationCount > 0 && (
                <span className={`px-1.5 py-0.5 text-xs font-semibold rounded ${
                  currentView === 'admin' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'
                }`}>
                  {registrationCount}
                </span>
              )}
            </button>

            {currentView !== 'events' && (
              <button
                onClick={() => setCurrentView('events')}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Browse Events
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 ${
                currentView === 'admin' 
                  ? 'bg-gray-900 text-white border-gray-900' 
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-5 space-y-1">
          <button
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentView === 'home' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => { setCurrentView('events'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
              currentView === 'events' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>Events</span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
              {eventCount}
            </span>
          </button>
          <button
            onClick={() => { setCurrentView('about'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentView === 'about' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            About Club
          </button>
          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border ${
                currentView === 'admin'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Admin Dashboard ({registrationCount} Registrations)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
