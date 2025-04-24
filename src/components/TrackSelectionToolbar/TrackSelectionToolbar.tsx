import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { Delete } from '@mui/icons-material';

const TrackSelectionToolbar = ({ selectedCount, allSelected, onToggleSelectAll, onDelete }) => (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
        <FormControlLabel
            control={<Checkbox checked={allSelected} onChange={onToggleSelectAll} />}
            label={`Selected ${selectedCount}`}
        />
        {selectedCount > 0 && (
            <Button variant="contained" color="error" startIcon={<Delete />} onClick={onDelete}>
                Delete Selected
            </Button>
        )}
    </Box>
);