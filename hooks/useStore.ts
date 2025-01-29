import { create } from 'zustand'
import { StateCreator } from 'zustand'
import { Tables } from '@/types/database'
import { getClient } from '@/libs/supabase/client'

type Page = Tables<'pages'> & {
  is_favorite: boolean
  position_index: number
}

interface AppState {
  // Current workspace
  currentWorkspace: Tables<'workspaces'> | null
  setCurrentWorkspace: (workspace: Tables<'workspaces'> | null) => void
  
  // Current page
  currentPage: Page | null
  setCurrentPage: (page: Page | null) => void
  
  // Pages
  pages: Page[]
  setPages: (pages: Page[] | ((prev: Page[]) => Page[])) => void
  updatePage: (pageId: string, updates: Partial<Page>) => Promise<void>
  
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

const createStore: StateCreator<AppState> = (set, get) => ({
  // Current workspace
  currentWorkspace: null,
  setCurrentWorkspace: (workspace: Tables<'workspaces'> | null) => set({ currentWorkspace: workspace }),
  
  // Current page
  currentPage: null,
  setCurrentPage: (page: Page | null) => set({ currentPage: page }),
  
  // Pages
  pages: [],
  setPages: (pagesOrUpdater: Page[] | ((prev: Page[]) => Page[])) => 
    set((state) => ({ 
      pages: typeof pagesOrUpdater === 'function' 
        ? pagesOrUpdater(state.pages)
        : pagesOrUpdater 
    })),
  updatePage: async (pageId: string, updates: Partial<Page>) => {
    const supabase = getClient()
    try {
      const { error } = await supabase
        .from('pages')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', pageId)

      if (error) throw error

      // Update local state
      const pages = get().pages
      set({
        pages: pages.map(p => 
          p.id === pageId ? { ...p, ...updates } as Page : p
        ),
        // Also update currentPage if it's the one being modified
        currentPage: get().currentPage?.id === pageId 
          ? { ...get().currentPage!, ...updates } as Page
          : get().currentPage
      })
    } catch (error) {
      console.error('Error updating page:', error)
    }
  },
  
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