
import React, { useState, useEffect } from 'react';
import { Medication, InteractionResult } from '../types';
import { checkInteractions } from '../data/interactions';
import { PlusIcon, XCircleIcon, InteractionIcon, WarningIcon, MenuIcon } from './icons/Icons';
import MedicationSelectionModal from './MedicationSelectionModal';

const getSeverityStyles = (severity: InteractionResult['severity']) => {
    switch (severity) {
        case 'Critical':
            return {
                bg: 'bg-red-100 dark:bg-red-900/50',
                text: 'text-red-800 dark:text-red-200',
                border: 'border-red-500',
                iconColor: 'text-red-500'
            };
        case 'Moderate':
             return {
                bg: 'bg-orange-100 dark:bg-orange-900/50',
                text: 'text-orange-800 dark:text-orange-200',
                border: 'border-orange-500',
                iconColor: 'text-orange-500'
            };
        case 'Minor':
             return {
                bg: 'bg-yellow-100 dark:bg-yellow-900/50',
                text: 'text-yellow-800 dark:text-yellow-200',
                border: 'border-yellow-500',
                iconColor: 'text-yellow-500'
            };
        default:
             return {
                bg: 'bg-green-100 dark:bg-green-900/50',
                text: 'text-green-800 dark:text-green-200',
                border: 'border-green-500',
                iconColor: 'text-green-500'
            };
    }
};

interface InteractionCheckerViewProps {
    toggleSidebar: () => void;
}

const InteractionCheckerView: React.FC<InteractionCheckerViewProps> = ({ toggleSidebar }) => {
    const [selectedMeds, setSelectedMeds] = useState<Medication[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [interactionResult, setInteractionResult] = useState<InteractionResult | null>(null);

    useEffect(() => {
        if (selectedMeds.length < 2) {
            setInteractionResult(null);
            return;
        }
        const medIds = selectedMeds.map(m => m.id);
        const result = checkInteractions(medIds);
        setInteractionResult(result);
    }, [selectedMeds]);

    const handleAddMedication = (med: Medication) => {
        if (!selectedMeds.find(m => m.id === med.id)) {
            setSelectedMeds([...selectedMeds, med]);
        }
        setIsModalOpen(false);
    };

    const handleRemoveMedication = (medId: string) => {
        setSelectedMeds(selectedMeds.filter(m => m.id !== medId));
    };
    
    const severityStyles = getSeverityStyles(interactionResult?.severity ?? 'None');

    return (
        <div className="flex flex-col h-full bg-light-secondary dark:bg-dark-primary">
            <div className="p-4 border-b border-light-tertiary dark:border-dark-secondary bg-light-primary dark:bg-dark-primary/50 backdrop-blur-sm flex items-center">
                 <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-light-tertiary dark:hover:bg-dark-tertiary mr-3 -ml-1 text-gray-500 dark:text-gray-400">
                    <MenuIcon />
                </button>
                <div>
                    <h2 className="text-xl font-semibold">Interaction Checker</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add two or more medications to check for potential interactions.</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="bg-light-primary dark:bg-dark-secondary rounded-xl shadow-sm p-6">
                    <h3 className="font-bold mb-4">Selected Medications</h3>
                    <div className="flex flex-wrap gap-3">
                        {selectedMeds.map(med => (
                            <div key={med.id} className="flex items-center bg-light-tertiary dark:bg-dark-tertiary rounded-full py-1.5 pl-4 pr-2">
                                <span className="font-medium text-sm">{med.brandNames[0]}</span>
                                <button onClick={() => handleRemoveMedication(med.id)} className="ml-2 text-gray-500 hover:text-red-500">
                                    <XCircleIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-full text-gray-500 dark:text-gray-400 hover:bg-light-tertiary dark:hover:bg-dark-tertiary transition-colors px-4 py-1.5"
                        >
                            <PlusIcon />
                            <span className="ml-1 text-sm font-semibold">Add Medication</span>
                        </button>
                    </div>
                </div>

                {interactionResult ? (
                    <div className={`rounded-xl p-6 border-l-4 ${severityStyles.bg} ${severityStyles.border}`}>
                        <div className="flex items-center">
                            <WarningIcon className={`w-6 h-6 mr-3 ${severityStyles.iconColor}`} />
                            <h3 className={`text-lg font-bold ${severityStyles.text}`}>{interactionResult.summary}</h3>
                        </div>
                        <div className={`mt-4 space-y-2 text-sm ${severityStyles.text}`}>
                            {interactionResult.details.map((detail, index) => <p key={index}>{detail}</p>)}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 p-8">
                         <div className="p-4 bg-light-primary dark:bg-dark-secondary rounded-full mb-4">
                            <InteractionIcon />
                        </div>
                        <h3 className="text-lg font-semibold">Ready to Check Interactions</h3>
                        <p>Add at least two medications to see the results.</p>
                    </div>
                )}
                 <div className="text-center text-xs text-gray-400 dark:text-gray-500 pt-4">
                    <p><strong>Disclaimer:</strong> This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or medication.</p>
                </div>
            </div>
            
            {isModalOpen && (
                <MedicationSelectionModal 
                    onClose={() => setIsModalOpen(false)}
                    onSelect={handleAddMedication}
                    excludeIds={selectedMeds.map(m => m.id)}
                />
            )}
        </div>
    );
};

export default InteractionCheckerView;