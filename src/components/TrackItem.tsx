import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    CardActions,
    Checkbox,
    Avatar,
    IconButton,
    Box,
    Chip,
} from '@mui/material';
import { Edit, Delete, CloudUpload } from '@mui/icons-material';
import UploadModal from './UploadModal';
import AudioPlayer from './AudioPlayer';
import { Track } from '../api/tracks';

interface TrackItemProps {
    track: Track;
    onEdit: () => void;
    onDelete: () => void;
    isSelectMode: boolean;
    isSelected: boolean;
    onSelect: () => void;
}


const TrackItem = ({track, onEdit, onDelete, isSelectMode, isSelected, onSelect,}: TrackItemProps) => {
    const [showUpload, setShowUpload] = useState(false);

    return (
        <Card
            data-testid={`track-item-${track.id}`}
            sx={{ position: 'relative', opacity: track.audioUrl ? 1 : 0.7 }}
        >
            {isSelectMode && (
                <Checkbox
                    checked={isSelected}
                    onChange={onSelect}
                    data-testid={`track-checkbox-${track.id}`}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                />
            )}

            <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar
                        src={track.coverImage || '/default-cover.png'}
                        sx={{ width: 60, height: 60 }}
                    />
                    <Box>
                        <Typography
                            variant="h6"
                            data-testid={`track-item-${track.id}-title`}
                        >
                            {track.title}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            data-testid={`track-item-${track.id}-artist`}
                        >
                            {track.artist}
                        </Typography>
                        {track.album && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                data-testid={`track-item-${track.id}-album`}
                            >
                                {track.album}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {track.genres?.map(genre => (
                    <Chip
                        key={genre}
                        label={genre}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                        data-testid={`track-genre-${track.id}-${genre}`}
                    />
                ))}

                {/*{track.audioUrl && (
                    <Box mt={2}>
                        <AudioPlayer
                            trackId={track.id.toString()}
                            audioUrl={'1745259940341.mp3'}
                        />
                    </Box>
                )}*/}
                <Box mt={2}>
                    <AudioPlayer
                        trackId={track.id.toString()}
                        audioUrl={'1745259940341.mp3'}
                    />
                </Box>
            </CardContent>

            {!isSelectMode && (
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton
                        onClick={onEdit}
                        data-testid={`edit-track-${track.id}`}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        onClick={onDelete}
                        data-testid={`delete-track-${track.id}`}
                    >
                        <Delete />
                    </IconButton>
                    <Button
                        startIcon={<CloudUpload />}
                        onClick={() => setShowUpload(true)}
                        data-testid={`upload-track-${track.id}`}
                    >
                        Upload
                    </Button>
                </CardActions>
            )}

            <UploadModal
                open={showUpload}
                trackId={track.id}
                onClose={() => setShowUpload(false)}
            />
        </Card>
    );
};

export default TrackItem;
