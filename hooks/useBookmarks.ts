import { useState, useEffect, useCallback } from 'react';

const BOOKMARKS_STORAGE_KEY = 'MyMedic-bookmarks';

export const useBookmarks = () => {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (storedBookmarks) {
        setBookmarkedIds(new Set(JSON.parse(storedBookmarks)));
      }
    } catch (error) {
      console.error('Error reading bookmarks from localStorage', error);
      setBookmarkedIds(new Set());
    }
  }, []);

  const updateLocalStorage = (ids: Set<string>) => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(Array.from(ids)));
    } catch (error) {
      console.error('Error writing bookmarks to localStorage', error);
    }
  };

  const toggleBookmark = useCallback((medicationId: string) => {
    setBookmarkedIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(medicationId)) {
        newIds.delete(medicationId);
      } else {
        newIds.add(medicationId);
      }
      updateLocalStorage(newIds);
      return newIds;
    });
  }, []);

  const isBookmarked = useCallback((medicationId: string) => {
    return bookmarkedIds.has(medicationId);
  }, [bookmarkedIds]);

  return { bookmarkedIds, toggleBookmark, isBookmarked };
};
