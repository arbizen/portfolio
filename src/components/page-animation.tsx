import ClientAnimatePresence from './client-animate-presence';
import ClientMotionDiv from './client-motion-div';

const animation = {
  transition: { duration: 0.2 },
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PageAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientAnimatePresence>
      <ClientMotionDiv {...animation}>{children}</ClientMotionDiv>
    </ClientAnimatePresence>
  );
}
