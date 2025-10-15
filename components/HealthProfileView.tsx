import React from 'react';
import { patientData } from '../data/patientData';
import { HealthIcon, VitalsIcon, WarningIcon, MenuIcon } from './icons/Icons';

interface SummaryCardProps {
    title: string;
    value: string;
    description: string;
    icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, description, icon }) => (
    <div className="bg-light-primary dark:bg-dark-secondary p-6 rounded-xl shadow-sm flex items-center space-x-4">
        <div className="p-3 bg-med-blue/10 dark:bg-med-green/10 rounded-lg text-med-blue dark:text-med-green">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
    </div>
);

interface HealthProfileViewProps {
    toggleSidebar: () => void;
}

const HealthProfileView: React.FC<HealthProfileViewProps> = ({ toggleSidebar }) => {
    const { profile, vitals, medicalHistory, lifestyle } = patientData;

    return (
        <div className="flex flex-col h-full bg-light-secondary dark:bg-dark-primary">
            <div className="p-4 border-b border-light-tertiary dark:border-dark-secondary bg-light-primary dark:bg-dark-primary/50 backdrop-blur-sm sticky top-0 z-10 flex items-center">
                <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-light-tertiary dark:hover:bg-dark-tertiary mr-3 -ml-1 text-gray-500 dark:text-gray-400">
                    <MenuIcon />
                </button>
                <div>
                    <h2 className="text-xl font-semibold">Health Profile: {profile.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">A summary of key health metrics and lifestyle factors.</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SummaryCard title="Blood Pressure" value={vitals.bloodPressure} description="Last checked" icon={<VitalsIcon />} />
                    <SummaryCard title="BMI" value={vitals.bmi.toString()} description="Body Mass Index" icon={<HealthIcon />} />
                    <SummaryCard title="Allergies" value={medicalHistory.allergies.length.toString()} description="Known allergies" icon={<WarningIcon />} />
                    <SummaryCard title="Conditions" value={medicalHistory.conditions.length.toString()} description="Chronic conditions" icon={<HealthIcon />} />
                </div>

                <div className="bg-light-primary dark:bg-dark-secondary rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Lifestyle & Habits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        <div>
                            <p className="font-semibold text-gray-600 dark:text-gray-400">Diet</p>
                            <p className="text-gray-800 dark:text-gray-200">{lifestyle.diet}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-600 dark:text-gray-400">Exercise</p>
                            <p className="text-gray-800 dark:text-gray-200">{lifestyle.exercise}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-600 dark:text-gray-400">Smoking Status</p>
                            <p className="text-gray-800 dark:text-gray-200">{lifestyle.smokingStatus}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-600 dark:text-gray-400">Alcohol Consumption</p>
                            <p className="text-gray-800 dark:text-gray-200">{lifestyle.alcoholConsumption}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-light-primary dark:bg-dark-secondary rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Medical & Family History</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                         <div>
                            <p className="font-semibold text-gray-600 dark:text-gray-400">Surgical History</p>
                            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
                                {medicalHistory.surgeries.map(s => <li key={s.procedure}>{s.procedure} ({s.year})</li>)}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-600 dark:text-gray-400">Family History</p>
                             <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
                                {medicalHistory.familyHistory.map(h => <li key={h}>{h}</li>)}
                            </ul>
                        </div>
                     </div>
                </div>
                 <div className="text-center text-xs text-gray-400 dark:text-gray-500 pt-4">
                    <p><strong>Note:</strong> All information displayed is fictional and for demonstration purposes only.</p>
                </div>
            </div>
        </div>
    );
};

export default HealthProfileView;