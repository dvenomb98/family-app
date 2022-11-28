import { useMedia } from 'react-use';

interface MobileWidthProps {
  isMobile: boolean;
}
const BREAKPOINT = 1024;

const useMobileWidth = (): MobileWidthProps => {
  const isMobile = useMedia(`(max-width: ${BREAKPOINT}px)`, true);

  return { isMobile };
};

export default useMobileWidth;
