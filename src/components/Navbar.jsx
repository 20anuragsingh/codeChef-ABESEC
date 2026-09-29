import React, { useState } from 'react';
import { 
  Code2, 
  Calendar, 
  Users, 
  Lock, 
  Menu, 
  X,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView, eventCount, registrationCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-2xs">
      
      {/* College Notice Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>ABES Engineering College, Ghaziabad • CodeChef Student Chapter (2025-26)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-900 text-base">
                  CodeChef
                </span>
                <span className="px-1.5 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded">
                  ABESEC Chapter
                </span>
              </div>
              <p className="text-[11px] text-gray-500">Department of Computer Science & Engineering</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-700">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentView === 'home'
                  ? 'bg-gray-100 text-gray-900 font-semibold'
                  : 'hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView('events')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'events'
                  ? 'bg-gray-100 text-gray-900 font-semibold'
                  : 'hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Events</span>
              {eventCount > 0 && (
                <span className="px-1.5 py-0.2 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {eventCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('about')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentView === 'about'
                  ? 'bg-gray-100 text-gray-900 font-semibold'
                  : 'hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              About & Team
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setCurrentView('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                currentView === 'admin'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-gray-500" />
              <span>Coordinator Login</span>
              {registrationCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded bg-gray-200 text-gray-800 font-mono">
                  {registrationCount}
                </span>
              )}
            </button>

            {currentView !== 'events' && (
              <button
                onClick={() => setCurrentView('events')}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Register for Events
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 ${
                currentView === 'admin' 
                  ? 'bg-gray-900 text-white border-gray-900' 
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1">
          <button
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentView === 'home' ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => { setCurrentView('events'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
              currentView === 'events' ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>Events & Contests</span>
            <span className="text-xs bg-blue-100 px-2 py-0.5 rounded-full text-blue-800 font-semibold">
              {eventCount}
            </span>
          </button>
          <button
            onClick={() => { setCurrentView('about'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentView === 'about' ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            About & Core Team
          </button>
          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border ${
                currentView === 'admin'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Event Coordinator Dashboard ({registrationCount} Registrations)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
