import WebApp from '@twa-dev/sdk';

declare global {
  interface Window {
    Telegram: typeof WebApp;
  }
}
