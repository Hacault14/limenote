import { ReactNode } from 'react'
import { useStore } from '@/hooks/useStore'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarOpen } = useStore()

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-zinc-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 