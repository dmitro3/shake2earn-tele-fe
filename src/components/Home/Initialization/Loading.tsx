import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import PageContainer from 'components/Common/Page/PageContainer';

const logoSrc = 'assets/logo/logo.png';

export default function Welcome() {
  const logoAnimation: React.ComponentProps<typeof motion.div> = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.75, ease: 'easeInOut' },
  };

  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  useEffect(() => {
    const logo = new Image();
    logo.src = logoSrc;
    logo.onload = () => setIsLogoLoaded(true);
  }, []);

  return (
    <PageContainer
      justify="center"
      align="center"
    >
      {isLogoLoaded && (
        <motion.div {...logoAnimation}>
          <img
            src={logoSrc}
            alt="pirate treasure logo"
            className="max-w-60 max-h-60"
          />
        </motion.div>
      )}
    </PageContainer>
  );
}
