import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Checkbox, Avatar, IconButton, Box, Chip } from '@mui/material';
import { Edit, Delete, CloudUpload } from '@mui/icons-material';
import UploadModal from '../UploadModal/UploadModal.tsx';
import { getTemporaryLink } from '../../api/dropboxService.ts';
import {ITrackItem} from './Interface';


const TrackItem = ({ track, onEdit, onDelete, isSelectMode, isSelected, onSelect }: ITrackItem) => {
    const [showUpload, setShowUpload] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchAudioUrl = async () => {
            if (track.audioFile) {
                try {
                    const tempLink = await getTemporaryLink(`${track.id}.mp3`);
                    setAudioUrl(tempLink);
                } catch (err) {
                    console.error('Error fetching Dropbox audio link:', err);
                }
            }
        };

        fetchAudioUrl();
    }, [track.audioFile, track.id]);

    return (
        <Card
            data-testid={`track-item-${track.id}`}
            sx={{
                position: 'relative',
                opacity: track.audioFile ? 1 : 0.7,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                flexWrap: 'wrap',
            }}
        >
            {isSelectMode && (
                <Checkbox
                    checked={isSelected}
                    onChange={onSelect}
                    data-testid={`track-checkbox-${track.id}`}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                />
            )}
            <Box display='flex' alignItems='center' gap={2}>
                <Avatar src={track.coverImage || '/default-cover.png'} sx={{ width: 50, height: 50 }} />
                <Box>
                    <Typography
                        variant='subtitle1'
                        fontWeight={600}
                        data-testid={`track-item-${track.id}-title`}
                    >
                        {track.title}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        data-testid={`track-item-${track.id}-artist`}
                    >
                        {track.artist}
                    </Typography>
                    {track.album && (
                        <Typography variant='caption' color='text.secondary'>
                            {track.album}
                        </Typography>
                    )}
                    <Box mt={0.5} display='flex' flexWrap='wrap' gap={0.5}>
                        {track.genres?.map((genre) => (
                            <Chip
                                key={genre}
                                label={genre}
                                size='small'
                                data-testid={`track-genre-${track.id}-${genre}`}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                {audioUrl && (
                    <Box sx={{ flexGrow: 1, width: '50vw', minWidth: 200, marginRight: 10 }}>
                        <audio controls src={audioUrl} style={{ width: '100%' }} data-testid={`audio-player-${track.id}`}/>
                    </Box>
                )}

                {!isSelectMode && (
                    <Box display='flex' alignItems='center' gap={1}>
                        <IconButton onClick={onEdit} data-testid={`edit-track-${track.id}`}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={onDelete} data-testid={`delete-track-${track.id}`}>
                            <Delete />
                        </IconButton>
                        <Button
                            startIcon={<CloudUpload />}
                            onClick={() => setShowUpload(true)}
                            size='small'
                            data-testid={`upload-track-${track.id}`}
                        >
                            Upload
                        </Button>
                    </Box>
                )}
            </Box>
            <UploadModal
                open={showUpload}
                trackId={track.id}
                onClose={() => setShowUpload(false)}
                onUploadSuccess={async () => {
                    const tempLink = await getTemporaryLink(`${track.id}.mp3`);
                    setAudioUrl(tempLink);
                }}
            />
        </Card>
    );
};

export default TrackItem;


