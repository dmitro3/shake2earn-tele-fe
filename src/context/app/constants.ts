import { AssetConfig, AssetType } from 'utils/common/assets';

const withViteBaseUrlWrapper = (url: string) => {
  return import.meta.env.BASE_URL ? url : `${import.meta.env.BASE_URL}/${url}`;
};

// Assets from public folder will be cached
export const AppAssets: AssetConfig[] = [
  {
    type: AssetType.IMG,
    name: 'background-welcome',
    src: withViteBaseUrlWrapper('assets/app/ocean-background-welcome.jpg'),
  },
  {
    type: AssetType.IMG,
    name: 'background',
    src: withViteBaseUrlWrapper('assets/app/ocean-background.png'),
  },
  {
    type: AssetType.IMG,
    name: 'chest-opened',
    src: withViteBaseUrlWrapper('assets/app/chest-opened.png'),
  },
  {
    type: AssetType.IMG,
    name: 'chest-closed',
    src: withViteBaseUrlWrapper('assets/app/chest-closed.png'),
  },
  {
    type: AssetType.AUDIO,
    name: 'soundtrack',
    src: withViteBaseUrlWrapper('assets/music/soundtrack.mp3'),
  },
];
