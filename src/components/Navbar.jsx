import React, { useState } from 'react';
import { 
  Code2, 
  Calendar, 
  ShieldCheck, 
  Menu, 
  X, 
  Search, 
  CheckCircle, 
  Sparkles,
  Trophy,
  ExternalLink
} from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView, eventCount, registrationCount, onSearchClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      
      {/* Top Notice Bar */}
      <div className="bg-[#1C4980] text-white text-[11px] sm:text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-blue-500/30 text-blue-100 px-2 py-0.2 rounded-full text-[10px]">
          <CheckCircle className="w-3 h-3 text-cyan-300" />
          Verified Chapter
        </span>
        <span>Official Student Chapter • ABES Engineering College, Ghaziabad</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Unstop-style Brand Logo */}
          <div 
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1C4980] flex items-center justify-center text-white shadow-xs">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#1C4980]">
                  CodeChef
                </span>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-[#EBF3FC] text-[#0073E6] border border-[#BFDBFE]">
                  ABESEC
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">Opportunities & Events Portal</p>
            </div>
          </div>

          {/* Quick Search Shortcut Bar (Unstop Search Experience) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <button
              onClick={() => {
                setCurrentView('events');
                if (onSearchClick) onSearchClick();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <span>Search opportunities, hackathons, workshops...</span>
              </div>
              <span className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-400 font-mono">
                /
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3.5 py-2 rounded-full transition-colors ${
                currentView === 'home'
                  ? 'bg-[#EBF3FC] text-[#1C4980] font-bold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView('events')}
              className={`px-3.5 py-2 rounded-full transition-colors flex items-center gap-1.5 ${
                currentView === 'events'
                  ? 'bg-[#EBF3FC] text-[#1C4980] font-bold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Trophy className="w-4 h-4 text-[#0073E6]" />
              <span>Opportunities</span>
              {eventCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#1C4980] text-white">
                  {eventCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('about')}
              className={`px-3.5 py-2 rounded-full transition-colors ${
                currentView === 'about'
                  ? 'bg-[#EBF3FC] text-[#1C4980] font-bold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              About Club
            </button>
          </nav>

          {/* Right Action / Host Button (Unstop style) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setCurrentView('admin')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all ${
                currentView === 'admin'
                  ? 'bg-[#1C4980] text-white border-[#1C4980] shadow-sm'
                  : 'bg-white text-[#1C4980] border-[#1C4980]/30 hover:border-[#1C4980] hover:bg-blue-50/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#0073E6]" />
              <span>Host / Admin Portal</span>
              {registrationCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-[#EBF3FC] text-[#1C4980] font-bold">
                  {registrationCount}
                </span>
              )}
            </button>

            {currentView !== 'events' && (
              <button
                onClick={() => setCurrentView('events')}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#0073E6] hover:bg-[#0060c0] text-white shadow-xs transition-colors"
              >
                Browse All
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 ${
                currentView === 'admin' 
                  ? 'bg-[#1C4980] text-white border-[#1C4980]' 
                  : 'bg-white text-[#1C4980] border-gray-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0073E6]" />
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
              currentView === 'home' ? 'bg-[#EBF3FC] text-[#1C4980] font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => { setCurrentView('events'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
              currentView === 'events' ? 'bg-[#EBF3FC] text-[#1C4980] font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#0073E6]" />
              Opportunities
            </span>
            <span className="text-xs bg-[#EBF3FC] px-2 py-0.5 rounded-full text-[#1C4980] font-bold">
              {eventCount}
            </span>
          </button>
          <button
            onClick={() => { setCurrentView('about'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentView === 'about' ? 'bg-[#EBF3FC] text-[#1C4980] font-bold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            About Club
          </button>
          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold border ${
                currentView === 'admin'
                  ? 'bg-[#1C4980] text-white border-[#1C4980]'
                  : 'bg-white text-[#1C4980] border-gray-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#0073E6]" />
              <span>Host Dashboard ({registrationCount} Applications)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
