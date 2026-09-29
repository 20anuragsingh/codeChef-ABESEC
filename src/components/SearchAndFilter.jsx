import React from 'react';
import { Search, X, SlidersHorizontal, Sparkles, MapPin, Globe } from 'lucide-react';
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
  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'All Opportunities' || selectedStatus !== 'All' || selectedMode !== 'All';

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Opportunities');
    setSelectedStatus('All');
    if (setSelectedMode) setSelectedMode('All');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
      
      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <Search className="w-4 h-4 text-[#0073E6]" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by opportunity name, venue, eligibility, or keywords..."
          className="w-full pl-10 pr-9 py-2.5 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0073E6] focus:border-transparent transition-all"
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

      {/* Category Pills (Unstop style) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {EVENT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#1C4980] text-white border-[#1C4980] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary Quick Filter Pills & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
        
        {/* Mode filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0073E6]" />
            <span>Mode:</span>
          </span>

          {['All', 'In Campus (Offline)', 'Online', 'Hybrid'].map((mode) => {
            const isSelected = (selectedMode || 'All') === mode;
            return (
              <button
                key={mode}
                onClick={() => setSelectedMode && setSelectedMode(mode)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#EBF3FC] text-[#0073E6] font-bold border border-blue-200'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {mode === 'In Campus (Offline)' ? 'In Campus' : mode}
              </button>
            );
          })}
        </div>

        {/* Status Toggle & Reset */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-full border border-gray-200 text-xs">
            <button
              onClick={() => setSelectedStatus('All')}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                selectedStatus === 'All' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedStatus('Upcoming')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                selectedStatus === 'Upcoming' ? 'bg-[#0073E6] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Open Now
            </button>
            <button
              onClick={() => setSelectedStatus('Completed')}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                selectedStatus === 'Completed' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Closed
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#0073E6] hover:text-[#005bb5] flex items-center gap-1 font-semibold ml-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Results summary bar */}
      <div className="text-xs text-gray-500 pt-2 border-t border-gray-100 flex items-center justify-between">
        <span>
          Showing <strong className="text-[#1C4980]">{totalResults}</strong> opportunities
          {selectedCategory !== 'All Opportunities' && <span> in <strong>{selectedCategory}</strong></span>}
          {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
        </span>
      </div>

    </div>
  );
};
