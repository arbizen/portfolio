'use client';
import { useState } from 'react';

interface HeartReactionProps {
  imageId: string;
  initialReactions: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function HeartReaction({ 
  imageId, 
  initialReactions, 
  size = 'md',
  className = '' 
}: HeartReactionProps) {
  const [isLoved, setIsLoved] = useState(false);
  const [reactionCount, setReactionCount] = useState(initialReactions);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeClasses = {
    sm: { 
      button: 'px-2 py-1 gap-1',
      icon: 'w-3 h-3',
      text: 'text-xs'
    },
    md: { 
      button: 'px-3 py-1.5 gap-1.5',
      icon: 'w-4 h-4',
      text: 'text-sm'
    },
    lg: { 
      button: 'px-4 py-2 gap-2',
      icon: 'w-5 h-5',
      text: 'text-base'
    },
  };

  const updateReactionInDatabase = async (imageId: string, newCount: number) => {
    try {
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageId, reactions: newCount }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update reaction');
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
      // Revert the state if API call fails
      setReactionCount(initialReactions);
      setIsLoved(false);
    }
  };

  const handleReaction = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isUpdating) return;
    
    setIsUpdating(true);
    setIsAnimating(true);
    
    if (!isLoved) {
      const newCount = reactionCount + 1;
      setIsLoved(true);
      setReactionCount(newCount);
      
      // Update database
      await updateReactionInDatabase(imageId, newCount);
    } else {
      const newCount = Math.max(0, reactionCount - 1);
      setIsLoved(false);
      setReactionCount(newCount);
      
      // Update database
      await updateReactionInDatabase(imageId, newCount);
    }
    
    // Reset animation after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
    
    setIsUpdating(false);
  };

  return (
    <>
      <style jsx>{`
        @keyframes heartBeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.25); }
          40% { transform: scale(1.1); }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes countSlideUp {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .heart-beat {
          animation: heartBeat 0.6s ease-out;
        }
        
        .count-slide-up {
          animation: countSlideUp 0.4s ease-out;
        }
      `}</style>
      
      <button
        onClick={handleReaction}
        disabled={isUpdating}
        className={`
          flex items-center rounded-full
          bg-white/95 backdrop-blur-sm border border-gray-200
          transition-all duration-200 ease-out
          hover:bg-white hover:scale-105 active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
          shadow-md hover:shadow-lg
          ${sizeClasses[size].button}
          ${className}
        `}
        aria-label={isLoved ? 'Remove reaction' : 'Add reaction'}
      >
        {/* Heart Icon */}
        <svg
          viewBox="0 0 24 24"
          className={`transition-all duration-300 ease-out ${sizeClasses[size].icon} ${
            isAnimating ? 'heart-beat' : ''
          } ${isUpdating ? 'animate-pulse' : ''}`}
          style={{ 
            fill: isLoved ? '#ef4444' : 'none',
            stroke: isLoved ? '#ef4444' : '#9ca3af',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
          }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        
        {/* Reaction Count */}
        <span className={`
          font-semibold transition-all duration-300 min-w-[12px] text-center
          ${sizeClasses[size].text}
          ${isLoved ? 'text-red-500' : 'text-gray-500'}
          ${isAnimating ? 'count-slide-up' : ''}
        `}>
          {reactionCount}
        </span>
      </button>
    </>
  );
} 