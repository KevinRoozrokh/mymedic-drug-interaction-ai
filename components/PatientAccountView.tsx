
import React from 'react';
import { patientData } from '../data/patientData';
import { UserIcon, MedsIcon, VitalsIcon, LabIcon, HealthIcon, WarningIcon, MenuIcon } from './icons/Icons';

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children }) => (
    <div className="bg-light-primary dark:bg-dark-secondary rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-4">
            <div className="text-med-blue dark:text-med-green">{icon}</div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white ml-3">{title}</h3>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            {children}
        </div>
    </div>
);

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-2">
        <span className="font-semibold text-gray-600 dark:text-gray-400 col-span-1">{label}</span>
        <span className="col-span-2">{value}</span>
    </div>
);

interface PatientAccountViewProps {
    toggleSidebar: () => void;
}

const PatientAccountView: React.FC<PatientAccountViewProps> = ({ toggleSidebar }) => {
    const { profile, medicalHistory, currentMedications, vitals, recentLabs } = patientData;

    return (
        <div className="flex flex-col h-full bg-light-secondary dark:bg-dark-primary">
            <div className="p-4 border-b border-light-tertiary dark:border-dark-secondary bg-light-primary dark:bg-dark-primary/50 backdrop-blur-sm sticky top-0 z-10 flex items-center">
                <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-light-tertiary dark:hover:bg-dark-tertiary mr-3 -ml-1 text-gray-500 dark:text-gray-400">
                    <MenuIcon />
                </button>
                <div>
                    <h2 className="text-xl font-semibold">Patient Account: {profile.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">This is a mock patient profile for demonstration purposes.</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InfoCard icon={<UserIcon />} title="Patient Information">
                        <DetailItem label="Date of Birth" value={`${profile.dob} (Age ${profile.age})`} />
                        <DetailItem label="Gender" value={profile.gender} />
                        <DetailItem label="Blood Type" value={profile.bloodType} />
                        <DetailItem label="Contact" value={profile.contact.email} />
                        <DetailItem label="Primary Physician" value={profile.primaryCarePhysician} />
                        <DetailItem label="Insurance" value={`${profile.insurance.provider} - ${profile.insurance.policyNumber}`} />
                    </InfoCard>

                    <InfoCard icon={<WarningIcon />} title="Allergies & Conditions">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100">Known Allergies:</h4>
                        <ul className="list-disc list-inside pl-4">{medicalHistory.allergies.map(allergy => <li key={allergy}>{allergy}</li>)}</ul>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mt-3">Chronic Conditions:</h4>
                        <ul className="list-disc list-inside pl-4">{medicalHistory.conditions.map(condition => <li key={condition}>{condition}</li>)}</ul>
                    </InfoCard>
                </div>
                
                 <InfoCard icon={<MedsIcon />} title="Current Medications">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-light-tertiary dark:border-dark-tertiary">
                                    <th className="font-semibold pb-2">Medication</th>
                                    <th className="font-semibold pb-2">Dosage</th>
                                    <th className="font-semibold pb-2">Frequency</th>
                                    <th className="font-semibold pb-2">Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentMedications.map(med => (
                                    <tr key={med.name} className="border-b border-light-tertiary dark:border-dark-tertiary last:border-b-0">
                                        <td className="py-2">{med.name}</td>
                                        <td className="py-2">{med.dosage}</td>
                                        <td className="py-2">{med.frequency}</td>
                                        <td className="py-2">{med.reason}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </InfoCard>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     <InfoCard icon={<VitalsIcon />} title={`Vitals (as of ${vitals.lastChecked})`}>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <DetailItem label="Blood Pressure" value={vitals.bloodPressure} />
                            <DetailItem label="Heart Rate" value={vitals.heartRate} />
                            <DetailItem label="O2 Saturation" value={vitals.oxygenSaturation} />
                            <DetailItem label="Temperature" value={vitals.temperature} />
                            <DetailItem label="Weight" value={vitals.weight} />
                            <DetailItem label="BMI" value={vitals.bmi} />
                        </div>
                    </InfoCard>

                     <InfoCard icon={<LabIcon />} title="Recent Lab Results">
                         {recentLabs.map(lab => (
                            <div key={lab.test} className="grid grid-cols-3 gap-2 items-center">
                                <span className="font-semibold col-span-1">{lab.test}</span>
                                <span className="col-span-1">{lab.result}</span>
                                <span className={`col-span-1 px-2 py-0.5 text-xs font-medium rounded-full text-center ${lab.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{lab.status}</span>
                            </div>
                         ))}
                    </InfoCard>
                </div>
            </div>
        </div>
    );
};

export default PatientAccountView;
