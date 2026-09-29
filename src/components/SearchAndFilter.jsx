import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { EVENT_CATEGORIES } from '../data/mockEvents';

export const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedMode,
  setSelectedMode,
  totalResults
}) => {
  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'All Events' || selectedStatus !== 'All' || selectedMode !== 'All';

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Events');
    setSelectedStatus('All');
    if (setSelectedMode) setSelectedMode('All');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-2xs mb-6 space-y-3.5">
      
      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <Search className="w-4 h-4 text-blue-600" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by event title, topic, or venue (e.g. HackABES, Lab 3, DSA)..."
          className="w-full pl-10 pr-9 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {EVENT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary Mode & Status Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 mr-1">
            Mode:
          </span>

          {['All', 'Offline (Campus)', 'Hybrid', 'Online'].map((mode) => {
            const isSelected = (selectedMode || 'All') === mode;
            return (
              <button
                key={mode}
                onClick={() => setSelectedMode && setSelectedMode(mode)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {mode === 'Offline (Campus)' ? 'In Campus' : mode}
              </button>
            );
          })}
        </div>

        {/* Status Toggle & Reset */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
            <button
              onClick={() => setSelectedStatus('All')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                selectedStatus === 'All' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setSelectedStatus('Upcoming')}
              className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                selectedStatus === 'Upcoming' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setSelectedStatus('Completed')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                selectedStatus === 'Completed' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold ml-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Results summary */}
      <div className="text-xs text-gray-500 pt-2 border-t border-gray-100 flex items-center justify-between">
        <span>
          Showing <strong>{totalResults}</strong> {totalResults === 1 ? 'event' : 'events'}
          {selectedCategory !== 'All Events' && <span> in <strong>{selectedCategory}</strong></span>}
          {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
        </span>
      </div>

    </div>
  );
};
