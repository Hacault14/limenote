import { Share2, MoreHorizontal, MessageSquare, Star } from 'lucide-react'
import { getClient } from '@/libs/supabase/client'
import { useState, useEffect } from 'react'

interface TopNavProps {
  title?: string
  pageId?: string
  isFavorite?: boolean
  onFavoriteChange?: (isFavorite: boolean) => void
}

export default function TopNav({ title = 'New page', pageId, isFavorite = false, onFavoriteChange }: TopNavProps) {
  const [isStarred, setIsStarred] = useState(isFavorite)
  const supabase = getClient()

  useEffect(() => {
    setIsStarred(isFavorite)
  }, [isFavorite])

  const handleToggleFavorite = async () => {
    if (!pageId) return

    try {
      const { error } = await supabase
        .from('pages')
        .update({ is_favorite: !isStarred })
        .eq('id', pageId)

      if (error) throw error

      setIsStarred(!isStarred)
      onFavoriteChange?.(!isStarred)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  return (
    <div className="fixed top-0 right-0 left-52 h-12 bg-[#191919] border-b border-[#2f2f2f] flex items-center justify-between px-4 z-10">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-300">{title}</span>
        <span className="text-sm text-gray-400">Edited Jan 23</span>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={handleToggleFavorite}
          className={`p-1.5 rounded hover:bg-[#2f2f2f] ${isStarred ? 'text-yellow-500' : 'text-gray-500'}`}
        >
          <Star size={16} className={isStarred ? 'fill-current' : ''} />
        </button>
        <button className="p-1.5 hover:bg-[#2f2f2f] rounded text-gray-500">
          <MessageSquare size={16} />
        </button>
        <button className="p-1.5 hover:bg-[#2f2f2f] rounded text-gray-500">
          <Share2 size={16} />
        </button>
        <button className="p-1.5 hover:bg-[#2f2f2f] rounded text-gray-500">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  )
} 