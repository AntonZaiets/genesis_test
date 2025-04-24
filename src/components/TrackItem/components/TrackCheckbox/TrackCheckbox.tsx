import React from 'react';
import { Checkbox } from '@mui/material';

const TrackCheckbox = ({ isSelectMode, isSelected, onSelect, trackId }: {
    isSelectMode: boolean;
    isSelected: boolean;
    onSelect: () => void;
    trackId: string;
}) => (
    isSelectMode ? (
        <Checkbox
            checked={isSelected}
            onChange={onSelect}
            data-testid={`track-checkbox-${trackId}`}
            sx={{ position: 'absolute', right: 8, top: 8 }}
        />
    ) : null
);

export default TrackCheckbox;
