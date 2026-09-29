import React from 'react';
import { Code2, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Footer = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-gray-200">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#1C4980] flex items-center justify-center text-white">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-[#1C4980]">CodeChef ABESEC</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#EBF3FC] text-[#0073E6] px-2 py-0.2 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            </div>
            
            <p className="text-gray-500 leading-relaxed text-xs max-w-sm">
              Student chapter at ABES Engineering College for competitive programming, workshops, hackathons, and technology bootcamps.
            </p>

            <div className="text-xs text-gray-500">
              📍 19th KM Stone, NH-09, Ghaziabad, UP 201009
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#1C4980] uppercase text-xs tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#0073E6] transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-[#0073E6] transition-colors">
                  All Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#0073E6] transition-colors">
                  About the Chapter
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-[#0073E6] hover:text-[#005bb5] font-semibold transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Host / Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-[#1C4980] uppercase text-xs tracking-wider mb-3">
              Opportunities
            </h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>Hackathons & Ideathons</li>
              <li>Coding Challenges & CP</li>
              <li>Hands-on Bootcamps</li>
              <li>Guest Speaker Sessions</li>
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="font-bold text-[#1C4980] uppercase text-xs tracking-wider mb-3">
              Connect
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              Join 1,200+ college coders on official chapter channels:
            </p>
            <div className="flex items-center gap-2">
              <a 
                href="https://github.com/20anuragsingh/codeChef-ABESEC" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-colors"
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
                className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-colors"
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
                className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-colors"
                aria-label="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} CodeChef ABESEC Chapter. Modeled after Unstop's opportunity experience.
          </div>
          <div>
            ABES Engineering College, Ghaziabad
          </div>
        </div>

      </div>
    </footer>
  );
};
