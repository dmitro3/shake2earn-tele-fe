import { Box, Button, Flex, FlexProps } from '@radix-ui/themes';
import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';
import { Buffer } from 'buffer';
import config from 'configs/env';
import crypto from 'crypto';

import { useAppContext } from 'context/app';
import { useTonConnect } from 'hooks/ton/useTonConnect';

type TonWalletProps = FlexProps;

export default function TonWallet(props: FlexProps) {
  const { telegramUserData } = useAppContext();
  const { network } = useTonConnect();

  function sortObjectKeys(obj: any, secretKey: string) {
    const keysToFilter = [
      'orderModel',
      'sign',
      'paymentNetworks',
      'payType',
      'expiredTime',
      'customParam',
      'callbackURL',
      'redirectURL',
    ];

    const sortedString = Object.keys(obj)
      .sort()
      .filter((key) => obj[key] !== '' && !keysToFilter.includes(key))
      .map((key) => `${key}=${obj[key]}`)
      .join('&');

    return `${sortedString}&key=${secretKey}`;
  }

  function hashWithSHA512(aValue: string) {
    aValue = aValue.trim();
    let buffer;
    try {
      buffer = Buffer.from(aValue, 'utf8');
    } catch (error) {
      buffer = Buffer.from(aValue);
    }

    const hash = crypto.createHash('sha512');
    hash.update(new Uint8Array(buffer));
    return toHex(hash.digest());
  }

  function toHex(input: any) {
    if (!input) return null;
    return input.toString('hex').toUpperCase();
  }

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
      tgModel: 'MINIAPP',
      userId: telegramUserData?.id,
    };
    const secret = config.key;

    const signContent = sortObjectKeys(resSign, secret);
    console.log('signContent:', signContent);

    const signature = hashWithSHA512(signContent);
    console.log('Signature:', signature);

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
          sign: signature,
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
