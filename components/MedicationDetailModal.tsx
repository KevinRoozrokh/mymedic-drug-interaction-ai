import React from 'react';
import { Medication } from '../types';
import { CloseIcon } from './icons/Icons';

interface MedicationDetailModalProps {
  medication: Medication;
  onClose: () => void;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="py-4 border-b border-light-tertiary dark:border-dark-tertiary">
    <h3 className="text-md font-semibold text-med-blue dark:text-med-green mb-2">{title}</h3>
    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">{children}</div>
  </div>
);

const Pill: React.FC<{ text: string }> = ({ text }) => (
    <span className="inline-block bg-light-tertiary dark:bg-dark-tertiary rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 mr-2 mb-2">
        {text}
    </span>
);

const getSeverityColor = (severity: 'Critical' | 'Moderate' | 'Minor') => {
    switch (severity) {
        case 'Critical': return 'text-red-500';
        case 'Moderate': return 'text-orange-500';
        case 'Minor': return 'text-yellow-500';
        default: return 'text-gray-500';
    }
}

const getSeverityBgColor = (severity: 'Critical' | 'Moderate' | 'Minor') => {
    switch (severity) {
        case 'Critical': return 'bg-red-500';
        case 'Moderate': return 'bg-orange-500';
        case 'Minor': return 'bg-yellow-500';
        default: return 'bg-gray-500';
    }
}

const MedicationDetailModal: React.FC<MedicationDetailModalProps> = ({ medication, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="medication-title"
    >
      <div 
        className="relative bg-light-primary dark:bg-dark-secondary rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-light-tertiary dark:border-dark-tertiary sticky top-0 bg-light-primary dark:bg-dark-secondary rounded-t-2xl">
          <h2 id="medication-title" className="text-2xl font-bold">{medication.brandNames.join(' / ')}</h2>
          <p className="text-md text-gray-600 dark:text-gray-400">{medication.genericName}</p>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors" aria-label="Close medication details">
            <CloseIcon />
          </button>
        </div>

        <div className="overflow-y-auto px-6 pb-6">
          <DetailSection title="Description">
            <p>{medication.description}</p>
          </DetailSection>
          
          <DetailSection title="Uses">
            {medication.uses.map(use => <Pill key={use} text={use} />)}
          </DetailSection>
          
          <DetailSection title="Dosage Information">
            <p><strong>Forms:</strong> {medication.dosage.forms.join(', ')}</p>
            <p><strong>Administration:</strong> {medication.dosage.administration}</p>
            {medication.dosage.adult && <p><strong>Adult Dosage:</strong> {medication.dosage.adult}</p>}
            {medication.dosage.pediatric && <p><strong>Pediatric Dosage:</strong> {medication.dosage.pediatric}</p>}
          </DetailSection>
          
          <DetailSection title="Side Effects">
            <p><strong>Common:</strong></p>
            <ul className="list-disc list-inside pl-4">{medication.sideEffects.common.map(effect => <li key={effect}>{effect}</li>)}</ul>
            <p className="mt-2"><strong>Serious (seek medical attention):</strong></p>
            <ul className="list-disc list-inside pl-4">{medication.sideEffects.serious.map(effect => <li key={effect}>{effect}</li>)}</ul>
          </DetailSection>

          <DetailSection title="Contraindications">
             <ul className="list-disc list-inside pl-4">{medication.contraindications.map(item => <li key={item}>{item}</li>)}</ul>
          </DetailSection>

          <DetailSection title="Warnings">
             <ul className="list-disc list-inside pl-4">{medication.warnings.map(item => <li key={item}>{item}</li>)}</ul>
          </DetailSection>

           <DetailSection title="Interactions">
            {medication.interactions.length > 0 ? (
              <div className="space-y-3">
                {medication.interactions.map((interaction) => (
                  <div key={interaction.drug} className="flex items-start">
                    <div
                      className={`flex-shrink-0 w-2.5 h-2.5 rounded-full mt-1.5 mr-3 ${getSeverityBgColor(
                        interaction.severity
                      )}`}
                    />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {interaction.drug} (
                        <span
                          className={`${getSeverityColor(interaction.severity)}`}
                        >
                          {interaction.severity}
                        </span>
                        )
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {interaction.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No significant interactions listed.</p>
            )}
          </DetailSection>

           <DetailSection title="Additional Information">
            <p><strong>Pregnancy Category:</strong> {medication.pregnancyCategory}</p>
            <p><strong>Storage:</strong> {medication.storage}</p>
          </DetailSection>
        </div>
      </div>
    </div>
  );
};

export default MedicationDetailModal;