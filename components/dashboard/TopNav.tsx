import { Share2, MessageSquare, Star, MoreHorizontal, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/hooks/useStore'
import { useEffect, useState } from 'react'
import { getClient } from '@/libs/supabase/client'

interface TopNavProps {
  title?: string
  pageId?: string
}

export default function TopNav({ title = 'Untitled', pageId }: TopNavProps) {
  const router = useRouter()
  const supabase = getClient()

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="h-12 flex items-center justify-between px-4 bg-[#191919] fixed top-0 left-52 right-0">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-400">{title}</span>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-400">Edited Jan 23</span>
        <div className="h-4 w-px bg-[#2f2f2f] mx-2" />
        <button className="p-1.5 hover:bg-[#2f2f2f] rounded">
          <Share2 size={16} />
        </button>
        <button className="p-1.5 hover:bg-[#2f2f2f] rounded">
          <MessageSquare size={16} />
        </button>
        <button className="p-1.5 hover:bg-[#2f2f2f] rounded">
          <Star size={16} />
        </button>
        <button className="p-1.5 hover:bg-[#2f2f2f] rounded">
          <MoreHorizontal size={16} />
        </button>
        <div className="h-4 w-px bg-[#2f2f2f] mx-2" />
        <button 
          onClick={handleSignOut}
          className="p-1.5 hover:bg-[#2f2f2f] rounded text-gray-400 hover:text-white"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  )
} 