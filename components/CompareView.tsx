import React, { useState } from 'react';
import { Medication } from '../types';
import { PlusIcon, XCircleIcon, CompareIcon, MenuIcon } from './icons/Icons';
import MedicationSelectionModal from './MedicationSelectionModal';

const comparisonFields = [
    { key: 'category', label: 'Category' },
    { key: 'drugClass', label: 'Drug Class' },
    { key: 'uses', label: 'Uses' },
    { key: 'dosage.forms', label: 'Dosage Forms' },
    { key: 'sideEffects.common', label: 'Common Side Effects' },
    { key: 'sideEffects.serious', label: 'Serious Side Effects' },
    { key: 'contraindications', label: 'Contraindications' },
    { key: 'pregnancyCategory', label: 'Pregnancy Category' },
];

// Helper to access nested properties
const getProperty = (obj: any, path: string) => {
    return path.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
}

interface CompareViewProps {
    toggleSidebar: () => void;
}

const CompareView: React.FC<CompareViewProps> = ({ toggleSidebar }) => {
    const [medsToCompare, setMedsToCompare] = useState<Medication[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddMedication = (med: Medication) => {
        if (medsToCompare.length < 3 && !medsToCompare.find(m => m.id === med.id)) {
            setMedsToCompare([...medsToCompare, med]);
        }
        setIsModalOpen(false);
    };

    const handleRemoveMedication = (medId: string) => {
        setMedsToCompare(medsToCompare.filter(m => m.id !== medId));
    };

    const renderFieldValue = (med: Medication, fieldKey: string) => {
        const value = getProperty(med, fieldKey);
        if (Array.isArray(value)) {
            return (
                <ul className="list-disc list-inside space-y-1">
                    {value.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            );
        }
        return value || 'N/A';
    };

    return (
        <div className="flex flex-col h-full bg-light-secondary dark:bg-dark-primary">
            <div className="p-4 border-b border-light-tertiary dark:border-dark-secondary bg-light-primary dark:bg-dark-primary/50 backdrop-blur-sm flex items-center">
                 <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-light-tertiary dark:hover:bg-dark-tertiary mr-3 -ml-1 text-gray-500 dark:text-gray-400">
                    <MenuIcon />
                </button>
                <div>
                    <h2 className="text-xl font-semibold">Medication Comparison</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Select up to 3 medications to compare side-by-side.</p>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-4 min-w-max">
                    {/* Headers Row */}
                    <div className="sticky top-0 bg-light-secondary dark:bg-dark-primary z-10 p-4 font-bold border-b border-r border-light-tertiary dark:border-dark-tertiary">
                        Feature
                    </div>
                    {medsToCompare.map((med) => (
                        <div key={med.id} className="sticky top-0 bg-light-primary dark:bg-dark-secondary z-10 p-4 font-bold border-b border-r border-light-tertiary dark:border-dark-tertiary text-center relative">
                            <h3 className="text-med-blue dark:text-med-green">{med.brandNames[0]}</h3>
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{med.genericName}</p>
                            <button onClick={() => handleRemoveMedication(med.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
                                <XCircleIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                    {medsToCompare.length < 3 && (
                        <div className="sticky top-0 bg-light-secondary dark:bg-dark-primary z-10 p-4 border-b border-light-tertiary dark:border-dark-tertiary flex items-center justify-center">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-light-primary dark:hover:bg-dark-secondary transition-colors"
                            >
                                <PlusIcon />
                                <span className="mt-1 text-sm font-semibold">Add Medication</span>
                            </button>
                        </div>
                    )}
                     {[...Array(Math.max(0, 2 - medsToCompare.length))].map((_, i) => (
                        <div key={`placeholder-${i}`} className="sticky top-0 bg-light-secondary dark:bg-dark-primary z-10 p-4 border-b border-r border-light-tertiary dark:border-dark-tertiary"></div>
                    ))}

                    {/* Data Rows */}
                    {comparisonFields.map(field => (
                        <React.Fragment key={field.key}>
                            <div className="p-4 font-semibold bg-light-primary dark:bg-dark-secondary border-b border-r border-light-tertiary dark:border-dark-tertiary">{field.label}</div>
                            {medsToCompare.map(med => (
                                <div key={`${med.id}-${field.key}`} className="p-4 text-sm border-b border-r border-light-tertiary dark:border-dark-tertiary">
                                    {renderFieldValue(med, field.key)}
                                </div>
                            ))}
                             {medsToCompare.length < 3 && <div className="p-4 border-b border-light-tertiary dark:border-dark-tertiary"></div>}
                             {[...Array(Math.max(0, 2 - medsToCompare.length))].map((_, i) => (
                                <div key={`placeholder-cell-${i}`} className="p-4 border-b border-r border-light-tertiary dark:border-dark-tertiary"></div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
                {medsToCompare.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 p-8">
                         <div className="p-4 bg-light-primary dark:bg-dark-secondary rounded-full mb-4">
                            <CompareIcon />
                        </div>
                        <h3 className="text-lg font-semibold">Start Your Comparison</h3>
                        <p>Click the "Add Medication" button to begin comparing.</p>
                    </div>
                )}
            </div>
            
            {isModalOpen && (
                <MedicationSelectionModal 
                    onClose={() => setIsModalOpen(false)}
                    onSelect={handleAddMedication}
                    excludeIds={medsToCompare.map(m => m.id)}
                />
            )}
        </div>
    );
};

export default CompareView;