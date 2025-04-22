import { Box, Slider, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import useAudioPlayer from '../hooks/useAudioPlayer.ts';
import {useEffect, useState} from "react";

interface AudioPlayerProps {
    trackId: string;
    audioUrl: string;
}

const AudioPlayer = ({ trackId, audioUrl }: AudioPlayerProps) => {
    const { isPlaying, progress, duration, togglePlay, seek } = useAudioPlayer(audioUrl);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (audioUrl) {
            setVolume(1);
        }
    }, [audioUrl]);

    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        const newVolume = Array.isArray(newValue) ? newValue[0] : newValue;
        setVolume(newVolume / 100);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            gap={2}
            data-testid={`audio-player-${trackId}`}
        >
            <IconButton onClick={togglePlay}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            <Slider
                value={progress}
                onChange={(_, newValue) => seek(newValue as number)}
                sx={{ flexGrow: 1 }}
            />

            <Box display="flex" alignItems="center" width={120}>
                <IconButton onClick={toggleMute}>
                    {isMuted || volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </IconButton>
                <Slider
                    value={isMuted ? 0 : volume * 100}
                    onChange={handleVolumeChange}
                    sx={{ width: 80 }}
                />
            </Box>
        </Box>
    );
};

export default AudioPlayer;
