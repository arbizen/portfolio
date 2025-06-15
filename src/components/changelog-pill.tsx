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
  const [changelog, setChangelog] = useState<Changelog | null>(null);

  useEffect(() => {
    async function fetchChangelog() {
      try {
        const response = await fetch('/api/changelog');
        const data = await response.json();

        if (data.changelog && data.changelog.isActive) {
          // Check if changelog has expired
          if (!isChangelogExpired(data.changelog)) {
            setChangelog(data.changelog);
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.error('Failed to fetch changelog:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChangelog();
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
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

  if (!isVisible || !changelog) {
    return null;
  }

  const icon = changelog.icon ? getIcon(changelog.icon) : getIcon('sparkles');

  return (
    <div
      className={`inline-flex mt-4 items-center gap-2 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 cursor-pointer
                    border border-purple-200/50 px-3 py-1.5 rounded-full shadow-sm relative ${className}`}
    >
      {/* Version Badge */}
      <div
        onClick={() => window.open(changelog.link, '_self')}
        className="flex items-center gap-1.5"
      >
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
        onClick={() => window.open(changelog.link, '_self')}
        className="text-xs font-medium text-slate-700"
      >
        {changelog.message}
      </span>

      {/* Dismiss Button */}
      <button
        onClick={handleDismiss}
        className="ml-1 text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-full hover:bg-slate-100"
        aria-label="Dismiss changelog"
      >
        <X size={12} />
      </button>
    </div>
  );
}
