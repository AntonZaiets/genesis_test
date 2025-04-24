import TracksListSection from "../../../../components/TrackList/TrackList.tsx";
import LoadingIndicator from "../../../../components/LoadingIndicator/LoadingIndicator.tsx";
import {Typography} from "@mui/material";
import CustomPagination from "../../../../components/CustomPagination/CustomPagination.tsx";

const Tracks = ({ state }) => (
    <>
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
    </>
);

export default Tracks;
