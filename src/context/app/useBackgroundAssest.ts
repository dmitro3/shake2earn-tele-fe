import { useEffect, useRef, useState } from 'react';

import BackgroundImg from 'assets/app/ocean-background.png';
import BackgroundAudio from 'assets/music/soundtrack.mp3';

export interface BackgroundAssetsValue {
  imgRef: React.RefObject<HTMLImageElement>;
  audioRef: React.RefObject<HTMLAudioElement>;
  imgLoaded: boolean;
  audioLoaded: boolean;
}

export default function useBackgroundAssets(): BackgroundAssetsValue {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [imgLoaded, setImgLoaded] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgLoaded(true);
    img.onerror = () => setImgLoaded(true); // skip if error
    img.src = BackgroundImg;
    imgRef.current = img;
  }, []);

  useEffect(() => {
    const audio = new Audio(BackgroundAudio);
    audio.oncanplaythrough = () => setAudioLoaded(true);
    audio.onerror = () => setAudioLoaded(true); // skip if error
    audioRef.current = audio;
  }, []);

  return {
    imgRef,
    audioRef,
    imgLoaded,
    audioLoaded,
  };
}
