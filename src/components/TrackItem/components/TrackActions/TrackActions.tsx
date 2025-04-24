import React from 'react';
import {Box, IconButton, Button, Checkbox} from '@mui/material';
import { Edit, Delete, CloudUpload } from '@mui/icons-material';

const TrackActions = ({
                          onEdit,
                          onDelete,
                          onSelect,
                          isSelectMode,
                          isSelected,
                          trackId,
                          setShowUpload
                      }: {
    onEdit: () => void;
    onDelete: () => void;
    onSelect: () => void;
    isSelectMode: boolean;
    isSelected: boolean;
    trackId: string;
    setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {isSelectMode && (
            <Checkbox
                checked={isSelected}
                onChange={onSelect}
                data-testid={`track-checkbox-${trackId}`}
                sx={{ position: 'absolute', right: 8, top: 8 }}
            />
        )}
        {!isSelectMode && (
            <Box display="flex" alignItems="center" gap={1}>
                <IconButton onClick={onEdit} data-testid={`edit-track-${trackId}`}>
                    <Edit />
                </IconButton>
                <IconButton onClick={onDelete} data-testid={`delete-track-${trackId}`}>
                    <Delete />
                </IconButton>
                <Button
                    startIcon={<CloudUpload />}
                    onClick={() => setShowUpload(true)}
                    size="small"
                    data-testid={`upload-track-${trackId}`}
                >
                    Upload
                </Button>
            </Box>
        )}
    </Box>
);

export default TrackActions;
