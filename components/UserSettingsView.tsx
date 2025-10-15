
import React from 'react';
import { MenuIcon, SunIcon, MoonIcon, SettingsIcon, UserIcon, HealthIcon } from './icons/Icons';
import { Theme } from '../types';

interface UserSettingsViewProps {
    toggleSidebar: () => void;
    theme: Theme;
    toggleTheme: () => void;
}

const SettingRow: React.FC<{ icon: React.ReactNode; title: string; description: string; control: React.ReactNode }> = ({ icon, title, description, control }) => (
    <div className="flex items-center justify-between py-4 border-b border-light-tertiary dark:border-dark-tertiary last:border-b-0">
        <div className="flex items-center">
            <div className="text-gray-500 dark:text-gray-400">{icon}</div>
            <div className="ml-4">
                <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        </div>
        <div>{control}</div>
    </div>
);

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
    <button onClick={onChange} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${checked ? 'bg-med-blue' : 'bg-gray-300 dark:bg-gray-600'}`}>
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);


const UserSettingsView: React.FC<UserSettingsViewProps> = ({ toggleSidebar, theme, toggleTheme }) => {
    return (
        <div className="flex flex-col h-full bg-light-secondary dark:bg-dark-primary">
            <div className="p-4 border-b border-light-tertiary dark:border-dark-secondary bg-light-primary dark:bg-dark-primary/50 backdrop-blur-sm flex items-center">
                <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-light-tertiary dark:hover:bg-dark-tertiary mr-3 -ml-1 text-gray-500 dark:text-gray-400">
                    <MenuIcon />
                </button>
                <h2 className="text-xl font-semibold">User Settings</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl mx-auto bg-light-primary dark:bg-dark-secondary rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold mb-4">Appearance</h3>
                    <SettingRow 
                        icon={theme === 'dark' ? <MoonIcon /> : <SunIcon />}
                        title="Theme"
                        description="Switch between light and dark mode"
                        control={<button onClick={toggleTheme} className="font-semibold text-med-blue dark:text-med-green text-sm px-4 py-2 rounded-lg hover:bg-med-blue/10 dark:hover:bg-med-green/10 transition-colors">{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</button>}
                    />
                     <h3 className="text-lg font-bold mb-4 mt-8">Notifications</h3>
                     <SettingRow 
                        icon={<UserIcon />}
                        title="Email Notifications"
                        description="Receive updates about your account"
                        control={<ToggleSwitch checked={true} onChange={() => {}} />}
                    />
                     <SettingRow 
                        icon={<HealthIcon />}
                        title="Health Alerts"
                        description="Get notified about important health information"
                        control={<ToggleSwitch checked={false} onChange={() => {}} />}
                    />
                     <h3 className="text-lg font-bold mb-4 mt-8">Account</h3>
                     <SettingRow 
                        icon={<UserIcon />}
                        title="Edit Profile"
                        description="Update your personal information"
                        control={<button className="font-semibold text-med-blue dark:text-med-green text-sm px-4 py-2 rounded-lg hover:bg-med-blue/10 dark:hover:bg-med-green/10 transition-colors">Edit</button>}
                    />
                     <SettingRow 
                        icon={<SettingsIcon />}
                        title="Change Password"
                        description="Update your account password"
                        control={<button className="font-semibold text-med-blue dark:text-med-green text-sm px-4 py-2 rounded-lg hover:bg-med-blue/10 dark:hover:bg-med-green/10 transition-colors">Change</button>}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserSettingsView;
