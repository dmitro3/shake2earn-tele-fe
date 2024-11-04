import { AssetConfig, AssetType } from 'hooks/common/useLoadAssets';

// Assets from public folder will be cached
export const AppAssets: AssetConfig[] = [
  {
    type: AssetType.IMG,
    name: 'background',
    src: '/assets/app/ocean-background.png',
  },
  {
    type: AssetType.IMG,
    name: 'chest-opened',
    src: '/assets/app/chest-opened.png',
  },
  {
    type: AssetType.IMG,
    name: 'chest-closed',
    src: '/assets/app/chest-closed.png',
  },
  {
    type: AssetType.AUDIO,
    name: 'soundtrack',
    src: '/assets/music/soundtrack.mp3',
  },
] as const;
