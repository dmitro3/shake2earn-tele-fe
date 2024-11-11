import { AssetConfig, AssetType } from 'utils/common/assets';

const withViteBaseUrlWrapper = (url: string) => {
  return import.meta.env.BASE_URL ? url : `${import.meta.env.BASE_URL}/${url}`;
};

export const AppAssetSrc = {
  WELCOME_BG: 'assets/app/ocean-background-welcome.jpg',
  BG: 'assets/app/ocean-background.png',
  COIN: 'assets/app/coin.png',
  MAP_PAPER: 'assets/app/map-paper.png',
  PHONE: 'assets/app/phone.svg',
  CHEST_OPENED: 'assets/app/chest-opened.png',
  CHEST_CLOSED: 'assets/app/chest-closed.png',
  SOUNDTRACK: 'assets/music/soundtrack.mp3',
};

// Assets from public folder will be cached
export const AppAssets: AssetConfig[] = [
  {
    type: AssetType.IMG,
    name: 'background-welcome',
    src: withViteBaseUrlWrapper(AppAssetSrc.WELCOME_BG),
  },
  {
    type: AssetType.IMG,
    name: 'background',
    src: withViteBaseUrlWrapper(AppAssetSrc.BG),
  },
  {
    type: AssetType.IMG,
    name: 'coin',
    src: withViteBaseUrlWrapper(AppAssetSrc.COIN),
  },
  {
    type: AssetType.IMG,
    name: 'map-paper',
    src: withViteBaseUrlWrapper(AppAssetSrc.MAP_PAPER),
  },
  {
    type: AssetType.IMG,
    name: 'phone',
    src: withViteBaseUrlWrapper(AppAssetSrc.PHONE),
  },
  {
    type: AssetType.IMG,
    name: 'chest-opened',
    src: withViteBaseUrlWrapper(AppAssetSrc.CHEST_OPENED),
  },
  {
    type: AssetType.IMG,
    name: 'chest-closed',
    src: withViteBaseUrlWrapper(AppAssetSrc.CHEST_CLOSED),
  },
  {
    type: AssetType.AUDIO,
    name: 'soundtrack',
    src: withViteBaseUrlWrapper(AppAssetSrc.SOUNDTRACK),
  },
];
