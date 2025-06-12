'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
// @ts-ignore
import dateformat from 'dateformat';

interface Props {
  src: string;
  alt: string;
  height: number;
  width: number;
  link: string;
  date?: string;
  className?: string;
  priority?: boolean;
  reactions?: number;
  imageId?: string;
}

export default function CustomImage(props: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(props.priority || false);
  const [isLoved, setIsLoved] = useState(false);
  const [reactionCount, setReactionCount] = useState(props.reactions || 0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    let isMounted = true;

    // For priority images, start loading immediately
    if (props.priority) {
      const img = new Image();
      img.src = props.src;
      img.onload = () => {
        if (isMounted) {
          setIsLoaded(true);
        }
      };
      return;
    }

    // Setup intersection observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (isMounted) {
              setIsVisible(true);
            }
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.01,
      },
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      isMounted = false;
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [props.src, props.priority]);

  const handleImageLoad = () => {
    setIsLoaded(true);
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
      setReactionCount(props.reactions || 0);
      setIsLoved(false);
    }
  };

  const handleReaction = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isUpdating || !props.imageId) return;
    
    setIsUpdating(true);
    setIsAnimating(true);
    
    if (!isLoved) {
      const newCount = reactionCount + 1;
      setIsLoved(true);
      setReactionCount(newCount);
      
      // Update database
      await updateReactionInDatabase(props.imageId, newCount);
    } else {
      const newCount = Math.max(0, reactionCount - 1);
      setIsLoved(false);
      setReactionCount(newCount);
      
      // Update database
      await updateReactionInDatabase(props.imageId, newCount);
    }
    
    // Reset animation after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
    
    setIsUpdating(false);
  };

  return (
    <div className="break-inside-avoid mb-4" ref={imgRef}>
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
      
      <div className="relative">
        <Link href={props.link} className="flex flex-col">
          <div className="img-placeholder relative aspect-[4/3] overflow-hidden rounded-md">
            {/* Main image with blur effect while loading */}
            {isVisible && (
              <img
                src={props.src}
                alt={props.alt}
                width={props.width}
                height={props.height}
                className={`${props.className} w-full h-full object-cover transition-all duration-300 ${
                  isLoaded ? 'blur-none' : 'blur-sm'
                }`}
                loading={props.priority ? 'eager' : 'lazy'}
                onLoad={handleImageLoad}
                decoding="async"
                crossOrigin="anonymous"
                fetchPriority={props.priority ? 'high' : 'low'}
              />
            )}
            
            {/* Compact Heart Reaction Button */}
            <div className="absolute bottom-4 left-4 z-20">
              <button
                onClick={handleReaction}
                disabled={isUpdating}
                className="
                  flex items-center gap-1 px-2 py-1 rounded-full
                  bg-white/95 backdrop-blur-sm border border-gray-200
                  transition-all duration-200 ease-out
                  hover:bg-white hover:scale-105 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-md hover:shadow-lg
                "
                aria-label={isLoved ? 'Remove reaction' : 'Add reaction'}
              >
                {/* Compact SVG Heart Icon */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  className={`transition-all duration-300 ease-out ${
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
                
                {/* Compact Reaction Count */}
                <span className={`
                  text-xs font-semibold transition-all duration-300 min-w-[12px] text-center
                  ${isLoved ? 'text-red-500' : 'text-gray-500'}
                  ${isAnimating ? 'count-slide-up' : ''}
                `}>
                  {reactionCount}
                </span>
              </button>
            </div>
          </div>
        </Link>
        
        {/* Image Info */}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm italic text-slate-500">{props.alt}</span>
          {props.date && (
            <span className="text-xs text-slate-400">
              {dateformat(props.date, 'dd/mm/yyyy')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
