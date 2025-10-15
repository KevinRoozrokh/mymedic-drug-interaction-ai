import React from 'react';
import { Theme, View } from '../types';
import { MyMedicIcon, ChatIcon, DashboardIcon, MedsIcon, CompareIcon, InteractionIcon, UserIcon, HealthIcon, SettingsIcon, HelpIcon, SunIcon, MoonIcon } from './icons/Icons';

interface SidebarProps {
  theme: Theme;
  toggleTheme: () => void;
  activeView: View;
  setActiveView: (view: View) => void;
  isCollapsed: boolean;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void; isCollapsed: boolean; }> = ({ icon, label, active, onClick, isCollapsed }) => (
  <button
    onClick={onClick}
    title={isCollapsed ? label : undefined}
    className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 text-left ${
      active
        ? 'bg-med-blue text-white shadow-md'
        : 'text-gray-400 hover:bg-dark-tertiary hover:text-white'
    } ${isCollapsed ? 'justify-center' : ''}`}
    aria-current={active ? 'page' : undefined}
  >
    {icon}
    <span className={`ml-4 whitespace-nowrap ${isCollapsed ? 'hidden' : 'inline'}`}>{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ theme, toggleTheme, activeView, setActiveView, isCollapsed }) => {
  const navItems = [
    { view: View.CHAT, icon: <ChatIcon />, label: 'MyMedic Chat' },
    { view: View.DASHBOARD, icon: <DashboardIcon />, label: 'Dashboard' },
    { view: View.MEDICATIONS, icon: <MedsIcon />, label: 'Medications' },
    { view: View.COMPARE, icon: <CompareIcon />, label: 'Compare' },
    { view: View.INTERACTION_CHECKER, icon: <InteractionIcon />, label: 'Interaction Checker' },
  ];

  const secondaryNavItems = [
      { view: View.ACCOUNT, icon: <UserIcon />, label: 'Patient Account' },
      { view: View.HEALTH_PROFILE, icon: <HealthIcon />, label: 'Health Profile' },
      { view: View.SETTINGS, icon: <SettingsIcon />, label: 'User Settings' },
      { view: View.HELP, icon: <HelpIcon />, label: 'Help & FAQ' },
  ];

  return (
    <aside className={`flex-shrink-0 bg-dark-secondary flex flex-col p-4 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className={`flex items-center mb-8 h-[24px] ${isCollapsed ? 'justify-center' : 'px-2'}`}>
        <MyMedicIcon />
        <h1 className={`text-2xl font-bold text-white ml-3 whitespace-nowrap ${isCollapsed ? 'hidden' : 'inline'}`}>MyMedic AI</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavItem 
            key={item.label} 
            {...item}
            active={activeView === item.view}
            onClick={() => setActiveView(item.view)}
            isCollapsed={isCollapsed}
          />
        ))}
         <hr className="my-4 border-gray-600" />
         {secondaryNavItems.map((item) => (
          <NavItem 
            key={item.label} 
            {...item} 
            active={activeView === item.view}
            onClick={() => setActiveView(item.view)}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div className="mt-auto">
         <button
          onClick={toggleTheme}
          title={isCollapsed ? `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode` : undefined}
          className={`w-full flex items-center justify-center p-2.5 rounded-lg bg-dark-tertiary text-gray-300 hover:bg-gray-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-med-blue ${isCollapsed ? 'justify-center' : ''}`}
          aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          <span className={`ml-3 text-sm font-medium whitespace-nowrap ${isCollapsed ? 'hidden' : 'inline'}`}>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;