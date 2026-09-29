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
  totalResults
}) => {
  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'All' || selectedStatus !== 'All';

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedStatus('All');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
      
      {/* Top Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search events by name, keywords, venue, or topics..."
          className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <div className="text-xs font-semibold text-gray-500 mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Category:</span>
          </div>

          {EVENT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Status Toggle & Reset */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
          
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200 text-xs">
            <button
              onClick={() => setSelectedStatus('All')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                selectedStatus === 'All' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedStatus('Upcoming')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                selectedStatus === 'Upcoming' ? 'bg-white text-blue-600 font-semibold shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setSelectedStatus('Completed')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                selectedStatus === 'Completed' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors ml-1"
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
          Showing <strong>{totalResults}</strong> {totalResults === 1 ? 'event' : 'events'}
          {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
          {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
        </span>
      </div>

    </div>
  );
};
