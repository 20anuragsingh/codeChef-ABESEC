import React from 'react';
import { Code2, MessageSquare, ShieldCheck } from 'lucide-react';

export const Footer = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-amber-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <span className="font-extrabold text-base text-white">CodeChef ABESEC</span>
            </div>
            
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Official student-run competitive programming and software engineering chapter at ABES Engineering College. Fostering problem solving, open source contributions, and hackathon victories.
            </p>

            <div className="text-xs text-slate-500">
              📍 19th KM Stone, NH-09, Ghaziabad, UP 201009
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-indigo-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-indigo-400 transition-colors">
                  All Campus Events
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-indigo-400 transition-colors">
                  About the Chapter
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Hackathons & Ideathons</li>
              <li>Competitive Programming (CP)</li>
              <li>Web & Blockchain Bootcamps</li>
              <li>AI & Agentic Tech Talks</li>
              <li>Campus Rating Booster Contests</li>
            </ul>
          </div>

          {/* Community & Connect */}
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-3">
              Connect With Us
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Join 1,200+ college peers on Discord & WhatsApp for instant contest reminders.
            </p>
            <div className="flex items-center gap-2">
              <a 
                href="https://github.com/20anuragsingh/codeChef-ABESEC" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="GitHub Repository"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Discord Community"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} CodeChef ABESEC Chapter. Developed for ABES Engineering College.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with passion by the student developer team</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
