import { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormControlLabel,
    Checkbox,
    SelectChangeEvent
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchTracks,
    fetchGenres,
    deleteTrack,
    updateTrack,
    createTrack,
    Track
} from '../api/tracks';
import TrackItem from '../components/TrackItem';
import TrackForm from '../components/TrackForm';
import ConfirmDialog from '../components/ConfirmDialog';
import SearchBar from '../components/SearchBar';
import CustomPagination from '../components/CustomPagination.tsx';
import LoadingIndicator from '../components/LoadingIndicator';
import useDebounce from '../hooks/useDebounce';

const TrackPage = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [sort, setSort] = useState('title');
    const [filter, setFilter] = useState<Record<string, string>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTrackId, setEditingTrackId] = useState<string | null>(null);
    const [deletingTrackId, setDeletingTrackId] = useState<string | null>(null);
    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { data: genres } = useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres
    });

    const {
        data: tracksData,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['tracks', { page, limit, sort, filter, search: debouncedSearchTerm }],
        queryFn: () => fetchTracks(page, limit, sort, filter, debouncedSearchTerm)
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTrack,
        onSuccess: () => queryClient.invalidateQueries(['tracks'])
    });

    const deleteMultipleMutation = useMutation({
        mutationFn: async (ids: string[]) => {
            await Promise.all(ids.map(id => deleteTrack(+id)));
        },
        onSuccess: () => {
            setSelectedTracks([]);
            setIsSelectMode(false);
            queryClient.invalidateQueries(['tracks']);
        }
    });

    const handleSortChange = (e: SelectChangeEvent<string>) => {
        setSort(e.target.value);
        setPage(1);
    };

    const handleFilterChange = (type: string, value: string) => {
        setFilter(prev => ({ ...prev, [type]: value }));
        setPage(1);
    };

    const handleSelectTrack = (id: string) => {
        setSelectedTracks(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const createTrackMutation = useMutation({
        mutationFn: createTrack,
        onSuccess: () => queryClient.invalidateQueries(['tracks'])
    });

    const updateTrackMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: { title: string, artist: string, album?: string, genres: string[], coverImage?: string } }) =>
            updateTrack(id, data),
        onSuccess: () => queryClient.invalidateQueries(['tracks']),
    });
    return (
        <Container maxWidth={false} disableGutters sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={3}>
                    <Typography variant="h4" data-testid="tracks-header">
                        Music Tracks
                    </Typography>
                    <Box display="flex" gap={2}>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setIsModalOpen(true)}
                            data-testid="create-track-button"
                        >
                            Create Track
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<Delete />}
                            onClick={() => setIsSelectMode(!isSelectMode)}
                            data-testid="select-mode-toggle"
                        >
                            {isSelectMode ? 'Cancel' : 'Select'}
                        </Button>
                    </Box>
                </Box>

                <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        data-testid="search-input"
                    />

                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sort}
                            onChange={handleSortChange}
                            label="Sort By"
                            data-testid="sort-select"
                        >
                            <MenuItem value="title">Title</MenuItem>
                            <MenuItem value="artist">Artist</MenuItem>
                            <MenuItem value="album">Album</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Genre</InputLabel>
                        <Select
                            value={filter.genres || ''}
                            onChange={(e: SelectChangeEvent) =>
                                handleFilterChange('genre', e.target.value)
                            }
                            label="Genre"
                            data-testid="filter-genre"
                        >
                            <MenuItem value="">All</MenuItem>
                            {genres?.map(genre => (
                                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Artist</InputLabel>
                        <Select
                            value={filter.artist || ''}
                            onChange={(e: SelectChangeEvent) =>
                                handleFilterChange('artist', e.target.value)
                            }
                            label="Artist"
                            data-testid="filter-artist"
                        >
                            <MenuItem value="">All</MenuItem>
                            {[...new Set(tracksData?.tracks.map(t => t.artist))].map(artist => (
                                <MenuItem key={artist} value={artist}>{artist}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {isSelectMode && (
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedTracks.length === tracksData?.tracks.length}
                                    onChange={() =>
                                        setSelectedTracks((prev) =>
                                            prev.length === tracksData?.tracks.length
                                                ? []
                                                : tracksData?.tracks.map((t) => t.id)
                                        )
                                    }
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
                                onClick={() => setIsBulkConfirmOpen(true)}
                                data-testid="bulk-delete-button"
                            >
                                Delete Selected
                            </Button>
                        )}
                    </Box>
                )}

                {isLoading ? (
                    <LoadingIndicator />
                ) : isError ? (
                    <Typography color="error">Error loading tracks</Typography>
                ) : (
                    <>
                        <Grid container spacing={3}>

                            {tracksData?.tracks.map(track => (
                                <Grid item xs={12} key={track.id}>
                                    <TrackItem
                                        track={track}
                                        onEdit={() => {
                                            setEditingTrackId(track.id);
                                            setIsModalOpen(true);
                                        }}
                                        onDelete={() => setDeletingTrackId(track.id)}
                                        isSelectMode={isSelectMode}
                                        isSelected={selectedTracks.includes(track.id)}
                                        onSelect={() => handleSelectTrack(track.id)}
                                    />

                                </Grid>
                            ))}
                        </Grid>

                        <CustomPagination
                            currentPage={page}
                            onPageChange={setPage}
                            data-testid="pagination"
                        />
                    </>
                )}
            </Paper>

            <TrackForm
                open={isModalOpen || !!editingTrackId}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTrackId(null);
                }}
                onSubmit={(formData) => {
                    if (editingTrackId) {
                        updateTrackMutation.mutate({
                            id: editingTrackId,
                            data: {
                                title: formData.title,
                                artist: formData.artist,
                                album: formData.album,
                                genres: formData.genres,
                                coverImage: formData.coverImage,
                            }
                        });
                    } else {
                        createTrackMutation.mutate(formData);
                    }

                    setIsModalOpen(false);
                    setEditingTrackId(null);
                }}
                track={tracksData?.tracks.find(t => t.id === editingTrackId)}
                genres={genres || []}
            />

            <ConfirmDialog
                open={!!deletingTrackId}
                onClose={() => setDeletingTrackId(null)}
                onConfirm={() => {
                    deleteMutation.mutate(+deletingTrackId!);
                    setDeletingTrackId(null);
                }}
                title="Delete Track"
                message="Are you sure you want to delete this track?"
            />

            <ConfirmDialog
                open={isBulkConfirmOpen}
                onClose={() => setIsBulkConfirmOpen(false)}
                onConfirm={() => {
                    deleteMultipleMutation.mutate(selectedTracks);
                    setIsBulkConfirmOpen(false);
                }}
                title="Delete Selected Tracks"
                message={`Are you sure you want to delete ${selectedTracks.length} selected tracks?`}
            />
        </Container>
    );
};

export default TrackPage;


