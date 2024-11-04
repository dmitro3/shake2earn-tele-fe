import { AssetConfig, AssetType } from 'hooks/common/useLoadAssets';

// Assets from public folder will be cached
export const AppAssets: AssetConfig[] = [
  {
    type: AssetType.IMG,
    name: 'background',
    src: '/media/app/ocean-background.png',
  },
  {
    type: AssetType.IMG,
    name: 'chest-opened',
    src: '/media/app/chest-opened.png',
  },
  {
    type: AssetType.IMG,
    name: 'chest-closed',
    src: '/media/app/chest-closed.png',
  },
  {
    type: AssetType.AUDIO,
    name: 'soundtrack',
    src: '/media/music/soundtrack.mp3',
  },
];
