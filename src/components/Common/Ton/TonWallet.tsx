import { Box, Button, Flex, FlexProps } from '@radix-ui/themes';
import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';

import { useAppContext } from 'context/app';
import { useTonConnect } from 'hooks/ton/useTonConnect';

type TonWalletProps = FlexProps;

export default function TonWallet(props: FlexProps) {
  const { telegramUserData } = useAppContext();
  const { network } = useTonConnect();

  const handleAeonPayment = async () => {
    const resSign = {
      appId: '6fdbaac29eb94bc6b12345ad705e9293',
      callbackURL: 'https://crypto-payment-sbx.aeon.cc/crypto/bot/cpCallback',
      expiredTime: '999999',
      merchantOrderNo: '17243134568514',
      orderAmount: '0.1',
      orderModel: 'ORDER',
      payCurrency: 'USD',
      sign: 'TEST000001',
      tgModel: 'MINIAPP',
      userId: telegramUserData?.id,
    };

    const responseAeon = await fetch(
      'https://sbx-crypto-payment-api.aeon.xyz/open/api/tg/payment/V2',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resSign),
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
