import React from 'react';
import { Box, Typography, Chip, Avatar } from '@mui/material';
import { ITrack } from '../../../../types/types.ts';

const TrackInfo = ({ track }: { track: ITrack }) => (
    <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={track.coverImage || '/default-cover.png'} sx={{ width: 50, height: 50 }} />
        <Box>
            <Typography variant="subtitle1" fontWeight={600} data-testid={`track-item-${track.id}-title`}>
                {track.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" data-testid={`track-item-${track.id}-artist`}>
                {track.artist}
            </Typography>
            {track.album && (
                <Typography variant="caption" color="text.secondary">
                    {track.album}
                </Typography>
            )}
            <Box mt={0.5} display="flex" flexWrap="wrap" gap={0.5}>
                {track.genres?.map((genre) => (
                    <Chip key={genre} label={genre} size="small" data-testid={`track-genre-${track.id}-${genre}`} />
                ))}
            </Box>
        </Box>
    </Box>
);

export default TrackInfo;
