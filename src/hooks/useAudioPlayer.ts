import { useState, useRef, useEffect } from 'react';

const useAudioPlayer = (audioUrl: string) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioUrl) return;

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        const updateProgress = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
        };
    }, [audioUrl]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            if ("pause" in audioRef.current) {
                audioRef.current.pause();
            }
        } else {
            if ("play" in audioRef.current) {
                audioRef.current.play();
            }
        }
        setIsPlaying(!isPlaying);
    };

    const seek = (percent: number) => {
        if (!audioRef.current || !duration) return;

        const newTime = (percent / 100) * duration;
        if ("currentTime" in audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
        setProgress(percent);
    };

    return {
        isPlaying,
        progress,
        duration,
        togglePlay,
        seek,
    };
};

export default useAudioPlayer;