import { Flex } from '@radix-ui/themes';
import { motion } from 'framer-motion';

import PageContainer from 'components/Common/Page/PageContainer';

import PirateChestLogo from 'assets/trease-logo.png';

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
          src={PirateChestLogo}
          alt="pirate chest logo"
          style={{ maxWidth: 240, maxHeight: 240 }}
        />
      </motion.div>
    </PageContainer>
  );
}
