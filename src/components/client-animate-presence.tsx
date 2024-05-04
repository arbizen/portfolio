'use client';
import { AnimatePresence } from 'framer-motion';
export default function ClientAnimatePresence({
  children,
  props,
}: {
  children: React.ReactNode;
  props?: any;
}) {
  return <AnimatePresence {...props}>{children}</AnimatePresence>;
}
