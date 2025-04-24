import { Grid } from '@mui/material';
import TrackItem from '../TrackItem/TrackItem.tsx';

const TracksListSection = ({
                               tracksData,
                               isSelectMode,
                               selectedTracks,
                               onSelectTrack,
                               onEditTrack,
                               onDeleteTrack
                           }) => (
    <Grid container spacing={3} data-testid="tracks-list">
        {tracksData?.tracks.map((track) => (
            <Grid item xs={12} key={track.id} data-testid={`track-item-${track.id}`}>
                <TrackItem
                    track={track}
                    onEdit={() => onEditTrack(track.id)}
                    onDelete={() => onDeleteTrack(track.id)}
                    isSelectMode={isSelectMode}
                    isSelected={selectedTracks.includes(track.id)}
                    onSelect={() => onSelectTrack(track.id)}
                    data-testid={{
                        title: `track-item-${track.id}-title`,
                        artist: `track-item-${track.id}-artist`,
                        edit: `edit-track-${track.id}`,
                        delete: `delete-track-${track.id}`,
                    }}
                />
            </Grid>
        ))}
    </Grid>
);

export default TracksListSection;

