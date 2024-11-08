import { Box, Card, Flex } from '@radix-ui/themes';

import { useAppContext } from 'context/app';

import DialogCustom from './DialogCustom';
import Privacy from './Privacy';
import Support from './Support';
import Terms from './Terms';

export default function Footer() {
  const { onUIChange } = useAppContext();
  return (
    <Box className="mt-10">
      <Flex className="justify-center space-x-4 mt-4">
        <Card onClick={() => onUIChange('rules')}>Rules</Card>
        <DialogCustom
          title="Support"
          description={<Support />}
        />
        <DialogCustom
          title="Privacy"
          description={<Privacy />}
        />
        <DialogCustom
          title="Terms"
          description={<Terms />}
        />
      </Flex>
    </Box>
  );
}
