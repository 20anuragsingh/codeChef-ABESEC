import React from 'react';
import { Search, X, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { EVENT_CATEGORIES } from '../data/mockEvents';

export const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  totalResults
}) => {
  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'All' || selectedStatus !== 'All';

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedStatus('All');
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-8 space-y-4">
      
      {/* Top Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search events by name, keywords, venue, or topics..."
          className="w-full pl-11 pr-10 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
            title="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Row: Categories + Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <div className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Category:</span>
          </div>

          {EVENT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-600/30 font-semibold'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Status Toggle & Clear Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          
          {/* Status selector */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedStatus('All')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedStatus === 'All' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setSelectedStatus('Upcoming')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedStatus === 'Upcoming' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setSelectedStatus('Completed')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedStatus === 'Completed' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Past
            </button>
          </div>

          {/* Clear Filters button */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors ml-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

        </div>

      </div>

      {/* Results summary bar */}
      <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/60 font-mono">
        <span>
          Showing <strong className="text-indigo-400">{totalResults}</strong> {totalResults === 1 ? 'event' : 'events'}
          {selectedCategory !== 'All' && <span> in <strong className="text-white">{selectedCategory}</strong></span>}
          {searchTerm && <span> matching "<strong className="text-amber-300">{searchTerm}</strong>"</span>}
        </span>
      </div>

    </div>
  );
};
