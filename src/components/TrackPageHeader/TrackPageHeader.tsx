import { Box, Button, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const HeaderSection = ({ isSelectMode, onToggleSelectMode, onOpenModal }) => (
    <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" data-testid="tracks-header">
            Music Tracks
        </Typography>
        <Box display="flex" gap={2}>
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={onOpenModal}
                data-testid="create-track-button"
            >
                Create Track
            </Button>
            <Button
                variant="outlined"
                startIcon={<Delete />}
                onClick={onToggleSelectMode}
                data-testid="select-mode-toggle"
            >
                {isSelectMode ? 'Cancel' : 'Select'}
            </Button>
        </Box>
    </Box>
);

export default HeaderSection;
