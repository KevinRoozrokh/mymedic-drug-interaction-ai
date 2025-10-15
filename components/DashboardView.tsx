import React, { useState, useMemo } from 'react';
import { medications } from '../data/medications';
import { Medication, View } from '../types';
import { MyMedicIcon, ChatIcon, MedsIcon, CompareIcon, InteractionIcon, BookmarkIcon, SearchIcon, MenuIcon } from './icons/Icons';

interface DashboardViewProps {
    bookmarkedIds: Set<string>;
    setActiveView: (view: View) => void;
    setSearchQuery: (query: string) => void;
    toggleSidebar: () => void;
}

const QuickAccessCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; }> = ({ icon, title, description, onClick }) => (
    <button onClick={onClick} className="bg-light-primary dark:bg-dark-secondary rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left w-full">
        <div className="flex items-center">
            <div className="p-3 bg-med-blue/10 dark:bg-med-green/10 rounded-lg text-med-blue dark:text-med-green">
                {icon}
            </div>
            <div className="ml-4">
                <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        </div>
    </button>
);

const BookmarkedMedicationCard: React.FC<{ medication: Medication }> = ({ medication }) => (
    <div className="bg-light-primary dark:bg-dark-secondary rounded-xl p-4 flex items-center justify-between">
        <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">{medication.brandNames[0]}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{medication.genericName}</p>
        </div>
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-light-tertiary dark:bg-dark-tertiary px-2 py-1 rounded-full">{medication.category}</span>
    </div>
);

const DashboardView: React.FC<DashboardViewProps> = ({ bookmarkedIds, setActiveView, setSearchQuery, toggleSidebar }) => {
    const bookmarkedMeds = medications.filter(med => bookmarkedIds.has(med.id));
    const [localQuery, setLocalQuery] = useState('');

    const autocompleteResults = useMemo(() => {
        if (localQuery.length < 2) return [];
        const query = localQuery.toLowerCase();
        return medications.filter(med =>
            med.genericName.toLowerCase().includes(query) ||
            med.brandNames.some(name => name.toLowerCase().includes(query))
        ).slice(0, 5);
    }, [localQuery]);

    const handleSelect = (med: Medication) => {
        setSearchQuery(med.brandNames[0]);
        setActiveView(View.MEDICATIONS);
    };

    return (
        <div className="flex flex-col h-full bg-light-secondary dark:bg-dark-primary">
            <div className="p-4 border-b border-light-tertiary dark:border-dark-secondary bg-light-primary dark:bg-dark-primary/50 backdrop-blur-sm flex items-center">
                 <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-light-tertiary dark:hover:bg-dark-tertiary mr-3 -ml-1 text-gray-500 dark:text-gray-400">
                    <MenuIcon />
                </button>
                <div>
                    <h2 className="text-xl font-semibold">Dashboard</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, Jane! Here's your health overview.</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 <div className="bg-light-primary dark:bg-dark-secondary rounded-xl shadow-sm p-6 text-center">
                    <MyMedicIcon className="w-16 h-16 mx-auto text-med-blue dark:text-med-green" />
                    <h1 className="text-3xl font-bold mt-4 text-gray-800 dark:text-white">MyMedic Information Sphere</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Your trusted source for medication information.</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Coded by <a href="http://kevinroozrokh.com" target="_blank" rel="noopener noreferrer" className="text-med-blue dark:text-med-green underline hover:no-underline">Kevin Roozrokh</a></p>
                    <div className="relative max-w-xl mx-auto mt-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search medications, e.g., Lipitor..."
                            value={localQuery}
                            onChange={(e) => setLocalQuery(e.target.value)}
                            className="w-full bg-light-secondary dark:bg-dark-tertiary border border-light-tertiary dark:border-dark-secondary rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-med-blue text-gray-800 dark:text-white"
                        />
                        {autocompleteResults.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-light-primary dark:bg-dark-secondary border border-light-tertiary dark:border-dark-tertiary rounded-lg shadow-lg">
                                {autocompleteResults.map(med => (
                                    <button 
                                        key={med.id}
                                        onClick={() => handleSelect(med)}
                                        className="w-full text-left px-4 py-2 hover:bg-light-secondary dark:hover:bg-dark-tertiary"
                                    >
                                        <p className="font-semibold text-gray-800 dark:text-white">{med.brandNames[0]}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{med.genericName}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   <QuickAccessCard icon={<ChatIcon />} title="Ask MyMedic" description="Get answers about medications" onClick={() => setActiveView(View.CHAT)} />
                   <QuickAccessCard icon={<MedsIcon />} title="My Medications" description="View your saved list" onClick={() => setActiveView(View.MEDICATIONS)} />
                   <QuickAccessCard icon={<CompareIcon />} title="Compare Drugs" description="Side-by-side analysis" onClick={() => setActiveView(View.COMPARE)} />
                   <QuickAccessCard icon={<InteractionIcon />} title="Check Interactions" description="Identify potential conflicts" onClick={() => setActiveView(View.INTERACTION_CHECKER)} />
                </div>
                
                <div className="bg-light-primary dark:bg-dark-secondary rounded-xl shadow-sm p-6">
                    <div className="flex items-center mb-4">
                        <BookmarkIcon className="w-6 h-6 text-med-blue dark:text-med-green" />
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white ml-3">Bookmarked Medications</h3>
                    </div>
                     {bookmarkedMeds.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {bookmarkedMeds.map(med => <BookmarkedMedicationCard key={med.id} medication={med} />)}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                             <p>You haven't bookmarked any medications yet.</p>
                             <p className="text-sm">Browse the database and click the bookmark icon to save them here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardView;