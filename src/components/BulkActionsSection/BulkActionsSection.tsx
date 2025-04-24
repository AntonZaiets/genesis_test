import { Box, Button, FormControlLabel, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';

const BulkActionsSection = ({
                                isSelectMode,
                                selectedTracks,
                                onToggleSelectAll,
                                onBulkDelete,
                                tracksData
                            }) => (
    isSelectMode && (
        <Box display="flex" alignItems="center" gap={2} mb={2}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={selectedTracks.length === tracksData?.tracks.length}
                        onChange={onToggleSelectAll}
                        data-testid="select-all"
                    />
                }
                label={`Selected ${selectedTracks.length}`}
            />
            {selectedTracks.length > 0 && (
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={onBulkDelete}
                    data-testid="bulk-delete-button"
                >
                    Delete Selected
                </Button>
            )}
        </Box>
    )
);

export default BulkActionsSection;
