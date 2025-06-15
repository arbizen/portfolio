'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, Languages, Book, Image } from 'lucide-react';
import Link from 'next/link';

interface Changelog {
  id: string;
  version: string;
  message: string;
  date: string;
  isActive: boolean;
  icon: string;
  expiresAfterDays: number | null;
  link: string;
}

interface ChangelogPillProps {
  lang: string;
  className?: string;
}

// Dynamic icon import helper
const getIcon = (iconName: string, size: number = 14) => {
  switch (iconName) {
    case 'language':
      return <Languages size={size} />;
    case 'sparkles':
      return <Sparkles size={size} />;
    case 'poem':
      return <Book size={size} />;
    case 'image':
      return <Image size={size} />;
    default:
      return <Sparkles size={size} />;
  }
};

// Helper function to check if changelog has expired
const isChangelogExpired = (changelog: Changelog): boolean => {
  if (!changelog.expiresAfterDays) {
    return false; // No expiration set
  }

  const changelogDate = new Date(changelog.date);
  const expirationDate = new Date(
    changelogDate.getTime() + changelog.expiresAfterDays * 24 * 60 * 60 * 1000,
  );
  const now = new Date();

  return now > expirationDate;
};

export default function ChangelogPill({
  lang,
  className = '',
}: ChangelogPillProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    async function fetchChangelogs() {
      try {
        const response = await fetch('/api/changelog');
        const data = await response.json();

        if (data.changelogs && data.changelogs.length > 0) {
          // Filter out expired changelogs on client side as well
          const activeChangelogs = data.changelogs.filter(
            (cl: Changelog) => !isChangelogExpired(cl),
          );

          if (activeChangelogs.length > 0) {
            setChangelogs(activeChangelogs);
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.error('Failed to fetch changelogs:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChangelogs();
  }, []);

  // Rotate through changelogs with animation
  useEffect(() => {
    if (changelogs.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % changelogs.length);
        setIsAnimating(false);
      }, 300); // Half of the animation duration
    }, 5500); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [changelogs.length]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleClick = () => {
    const currentChangelog = changelogs[currentIndex];
    if (currentChangelog?.link) {
      window.open(currentChangelog.link, '_self');
    }
  };

  // Show skeleton loader while loading
  if (isLoading) {
    return (
      <div
        className={`inline-flex mt-4 items-center gap-2 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 
                      border border-purple-200/50 px-3 py-1.5 rounded-full shadow-sm relative ${className}`}
      >
        {/* Version Badge Skeleton */}
        <div className="flex items-center gap-1.5">
          <div
            className="bg-gray-200 animate-pulse text-white text-xs font-bold 
                          px-2 py-0.5 rounded-full w-8 h-4"
          ></div>

          {/* Icon Skeleton */}
          <div className="text-purple-600">
            <div className="w-3.5 h-3.5 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>

        {/* Change Text Skeleton */}
        <div className="bg-gray-200 animate-pulse h-3 w-32 rounded"></div>

        {/* Dismiss Button Skeleton */}
        <div className="ml-1 p-0.5 rounded-full">
          <div className="w-3 h-3 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  if (!isVisible || changelogs.length === 0) {
    return null;
  }

  const currentChangelog = changelogs[currentIndex];
  const icon = currentChangelog.icon
    ? getIcon(currentChangelog.icon)
    : getIcon('sparkles');

  return (
    <div
      className="mt-4 relative"
      style={{ height: '40px', overflow: 'hidden' }}
    >
      <div
        className={`inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 cursor-pointer
                      border border-purple-200/50 px-3 py-1.5 rounded-full shadow-sm transition-all duration-500 ${className}`}
        style={{
          transform: `translateY(${isAnimating ? '100%' : '0'})`,
          opacity: isAnimating ? 0 : 1,
        }}
      >
        {/* Version Badge */}
        <div onClick={handleClick} className="flex items-center gap-1.5">
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] font-semibold
                          px-2 py-0.5 rounded-full"
          >
            Update
          </div>

          {/* Icon */}
          <div className="text-purple-600">{icon}</div>
        </div>

        {/* Change Text */}
        <span
          onClick={handleClick}
          className="text-xs font-medium text-slate-700"
        >
          {currentChangelog.message}
        </span>

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="ml-1 text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-full hover:bg-slate-100"
          aria-label="Dismiss changelogs"
        >
          <X size={12} />
        </button>

        {/* Indicator dots for multiple changelogs */}
        {changelogs.length > 1 && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {changelogs.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-purple-600' : 'bg-purple-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
