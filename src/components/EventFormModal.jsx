import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { EVENT_CATEGORIES } from '../data/mockEvents';

const PRESET_IMAGES = [
  { label: 'Hackathon', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Programming', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Web3', url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80' },
  { label: 'AI & Data', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Auditorium', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80' }
];

export const EventFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  if (!isOpen) return null;

  const isEditMode = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Competitive Programming',
    date: '',
    time: '02:00 PM',
    venue: 'Radhakrishnan Auditorium, ABESEC',
    mode: 'Offline',
    capacity: 100,
    shortDescription: '',
    description: '',
    bannerImage: PRESET_IMAGES[0].url,
    prizes: '',
    featured: false,
    tagsString: 'DSA, Coding, Contest',
    status: 'Upcoming'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || 'Competitive Programming',
        date: initialData.date || '',
        time: initialData.time || '02:00 PM',
        venue: initialData.venue || '',
        mode: initialData.mode || 'Offline',
        capacity: initialData.capacity || 100,
        shortDescription: initialData.shortDescription || '',
        description: initialData.description || '',
        bannerImage: initialData.bannerImage || PRESET_IMAGES[0].url,
        prizes: initialData.prizes || '',
        featured: Boolean(initialData.featured),
        tagsString: (initialData.tags || []).join(', '),
        status: initialData.status || 'Upcoming'
      });
    } else {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 7);
      const yyyy = defaultDate.getFullYear();
      const mm = String(defaultDate.getMonth() + 1).padStart(2, '0');
      const dd = String(defaultDate.getDate()).padStart(2, '0');

      setFormData({
        title: '',
        category: 'Competitive Programming',
        date: `${yyyy}-${mm}-${dd}`,
        time: '02:00 PM',
        venue: 'Radhakrishnan Auditorium, ABESEC',
        mode: 'Offline',
        capacity: 100,
        shortDescription: '',
        description: '',
        bannerImage: PRESET_IMAGES[0].url,
        prizes: 'Certificates of Merit + CodeChef Goodies',
        featured: false,
        tagsString: 'Competitive Programming, ABESEC, Coding',
        status: 'Upcoming'
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Event title is required';
    if (!formData.date.trim()) errs.date = 'Date is required';
    if (!formData.time.trim()) errs.time = 'Time is required';
    if (!formData.venue.trim()) errs.venue = 'Venue is required';
    if (!formData.description.trim()) errs.description = 'Event description is required';
    if (!formData.capacity || Number(formData.capacity) <= 0) errs.capacity = 'Capacity must be at least 1';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const tags = formData.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      ...formData,
      capacity: Number(formData.capacity),
      tags,
      dateTimeIso: `${formData.date}T${formData.time.replace(/ (AM|PM)/, '') || '10:00'}:00`
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {isEditMode ? 'Edit Event' : 'Add New Event'}
            </h2>
            <p className="text-xs text-gray-500">Provide the event details and schedule</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. CodeClash 2026: Campus Hackathon"
              className={`w-full px-3 py-2 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 ${
                errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
          </div>

          {/* Category & Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {EVENT_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Event Mode
              </label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Offline">Offline (Campus)</option>
                <option value="Online">Online (Virtual)</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Date, Time & Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 ${
                  errors.date ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="e.g. 10:00 AM"
                className={`w-full px-3 py-2 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 ${
                  errors.time ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.time && <p className="text-xs text-red-600 mt-1">{errors.time}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Capacity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="capacity"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 ${
                  errors.capacity ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.capacity && <p className="text-xs text-red-600 mt-1">{errors.capacity}</p>}
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Venue <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="e.g. Radhakrishnan Auditorium, ABESEC"
              className={`w-full px-3 py-2 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 ${
                errors.venue ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.venue && <p className="text-xs text-red-600 mt-1">{errors.venue}</p>}
          </div>

          {/* Short Tagline */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Short Summary
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Brief summary for event cards"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed overview and rules..."
              className={`w-full px-3 py-2 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 ${
                errors.description ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
          </div>

          {/* Prizes */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Prizes / Goodies
            </label>
            <input
              type="text"
              name="prizes"
              value={formData.prizes}
              onChange={handleChange}
              placeholder="e.g. Cash Prizes + Certificates"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Presets */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Cover Image URL
            </label>
            <input
              type="url"
              name="bannerImage"
              value={formData.bannerImage}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs mb-2"
            />
            <div className="flex flex-wrap gap-1.5">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setFormData((prev) => ({ ...prev, bannerImage: preset.url }))}
                  className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                    formData.bannerImage === preset.url
                      ? 'bg-blue-50 text-blue-700 border-blue-300 font-medium'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tagsString"
              value={formData.tagsString}
              onChange={handleChange}
              placeholder="e.g. Coding, Contest, DSA"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Featured & Status */}
          <div className="pt-2 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-xs font-medium text-gray-700">
                Feature in spotlight on home page
              </span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Status:</span>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-900"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-medium text-sm text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              {isEditMode ? 'Save Changes' : 'Publish Event'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
