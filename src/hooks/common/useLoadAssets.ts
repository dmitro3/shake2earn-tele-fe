import { useCallback, useEffect, useRef, useState } from 'react';

export enum AssetType {
  IMG = 'IMG',
  AUDIO = 'AUDIO',
}

export interface AssetConfig {
  type: AssetType;
  name: string;
  src: string;
}

export type AssetData = { name: string } & (
  | {
      type: AssetType.IMG;
      value: HTMLImageElement;
    }
  | {
      type: AssetType.AUDIO;
      value: HTMLAudioElement;
    }
);

const loadAsset = (asset: AssetConfig) => {
  return new Promise<AssetData>((resolve) => {
    switch (asset.type) {
      case AssetType.IMG: {
        const img = new Image();
        const loadedAsset = {
          type: AssetType.IMG,
          name: asset.name,
          value: img,
        } as const;
        const onCompleted = () => resolve(loadedAsset);

        img.onload = onCompleted;
        img.onerror = onCompleted;
        img.src = asset.src;
        return;
      }

      case AssetType.AUDIO: {
        const audio = new Audio(asset.src);
        const loadedAsset = {
          type: AssetType.AUDIO,
          name: asset.name,
          value: audio,
        } as const;
        const onCompleted = () => resolve(loadedAsset);

        audio.oncanplaythrough = onCompleted;
        audio.onerror = onCompleted;
        return;
      }

      default: {
        throw new Error(`Invalid asset type: ${asset.type}`);
      }
    }
  });
};

export default function useLoadAssets(assets: AssetConfig[]): {
  loaded: boolean;
  assetsRef: React.RefObject<AssetData[]>;
} {
  const [loaded, setLoaded] = useState(false);
  const loadedAssetsRef = useRef<AssetData[]>([]);

  const loadAssets = useCallback(async () => {
    setLoaded(false);
    const loadedAssets = await Promise.all(assets.map(loadAsset));
    setLoaded(true);
    loadedAssetsRef.current = loadedAssets;
  }, [assets]);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  return { loaded, assetsRef: loadedAssetsRef };
}
