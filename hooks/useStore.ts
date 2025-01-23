import { create } from 'zustand'
import { StateCreator } from 'zustand'
import { Tables } from '@/types/database'

interface AppState {
  // Current workspace
  currentWorkspace: Tables<'workspaces'> | null
  setCurrentWorkspace: (workspace: Tables<'workspaces'> | null) => void
  
  // Current page
  currentPage: Tables<'pages'> | null
  setCurrentPage: (page: Tables<'pages'> | null) => void
  
  // Navigation
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  // Theme
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  
  // Loading states
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // Error handling
  error: string | null
  setError: (error: string | null) => void
  
  // User settings
  userSettings: Tables<'user_settings'> | null
  setUserSettings: (settings: Tables<'user_settings'> | null) => void
}

const createStore: StateCreator<AppState> = (set) => ({
  // Current workspace
  currentWorkspace: null,
  setCurrentWorkspace: (workspace: Tables<'workspaces'> | null) => set({ currentWorkspace: workspace }),
  
  // Current page
  currentPage: null,
  setCurrentPage: (page: Tables<'pages'> | null) => set({ currentPage: page }),
  
  // Navigation
  sidebarOpen: true,
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  
  // Theme
  theme: 'light' as const,
  setTheme: (theme: 'light' | 'dark') => set({ theme }),
  
  // Loading states
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  
  // Error handling
  error: null,
  setError: (error: string | null) => set({ error }),
  
  // User settings
  userSettings: null,
  setUserSettings: (settings: Tables<'user_settings'> | null) => set({ userSettings: settings }),
})

export const useStore = create<AppState>(createStore) 