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
}

export default function CustomImage(props: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(props.priority || false);
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

  return (
    <div className="break-inside-avoid mb-4" ref={imgRef}>
      <Link href={props.link} className="flex flex-col">
        <div className="img-placeholder relative aspect-[4/3] overflow-hidden">
          {/* Main image with blur effect while loading */}
          {isVisible && (
            <img
              src={props.src}
              alt={props.alt}
              width={props.width}
              height={props.height}
              className={`${props.className} w-full h-full object-cover rounded-md ${
                isLoaded ? 'blur-none' : 'blur-sm'
              }`}
              loading={props.priority ? 'eager' : 'lazy'}
              onLoad={handleImageLoad}
              decoding="async"
              crossOrigin="anonymous"
              fetchPriority={props.priority ? 'high' : 'low'}
            />
          )}
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm italic text-slate-500">{props.alt}</span>
          {props.date && (
            <span className="text-xs text-slate-400">
              {dateformat(props.date, 'dd/mm/yyyy')}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
