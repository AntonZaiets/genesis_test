import TrackForm from '../../../../components/TrackForm/TrackForm.tsx';
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog.tsx';
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator.tsx';

const TrackModals = ({ state }) => (
    <>
        {state.isModalOpen && (
            <TrackForm
                data-testid="track-form-modal"
                open={state.isModalOpen || !!state.editingTrackId}
                onClose={() => {
                    state.setIsModalOpen(false);
                    state.setEditingTrackId(null);
                }}
                onSubmit={(formData) => {
                    if (state.editingTrackId) {
                        state.updateTrackMutation.mutate({
                            id: state.editingTrackId,
                            data: formData,
                        });
                    } else {
                        state.createTrackMutation.mutate(formData);
                    }
                    state.setIsModalOpen(false);
                    state.setEditingTrackId(null);
                }}
                track={state.tracksData?.tracks.find(t => t.id === state.editingTrackId)}
                genres={state.genres || []}
            />
        )}
        <ConfirmDialog
            data-testid="confirm-delete-dialog"
            open={!!state.deletingTrackId}
            onClose={() => state.setDeletingTrackId(null)}
            onConfirm={() => {
                state.deleteMutation.mutate(+state.deletingTrackId!);
                state.setDeletingTrackId(null);
            }}
            title="Delete Track"
            message="Are you sure you want to delete this track?"
        />
        <ConfirmDialog
            data-testid="confirm-bulk-delete-dialog"
            open={state.isBulkConfirmOpen}
            onClose={() => state.setIsBulkConfirmOpen(false)}
            onConfirm={() => state.deleteMultipleMutation.mutate(state.selectedTracks)}
            title="Delete Selected Tracks"
            message="Are you sure you want to delete the selected tracks?"
        />
        {state.isLoading && <LoadingIndicator />}
    </>
);

export default TrackModals;
