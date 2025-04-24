/*
import React, { useEffect, useState } from 'react';
import { fetchTracks, deleteTrack } from '../../api/tracks.ts';
import TrackItem from '../TrackItem/TrackItem.tsx';
import { ITrack } from '../../types/types.ts';

const TrackList: React.FC = () => {
    const [tracks, setTracks] = useState<ITrack[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadTracks = async () => {
            setLoading(true);
            try {
                const data = await fetchTracks(1, 10);
                console.log('Fetched tracks:', data);
                setTracks(data.tracks || []);
            } catch (error) {
                console.error('Failed to fetch tracks:', error);
                setTracks([]);
            } finally {
                setLoading(false);
            }
        };

        loadTracks();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteTrack(+id);
            setTracks(prevTracks => prevTracks.filter(track => track.id !== id));
        } catch (error) {
            console.error('Failed to delete track:', error);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2 data-testid='tracks-header'>Track List</h2>
                    <div>
                        {tracks && tracks.length > 0 ? (
                            tracks.map(track => (
                                <TrackItem
                                    key={track.id}
                                    track={track}
                                    onDelete={() => handleDelete(track.id)}
                                />
                            ))
                        ) : (
                            <p>No tracks available.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackList;
*/
import { Grid } from '@mui/material';
import TrackItem from '../TrackItem/TrackItem';

const TrackList = ({ tracks, onEdit, onDelete, isSelectMode, selectedTracks, onSelect }) => (
    <Grid container spacing={3}>
        {tracks.map((track) => (
            <Grid item xs={12} key={track.id}>
                <TrackItem
                    track={track}
                    onEdit={() => onEdit(track.id)}
                    onDelete={() => onDelete(track.id)}
                    isSelectMode={isSelectMode}
                    isSelected={selectedTracks.includes(track.id)}
                    onSelect={() => onSelect(track.id)}
                />
            </Grid>
        ))}
    </Grid>
);
