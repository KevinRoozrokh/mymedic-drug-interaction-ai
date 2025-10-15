
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { medications } from '../data/medications';
import { Medication } from '../types';
import { SearchIcon, MedsIcon, BookmarkIcon, BookmarkSolidIcon, MenuIcon } from './icons/Icons';
import MedicationDetailModal from './MedicationDetailModal';

const categoryColors: { [key: string]: string } = {
  'Cardiovascular': 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200',
  'Cholesterol': 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Diabetes': 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Pain/Inflammation': 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Mental Health': 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200',
};

interface MedicationCardProps {
  medication: Medication;
  onClick: () => void;
  isBookmarked: boolean;
  onBookmark: (e: React.MouseEvent) => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medication, onClick, isBookmarked, onBookmark }) => (
  <button
    onClick={onClick}
    className="w-full bg-light-primary dark:bg-dark-secondary rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-med-blue relative"
  >
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white pr-8">{medication.brandNames[0]}</h3>
      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${categoryColors[medication.category] || 'bg-gray-200 text-gray-800'}`}>
        {medication.category}
      </span>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{medication.genericName}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 line-clamp-2">{medication.description}</p>
     <button 
        onClick={onBookmark}
        className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-tertiary hover:text-med-blue dark:hover:text-med-green transition-colors z-10"
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
        {isBookmarked ? <BookmarkSolidIcon /> : <BookmarkIcon />}
    </button>
  </button>
);

interface MedicationViewProps {
    bookmarkedIds: Set<string>;
    toggleBookmark: (medicationId: string) => void;
    isBookmarked: (medicationId: string) => boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    toggleSidebar: () => void;
    defaultTab?: 'All' | 'Bookmarked';
}

const MedicationView: React.FC<MedicationViewProps> = ({ bookmarkedIds, toggleBookmark, isBookmarked, searchQuery, setSearchQuery, toggleSidebar, defaultTab = 'All' }) => {
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [activeTab, setActiveTab] = useState<'All' | 'Bookmarked'>(defaultTab);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  const autocompleteResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return medications.filter(med =>
      med.genericName.toLowerCase().includes(query) ||
      med.brandNames.some(name => name.toLowerCase().includes(query))
    ).slice(0, 5);
  }, [searchQuery]);

  const filteredMedications = useMemo(() => {
    let baseMeds = medications;
    if (activeTab === 'Bookmarked') {
        baseMeds = medications.filter(med => bookmarkedIds.has(med.id));
    }

    const query = searchQuery.toLowerCase();
    if (!query) return baseMeds;

    return baseMeds.filter(med =>
      med.genericName.toLowerCase().includes(query) ||
      med.brandNames.some(name => name.toLowerCase().includes(query)) ||
      med.category.toLowerCase().includes(query) ||
      med.drugClass.toLowerCase().includes(query)
    );
  }, [searchQuery, activeTab, bookmarkedIds]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
            setShowAutocomplete(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectAutocomplete = (medName: string) => {
      setSearchQuery(medName);
      setShowAutocomplete(false);
  }

  return (
    <div className="flex flex-col h-full bg-light-secondary dark:bg-dark-primary">
      <div className="p-4 border-b border-light-tertiary dark:border-dark-secondary bg-light-primary dark:bg-dark-primary/50 backdrop-blur-sm flex items-center">
        <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-light-tertiary dark:hover:bg-dark-tertiary mr-3 -ml-1 text-gray-500 dark:text-gray-400">
            <MenuIcon />
        </button>
        <h2 className="text-xl font-semibold">Medications Database</h2>
      </div>

      <div className="p-4">
        <div className="flex space-x-4 mb-4">
          {(['All', 'Bookmarked'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === tab ? 'bg-med-blue text-white' : 'bg-light-primary dark:bg-dark-secondary text-gray-600 dark:text-gray-300 hover:bg-light-tertiary dark:hover:bg-dark-tertiary'}`}>
                  {tab}
              </button>
          ))}
        </div>
        <div className="relative" ref={searchContainerRef}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search by brand name, generic name, category..."
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAutocomplete(true);
            }}
            onFocus={() => setShowAutocomplete(true)}
            className="w-full bg-light-primary dark:bg-dark-secondary border border-light-tertiary dark:border-dark-tertiary rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-med-blue"
          />
           {showAutocomplete && autocompleteResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-light-primary dark:bg-dark-secondary border border-light-tertiary dark:border-dark-tertiary rounded-lg shadow-lg">
                  {autocompleteResults.map(med => (
                      <button 
                          key={med.id}
                          onClick={() => handleSelectAutocomplete(med.brandNames[0])}
                          className="w-full text-left px-4 py-2 hover:bg-light-secondary dark:hover:bg-dark-tertiary"
                      >
                          <p className="font-semibold">{med.brandNames[0]}</p>
                          <p className="text-sm text-gray-500">{med.genericName}</p>
                      </button>
                  ))}
              </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredMedications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedications.map(med => (
              <MedicationCard 
                key={med.id} 
                medication={med} 
                onClick={() => setSelectedMedication(med)}
                isBookmarked={isBookmarked(med.id)}
                onBookmark={(e) => {
                    e.stopPropagation();
                    toggleBookmark(med.id);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
             <div className="p-4 bg-light-primary dark:bg-dark-secondary rounded-full mb-4">
                <MedsIcon />
            </div>
            {activeTab === 'Bookmarked' ? (
                <>
                    <h3 className="text-lg font-semibold">No Bookmarked Medications</h3>
                    <p>Click the bookmark icon on any medication to save it here.</p>
                </>
            ) : (
                <>
                    <h3 className="text-lg font-semibold">No Medications Found</h3>
                    <p>Your search for "{searchQuery}" did not match any medications.</p>
                </>
            )}
          </div>
        )}
      </div>

      {selectedMedication && (
        <MedicationDetailModal 
            medication={selectedMedication} 
            onClose={() => setSelectedMedication(null)} 
        />
      )}
    </div>
  );
};

export default MedicationView;
