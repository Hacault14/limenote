import { ChevronDown, Share2, MessageSquare, Star, MoreHorizontal, LogOut } from 'lucide-react'
import { createClient } from '@/libs/supabase/client'
import { useRouter } from 'next/navigation'

export default function TopNav() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="h-12 flex items-center justify-between px-4 border-b border-gray-800 bg-gray-900 fixed top-0 left-60 right-0">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 px-2 py-1 rounded">
          <span>Workspace</span>
          <ChevronDown size={16} />
        </div>
        <div className="h-4 w-px bg-gray-800" />
        <span className="text-sm text-gray-400">Getting Started</span>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-400">Edited Jan 23</span>
        <div className="h-4 w-px bg-gray-800 mx-2" />
        <button className="p-1.5 hover:bg-gray-800 rounded">
          <Share2 size={16} />
        </button>
        <button className="p-1.5 hover:bg-gray-800 rounded">
          <MessageSquare size={16} />
        </button>
        <button className="p-1.5 hover:bg-gray-800 rounded">
          <Star size={16} />
        </button>
        <button className="p-1.5 hover:bg-gray-800 rounded">
          <MoreHorizontal size={16} />
        </button>
        <div className="h-4 w-px bg-gray-800 mx-2" />
        <button 
          onClick={handleSignOut}
          className="p-1.5 hover:bg-gray-800 rounded text-gray-400 hover:text-white"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  )
} 