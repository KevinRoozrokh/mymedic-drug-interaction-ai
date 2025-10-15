
import React, { useState } from 'react';
import { View, Theme } from './types';
import { useTheme } from './hooks/useTheme';
import { useBookmarks } from './hooks/useBookmarks';

import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import DashboardView from './components/DashboardView';
import MedicationView from './components/MedicationView';
import CompareView from './components/CompareView';
import InteractionCheckerView from './components/InteractionCheckerView';
import PatientAccountView from './components/PatientAccountView';
import HealthProfileView from './components/HealthProfileView';
import UserSettingsView from './components/UserSettingsView';
import HelpView from './components/HelpView';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeView, setActiveView] = useState<View>(View.DASHBOARD);
  const { bookmarkedIds, toggleBookmark, isBookmarked } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);

  const renderView = () => {
    switch (activeView) {
      case View.CHAT:
        return <ChatView toggleSidebar={toggleSidebar} />;
      case View.DASHBOARD:
        return <DashboardView bookmarkedIds={bookmarkedIds} setActiveView={setActiveView} setSearchQuery={setSearchQuery} toggleSidebar={toggleSidebar} />;
      case View.MEDICATIONS:
        return <MedicationView bookmarkedIds={bookmarkedIds} toggleBookmark={toggleBookmark} isBookmarked={isBookmarked} searchQuery={searchQuery} setSearchQuery={setSearchQuery} toggleSidebar={toggleSidebar} />;
      case View.COMPARE:
        return <CompareView toggleSidebar={toggleSidebar} />;
      case View.INTERACTION_CHECKER:
        return <InteractionCheckerView toggleSidebar={toggleSidebar} />;
      case View.BOOKMARKS:
        return <MedicationView bookmarkedIds={bookmarkedIds} toggleBookmark={toggleBookmark} isBookmarked={isBookmarked} searchQuery={""} setSearchQuery={setSearchQuery} toggleSidebar={toggleSidebar} defaultTab="Bookmarked" />;
      case View.ACCOUNT:
        return <PatientAccountView toggleSidebar={toggleSidebar} />;
      case View.HEALTH_PROFILE:
        return <HealthProfileView toggleSidebar={toggleSidebar} />;
      case View.SETTINGS:
        return <UserSettingsView toggleSidebar={toggleSidebar} theme={theme} toggleTheme={toggleTheme} />;
      case View.HELP:
        return <HelpView toggleSidebar={toggleSidebar} />;
      default:
        return <DashboardView bookmarkedIds={bookmarkedIds} setActiveView={setActiveView} setSearchQuery={setSearchQuery} toggleSidebar={toggleSidebar} />;
    }
  };

  return (
    <div className={`flex h-screen bg-light-secondary dark:bg-dark-primary text-gray-800 dark:text-gray-200 font-sans`}>
      <Sidebar
        theme={theme}
        toggleTheme={toggleTheme}
        activeView={activeView}
        setActiveView={setActiveView}
        isCollapsed={isSidebarCollapsed}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
