'use client';

import { motion, MotionProps } from 'framer-motion';

interface Props extends MotionProps {
  children: React.ReactNode;
}

export default function ClientMotionDiv(props: Props) {
  return <motion.div {...props}>{props.children}</motion.div>;
}
