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
        <Box data-testid="bulk-actions-section" display="flex" alignItems="center" gap={2} mb={2}>
            <FormControlLabel
                control={
                    <Checkbox
                        data-testid="select-all"
                        checked={selectedTracks.length === tracksData?.tracks.length}
                        onChange={onToggleSelectAll}
                    />
                }
                label={`Selected ${selectedTracks.length}`}
            />
            {selectedTracks.length > 0 && (
                <Button
                    data-testid="bulk-delete-button"
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={onBulkDelete}
                >
                    Delete Selected
                </Button>
            )}
        </Box>
    )
);

export default BulkActionsSection;
