'use client';
import { AnimatePresence, AnimatePresenceProps } from 'framer-motion';

interface ClientAnimatePresenceProps extends AnimatePresenceProps {
  children: React.ReactNode;
}

export default function ClientAnimatePresence(
  props: ClientAnimatePresenceProps,
) {
  return <AnimatePresence {...props}>{props.children}</AnimatePresence>;
}
