import { Container, Paper, Typography } from '@mui/material';
import useTrackPageState from '../hooks/useTrackPageState.ts';
import HeaderSection from '../components/TrackPageHeader/TrackPageHeader.tsx';
import FiltersSection from '../components/TrackFilters/TrackFilters.tsx';
import TracksListSection from '../components/TrackList/TrackList.tsx';
import BulkActionsSection from '../components/BulkActionsSection/BulkActionsSection.tsx';
import TrackForm from '../components/TrackForm/TrackForm.tsx';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog.tsx';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator.tsx';
import CustomPagination from "../components/CustomPagination/CustomPagination.tsx";

const TrackPage = () => {
    const state = useTrackPageState();

    return (
        <Container
            data-testid="track-page-container"
            disableGutters
            maxWidth={false}
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Paper
                data-testid="track-page-main"
                sx={{
                flex: 1,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
                <HeaderSection
                    data-testid="header-section"
                    isSelectMode={state.isSelectMode}
                    onToggleSelectMode={() => state.setIsSelectMode(!state.isSelectMode)}
                    onOpenModal={() => state.setIsModalOpen(true)}
                />
                <FiltersSection
                    data-testid="filters-section"
                    searchTerm={state.searchTerm}
                    onSearchChange={state.setSearchTerm}
                    sort={state.sort}
                    onSortChange={state.handleSortChange}
                    filter={state.filter}
                    onFilterChange={state.handleFilterChange}
                    genres={state.genres}
                    tracksData={state.tracksData}
                />
                <BulkActionsSection
                    data-testid="bulk-actions-section"
                    isSelectMode={state.isSelectMode}
                    selectedTracks={state.selectedTracks}
                    onToggleSelectAll={() => state.setSelectedTracks((prev) =>
                        prev.length === state.tracksData?.tracks.length
                            ? []
                            : state.tracksData?.tracks.map((t) => t.id)
                    )}
                    onBulkDelete={() => state.setIsBulkConfirmOpen(true)}
                    tracksData={state.tracksData}
                />
                {state.isLoading ? (
                    <LoadingIndicator data-testid="loading-indicator"/>
                ) : state.isError ? (
                    <Typography data-testid="error-message" color="error">Error loading tracks</Typography>
                ) : state.tracksData?.tracks.length === 0 ? (
                    <Typography data-testid="no-tracks" variant="h6" align="center" sx={{ mt: 4 }}>
                        No Tracks Available
                    </Typography>
                ) : (
                    <>
                        <TracksListSection
                            data-testid="tracks-list-section"
                            tracksData={state.tracksData}
                            isSelectMode={state.isSelectMode}
                            selectedTracks={state.selectedTracks}
                            onSelectTrack={state.handleSelectTrack}
                            onEditTrack={(id) => {
                                state.setEditingTrackId(id);
                                state.setIsModalOpen(true);
                            }}
                            onDeleteTrack={(id) => state.setDeletingTrackId(id)}
                        />
                        <CustomPagination
                            data-testid='pagination'
                            currentPage={state.page}
                            totalPages={state.tracksData?.totalPages}
                            onPageChange={state.setPage}
                        />
                    </>
                )}
            </Paper>
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
        </Container>
    );
};

export default TrackPage;

