'use client';
import { cn } from '@/lib/utils';
import { headerItems } from '@/data/header';
import Link from 'next/link';
import { Card } from './ui/card';
import { useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { useState, useCallback, useEffect } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from './ui/command';
import { useTheme } from 'next-themes';

import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  // get the current filter from the url using path name
  const params = useSearchParams();
  console.log(params.get('filter'));
  const [open, setOpen] = useState(false);
  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <header>
      <Card className="px-[32px] py-[24px] flex items-center justify-between">
        <div className="flex gap-8 items-center">
          <Link className="font-bold text-blue-500 text-base" href="/">
            blog/arbizen
          </Link>
          <div className="flex gap-4">
            {headerItems.map((item) => (
              <Link
                className="flex px-[10px] py-[8px] border-blue-200 border rounded-md hover:bg-blue-50"
                style={{
                  background:
                    params.get('filter') === item.query ? '#60A5FA' : '',
                  color: params.get('filter') === item.query ? '#fff' : '',
                }}
                href={`/?filter=${item.query}`}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
            className={cn(
              'relative h-10 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64',
            )}
          >
            <span className="hidden lg:inline-flex">Search blogs...</span>
            <span className="inline-flex lg:hidden">Search...</span>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.55rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search blogs..." />
            <CommandList>
              <CommandEmpty>No blogs found.</CommandEmpty>
              <CommandGroup heading="Theme">
                <CommandItem
                  onSelect={() => runCommand(() => setTheme('light'))}
                >
                  <SunIcon className="mr-2 h-4 w-4" />
                  Light
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => setTheme('dark'))}
                >
                  <MoonIcon className="mr-2 h-4 w-4" />
                  Dark
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => setTheme('system'))}
                >
                  <LaptopIcon className="mr-2 h-4 w-4" />
                  System
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
      </Card>
    </header>
  );
}
