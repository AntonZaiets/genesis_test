import React from 'react';
import { Box } from '@mui/material';

const TrackAudioPlayer = ({ audioUrl, trackId }: { audioUrl: string | null; trackId: string }) => (
    audioUrl ? (
        <Box sx={{ flexGrow: 1, width: '50vw', minWidth: 200, marginRight: 10 }}>
            <audio controls src={audioUrl} style={{ width: '100%' }} data-testid={`audio-player-${trackId}`} />
        </Box>
    ) : null
);

export default TrackAudioPlayer;
