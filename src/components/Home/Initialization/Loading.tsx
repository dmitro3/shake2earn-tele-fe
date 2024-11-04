import { motion } from 'framer-motion';

import PageContainer from 'components/Common/Page/PageContainer';

const logoSrc = 'assets/logo.png';

export default function Welcome() {
  const logoAnimation: React.ComponentProps<typeof motion.div> = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.75, ease: 'easeIn' },
  };

  return (
    <PageContainer
      justify="center"
      align="center"
    >
      <motion.div {...logoAnimation}>
        <img
          src={logoSrc}
          alt="pirate treasure logo"
          className="max-w-60 max-h-60"
        />
      </motion.div>
    </PageContainer>
  );
}
