import { useCallback, useEffect, useRef, useState } from 'react';

import { useAppContext } from 'context/app';

interface UsePlayAppBackgroundSoundProps {
  defaultPlay?: boolean;
}

export function usePlayAppBackgroundSound({
  defaultPlay = true,
}: UsePlayAppBackgroundSoundProps) {
  const {
    backgroundAssets: { audioRef },
  } = useAppContext();

  const [isPlaying, setIsPlaying] = useState(defaultPlay);
  const soundtrackRef = useRef<HTMLAudioElement>();

  const onClickPlay = useCallback(() => {
    setIsPlaying((prevIsPlaying) => {
      const newIsPlaying = !prevIsPlaying;
      if (newIsPlaying) {
        soundtrackRef.current?.play();
      } else {
        soundtrackRef.current?.pause();
      }
      return newIsPlaying;
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !defaultPlay) {
      return;
    }

    audio.play();
    return () => {
      audio.pause();
    };
  }, [audioRef, defaultPlay]);

  return { isPlaying, onClickMusicButton };
}
