import React, { useState, useMemo } from 'react';
import { Medication } from '../types';
import { medications } from '../data/medications';
import { SearchIcon, CloseIcon } from './icons/Icons';

interface MedicationSelectionModalProps {
  onClose: () => void;
  onSelect: (medication: Medication) => void;
  excludeIds: string[];
}

const MedicationSelectionModal: React.FC<MedicationSelectionModalProps> = ({ onClose, onSelect, excludeIds }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const availableMedications = useMemo(() => {
    return medications.filter(med => !excludeIds.includes(med.id));
  }, [excludeIds]);

  const filteredMedications = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!query) return availableMedications;

    return availableMedications.filter(med =>
      med.genericName.toLowerCase().includes(query) ||
      med.brandNames.some(name => name.toLowerCase().includes(query))
    );
  }, [searchQuery, availableMedications]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-light-primary dark:bg-dark-secondary rounded-2xl shadow-2xl w-full max-w-md max-h-[70vh] flex flex-col m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-light-tertiary dark:border-dark-tertiary sticky top-0 bg-light-primary dark:bg-dark-secondary rounded-t-2xl">
            <h2 className="text-lg font-bold">Select a Medication</h2>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors" aria-label="Close selection">
                <CloseIcon />
            </button>
            <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    placeholder="Search medications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-light-secondary dark:bg-dark-primary border border-light-tertiary dark:border-dark-tertiary rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-med-blue"
                    autoFocus
                />
            </div>
        </div>

        <div className="overflow-y-auto p-2">
            {filteredMedications.map(med => (
                <button 
                    key={med.id}
                    onClick={() => onSelect(med)}
                    className="w-full text-left p-3 rounded-lg hover:bg-light-secondary dark:hover:bg-dark-tertiary transition-colors"
                >
                    <p className="font-semibold">{med.brandNames[0]}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{med.genericName}</p>
                </button>
            ))}
             {filteredMedications.length === 0 && (
                <p className="p-4 text-center text-gray-500">
                    {searchQuery ? `No medications found for "${searchQuery}".` : 'No available medications.'}
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default MedicationSelectionModal;