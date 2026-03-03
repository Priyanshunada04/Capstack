import { useState, useEffect, useCallback } from 'react';
import type { User, Submission, TrackerItem, ActivityItem } from '@/types';

const STORAGE_KEYS = {
  users: 'capstack_users',
  currentUser: 'capstack_current_user',
  submissions: 'capstack_submissions',
  activity: 'capstack_activity',
};

// Admin credentials
export const ADMIN_EMAIL = 'admin@capstack.io';
export const ADMIN_PASSWORD = 'admin2026';

export function useDatabase() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Users
  const getUsers = useCallback((): User[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
  }, []);

  const saveUsers = useCallback((users: User[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  }, []);

  const getCurrentUser = useCallback((): User | null => {
    if (typeof window === 'undefined') return null;
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser) || 'null');
  }, []);

  const setCurrentUser = useCallback((user: User | null) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  }, []);

  const clearCurrentUser = useCallback(() => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  }, []);

  // Submissions
  const getSubmissions = useCallback((): Submission[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.submissions) || '[]');
  }, []);

  const saveSubmissions = useCallback((subs: Submission[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.submissions, JSON.stringify(subs));
  }, []);

  // Activity Log
  const getActivityLog = useCallback((): ActivityItem[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.activity) || '[]');
  }, []);

  const saveActivityLog = useCallback((log: ActivityItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.activity, JSON.stringify(log));
  }, []);

  const logActivity = useCallback((icon: string, text: string, type: ActivityItem['type'] = 'blue') => {
    const log = getActivityLog();
    log.unshift({ icon, text, type, time: new Date().toISOString() });
    if (log.length > 100) log.pop();
    saveActivityLog(log);
  }, [getActivityLog, saveActivityLog]);

  // Tracker (per-user)
  const getTrackerKey = (userId: string) => `capstack_tracker_${userId}`;

  const getTrackerItems = useCallback((userId: string): TrackerItem[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(getTrackerKey(userId)) || '[]');
  }, []);

  const saveTrackerItems = useCallback((userId: string, items: TrackerItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(getTrackerKey(userId), JSON.stringify(items));
  }, []);

  return {
    isLoaded,
    getUsers,
    saveUsers,
    getCurrentUser,
    setCurrentUser,
    clearCurrentUser,
    getSubmissions,
    saveSubmissions,
    getActivityLog,
    saveActivityLog,
    logActivity,
    getTrackerItems,
    saveTrackerItems,
  };
}
