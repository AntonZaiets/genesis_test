import { Box, Button, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

export const TrackPageHeader = ({ onCreate, isSelectMode, toggleSelectMode }) => (
    <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Music Tracks</Typography>
        <Box display="flex" gap={2}>
            <Button variant="contained" startIcon={<Add />} onClick={onCreate}>
                Create Track
            </Button>
            <Button variant="outlined" startIcon={<Delete />} onClick={toggleSelectMode}>
                {isSelectMode ? 'Cancel' : 'Select'}
            </Button>
        </Box>
    </Box>
);