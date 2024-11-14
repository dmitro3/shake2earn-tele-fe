import { Box, Button, Flex, FlexProps } from '@radix-ui/themes';
import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';
import config from 'configs/env';

import { useAppContext } from 'context/app';
import { useTonConnect } from 'hooks/ton/useTonConnect';

type TonWalletProps = FlexProps;

export default function TonWallet(props: FlexProps) {
  const { telegramUserData } = useAppContext();
  const { network } = useTonConnect();

  const handleAeonPayment = async () => {
    const resSign = {
      appId: config.aeonAppId,
      callbackURL: 'https://crypto-payment-sbx.aeon.cc/crypto/bot/cpCallback',
      redirectURL: 'https://shake2earn.blockey.co/',
      expiredTime: '999999',
      merchantOrderNo: '17243134568514',
      orderAmount: '0.1',
      orderModel: 'ORDER',
      payCurrency: 'USD',
      sign: 'TEST000001',
      tgModel: 'MINIAPP',
      userId: telegramUserData?.id,
    };

    const sign = Object.entries(resSign)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    console.log('sign', sign);
    const responseAeon = await fetch(
      'https://sbx-crypto-payment-api.aeon.xyz/open/api/tg/payment/V2',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...resSign,
          sign,
        }),
      },
    );
  };

  return (
    <Flex
      {...props}
      align="center"
    >
      <TonConnectButton />
      <Button onClick={handleAeonPayment}>AEON Payment</Button>
      {/* <Button>
        {!network && 'N/A'}
        {network && (network === CHAIN.MAINNET ? 'mainnet' : 'testnet')}
      </Button> */}
    </Flex>
  );
}
