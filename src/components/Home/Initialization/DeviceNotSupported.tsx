import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Box, Callout } from '@radix-ui/themes';
import React from 'react';

import PageContainer from 'components/Common/Page/PageContainer';

export default function DeviceNotSupported() {
  const message =
    "Your device doesn't support motion. Please use mobile device.";

  return (
    <PageContainer>
      <Box m="auto">
        <Callout.Root
          color="amber"
          className="bg-amber-3"
        >
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{message}</Callout.Text>
        </Callout.Root>
      </Box>
    </PageContainer>
  );
}
