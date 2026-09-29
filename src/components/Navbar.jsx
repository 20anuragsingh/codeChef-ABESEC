import React, { useState } from 'react';
import { 
  Code2, 
  Calendar, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles,
  ExternalLink,
  Laptop
} from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView, eventCount, registrationCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-amber-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 group-hover:text-amber-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  CodeChef
                </span>
                <span className="px-1.5 py-0.5 text-[11px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ABESEC
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-wider">CAMPUS CHAPTER</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentView === 'home'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView('events')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                currentView === 'events'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
              {eventCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-semibold bg-indigo-900/80 text-indigo-200 rounded-full border border-indigo-700/50">
                  {eventCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('about')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentView === 'about'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              About Club
            </button>
          </nav>

          {/* Actions & Admin Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setCurrentView('admin')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                currentView === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 border-slate-700/70 hover:border-amber-500/50 hover:text-amber-400'
              }`}
              title="Open Admin Dashboard to manage events and student registrations"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Admin Portal</span>
              {registrationCount > 0 && (
                <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-md ${
                  currentView === 'admin' ? 'bg-slate-950 text-amber-300' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {registrationCount}
                </span>
              )}
            </button>

            {currentView !== 'events' && (
              <button
                onClick={() => setCurrentView('events')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-md shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore Events</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setCurrentView('admin')}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${
                currentView === 'admin' 
                  ? 'bg-amber-500 text-slate-950 border-amber-400' 
                  : 'bg-slate-900 text-amber-400 border-amber-500/30'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'home' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => { setCurrentView('events'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
              currentView === 'events' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </span>
            <span className="text-xs bg-indigo-900/80 px-2 py-0.5 rounded-full text-indigo-200">
              {eventCount} available
            </span>
          </button>
          <button
            onClick={() => { setCurrentView('about'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'about' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            About Club
          </button>
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <button
              onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border ${
                currentView === 'admin'
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-900 text-amber-300 border-amber-500/40'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Dashboard ({registrationCount} Registrations)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
