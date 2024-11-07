import { Box, Card, Flex } from '@radix-ui/themes';

import DialogCustom from './DialogCustom';
import Privacy from './Privacy';
import Rules from './Rules';
import Support from './Support';
import Terms from './Terms';

export default function Footer() {
  return (
    <Box className="mt-10">
      <Flex className="justify-center space-x-4 mt-4">
        <DialogCustom
          title="Rules"
          description={<Rules />}
        />
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
