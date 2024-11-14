import { useCallback, useEffect, useRef, useState } from 'react';

export function usePlayAudio(
  src?: string,
  { defaultPlay, loop }: { defaultPlay?: boolean; loop?: boolean } = {},
) {
  const audioRef = useRef<HTMLAudioElement>(new Audio(src));
  const [isPlaying, setIsPlaying] = useState(defaultPlay ?? false);

  const changePlayAudio = useCallback((play: boolean) => {
    if (play) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    setIsPlaying(play);
  }, []);

  useEffect(() => {
    if (!src) {
      return;
    }

    audioRef.current = new Audio(src);
    if (defaultPlay) {
      audioRef.current.play();
    }
    return () => {
      audioRef.current.pause();
    };
  }, [defaultPlay, src, loop]);

  return { isPlaying, changePlayAudio, audioRef };
}
