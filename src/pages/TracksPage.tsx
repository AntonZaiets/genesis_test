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


















/*import { useState } from 'react';
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
import { fetchTracks, fetchGenres, deleteTrack, updateTrack, createTrack } from '../api/tracks';
import TrackItem from '../components/TrackItem/TrackItem.tsx';
import TrackForm from '../components/TrackForm/TrackForm.tsx';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog.tsx';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import CustomPagination from '../components/CustomPagination/CustomPagination.tsx';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator.tsx';
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
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Paper
                sx={{
                    flex: 1,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}
            >
                <Box display='flex' justifyContent='space-between' mb={3}>
                    <Typography variant='h4' data-testid='tracks-header'>
                        Music Tracks
                    </Typography>
                    <Box display='flex' gap={2}>
                        <Button
                            variant='contained'
                            startIcon={<Add />}
                            onClick={() => setIsModalOpen(true)}
                            data-testid='create-track-button'
                        >
                            Create Track
                        </Button>
                        <Button
                            variant='outlined'
                            startIcon={<Delete />}
                            onClick={() => setIsSelectMode(!isSelectMode)}
                            data-testid='select-mode-toggle'
                        >
                            {isSelectMode ? 'Cancel' : 'Select'}
                        </Button>
                    </Box>
                </Box>

                <Box display='flex' gap={2} mb={3} flexWrap='wrap'>
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        data-testid='search-input'
                    />

                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sort}
                            onChange={handleSortChange}
                            label='Sort By'
                            data-testid='sort-select'
                        >
                            <MenuItem value='title'>Title</MenuItem>
                            <MenuItem value='artist'>Artist</MenuItem>
                            <MenuItem value='album'>Album</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id='genre-select-label'>Genre</InputLabel>
                        <Select
                            labelId='genre-select-label'
                            value={filter.genre || 'All'}
                            onChange={(e: SelectChangeEvent) => {
                                const value = e.target.value;
                                if (value === 'All') {
                                    handleFilterChange('genre', '');
                                } else {
                                    handleFilterChange('genre', value);
                                }
                            }}
                            label='Genre'
                            data-testid='filter-genre'
                        >
                            <MenuItem value='All'>All</MenuItem>
                            {genres?.map(genre => (
                                <MenuItem key={genre} value={genre}>
                                    {genre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id='artist-select-label'>Artist</InputLabel>
                        <Select
                            labelId='artist-select-label'
                            value={filter.artist || 'All'}
                            onChange={(e: SelectChangeEvent) => {
                                const value = e.target.value;
                                if (value === 'All') {
                                    handleFilterChange('artist', '');
                                } else {
                                    handleFilterChange('artist', value);
                                }
                            }}
                            label='Artist'
                            data-testid='filter-artist'
                        >
                            <MenuItem value='All'>All</MenuItem>
                            {[...new Set(tracksData?.tracks.map(t => t.artist))].map(artist => (
                                <MenuItem key={artist} value={artist}>{artist}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {isSelectMode && (
                    <Box display='flex' alignItems='center' gap={2} mb={2}>
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
                                    data-testid='select-all'
                                />
                            }
                            label={`Selected ${selectedTracks.length}`}
                        />
                        {selectedTracks.length > 0 && (
                            <Button
                                variant='contained'
                                color='error'
                                startIcon={<Delete />}
                                onClick={() => setIsBulkConfirmOpen(true)}
                                data-testid='bulk-delete-button'
                            >
                                Delete Selected
                            </Button>
                        )}
                    </Box>
                )}

                {isLoading ? (
                    <LoadingIndicator />
                ) : isError ? (
                    <Typography color='error'>Error loading tracks</Typography>
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
                            data-testid='pagination'
                            currentPage={page}
                            totalPages={tracksData?.totalPages}
                            onPageChange={setPage}
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
                title='Delete Track'
                message='Are you sure you want to delete this track?'
            />

            <ConfirmDialog
                open={isBulkConfirmOpen}
                onClose={() => setIsBulkConfirmOpen(false)}
                onConfirm={() => {
                    deleteMultipleMutation.mutate(selectedTracks);
                    setIsBulkConfirmOpen(false);
                }}
                title='Delete Selected Tracks'
                message={`Are you sure you want to delete ${selectedTracks.length} selected tracks?`}
            />
        </Container>
    );
};

export default TrackPage;*/

/*import { Container, Paper, Typography } from '@mui/material';
import { useTrackPageState } from '../hooks/useTrackPageState';
import TrackPageHeader from '../components/TrackPageHeader/TrackPageHeader';
import TrackFilters from '../components/TrackFilters/TrackFilters.tsx';
import TrackSelectionToolbar from '../components/TrackSelectionToolbar/TrackSelectionToolbar.tsx';
import TrackList from '../components/TrackList/TrackList.tsx';
import CustomPagination from '../components/CustomPagination/CustomPagination.tsx';
import TrackForm from '../components/TrackForm/TrackForm.tsx';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog.tsx';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator.tsx';

const TrackPage = () => {
    const state = useTrackPageState();

    return (
        <Container disableGutters maxWidth={false} sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                <TrackPageHeader
                    isSelectMode={state.isSelectMode}
                    onToggleSelectMode={state.toggleSelectMode}
                    onOpenModal={state.openCreateModal}
                />

                <TrackFilters
                    searchTerm={state.searchTerm}
                    onSearchChange={state.setSearchTerm}
                    sort={state.sort}
                    onSortChange={state.setSort}
                    genres={state.genres}
                    filter={state.filter}
                    onFilterChange={state.handleFilterChange}
                    artists={state.artists}
                />

                {state.isSelectMode && (
                    <TrackSelectionToolbar
                        selectedCount={state.selectedTracks.length}
                        allSelected={state.areAllSelected}
                        onToggleAll={state.toggleSelectAll}
                        onDeleteSelected={state.openBulkDeleteConfirm}
                    />
                )}

                {state.isLoading ? (
                    <LoadingIndicator />
                ) : state.isError ? (
                    <Typography color='error'>Error loading tracks</Typography>
                ) : (
                    <>
                        <TrackList
                            tracks={state.tracks}
                            isSelectMode={state.isSelectMode}
                            selectedTracks={state.selectedTracks}
                            onEdit={state.openEditModal}
                            onDelete={state.confirmDelete}
                            onSelect={state.handleSelect}
                        />
                        <CustomPagination
                            currentPage={state.page}
                            totalPages={state.totalPages}
                            onPageChange={state.setPage}
                        />
                    </>
                )}
            </Paper>

            <TrackForm
                open={state.isFormOpen}
                onClose={state.closeForm}
                onSubmit={state.handleSubmit}
                track={state.editingTrack}
                genres={state.genres}
            />

            <ConfirmDialog
                open={state.isSingleDeleteOpen}
                onClose={state.closeSingleDelete}
                onConfirm={state.handleSingleDelete}
                title="Delete Track"
                message="Are you sure you want to delete this track?"
            />

            <ConfirmDialog
                open={state.isBulkDeleteOpen}
                onClose={state.closeBulkDelete}
                onConfirm={state.handleBulkDelete}
                title="Delete Selected Tracks"
                message={`Are you sure you want to delete ${state.selectedTracks.length} selected tracks?`}
            />
        </Container>
    );
};

export default TrackPage;*/



//MAIN

/*
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
import TrackItem from '../components/TrackItem/TrackItem.tsx';
import TrackForm from '../components/TrackForm/TrackForm.tsx';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog.tsx';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import CustomPagination from '../components/CustomPagination/CustomPagination.tsx';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator.tsx';
import useTrackPageState from "../hooks/useTrackPageState.ts";

const TrackPage = () => {

    const state = useTrackPageState();

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Paper
                sx={{
                    flex: 1,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}
            >
                <Box display='flex' justifyContent='space-between' mb={3}>
                    <Typography variant='h4' data-testid='tracks-header'>
                        Music Tracks
                    </Typography>
                    <Box display='flex' gap={2}>
                        <Button
                            variant='contained'
                            startIcon={<Add />}
                            onClick={() => state.setIsModalOpen(true)}
                            data-testid='create-track-button'
                        >
                            Create Track
                        </Button>
                        <Button
                            variant='outlined'
                            startIcon={<Delete />}
                            onClick={() => state.setIsSelectMode(!state.isSelectMode)}
                            data-testid='select-mode-toggle'
                        >
                            {state.isSelectMode ? 'Cancel' : 'Select'}
                        </Button>
                    </Box>
                </Box>

                <Box display='flex' gap={2} mb={3} flexWrap='wrap'>
                    <SearchBar
                        value={state.searchTerm}
                        onChange={state.setSearchTerm}
                        data-testid='search-input'
                    />

                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={state.sort}
                            onChange={state.handleSortChange}
                            label='Sort By'
                            data-testid='sort-select'
                        >
                            <MenuItem value='title'>Title</MenuItem>
                            <MenuItem value='artist'>Artist</MenuItem>
                            <MenuItem value='album'>Album</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id='genre-select-label'>Genre</InputLabel>
                        <Select
                            labelId='genre-select-label'
                            value={state.filter.genre || 'All'}
                            onChange={(e: SelectChangeEvent) => {
                                const value = e.target.value;
                                if (value === 'All') {
                                    state.handleFilterChange('genre', '');
                                } else {
                                    state.handleFilterChange('genre', value);
                                }
                            }}
                            label='Genre'
                            data-testid='filter-genre'
                        >
                            <MenuItem value='All'>All</MenuItem>
                            {state.genres?.map(genre => (
                                <MenuItem key={genre} value={genre}>
                                    {genre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id='artist-select-label'>Artist</InputLabel>
                        <Select
                            labelId='artist-select-label'
                            value={state.filter.artist || 'All'}
                            onChange={(e: SelectChangeEvent) => {
                                const value = e.target.value;
                                if (value === 'All') {
                                    state.handleFilterChange('artist', '');
                                } else {
                                    state.handleFilterChange('artist', value);
                                }
                            }}
                            label='Artist'
                            data-testid='filter-artist'
                        >
                            <MenuItem value='All'>All</MenuItem>
                            {[...new Set(state.tracksData?.tracks.map(t => t.artist))].map(artist => (
                                <MenuItem key={artist} value={artist}>{artist}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {state.isSelectMode && (
                    <Box display='flex' alignItems='center' gap={2} mb={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.selectedTracks.length === state.tracksData?.tracks.length}
                                    onChange={() =>
                                        state.setSelectedTracks((prev) =>
                                            prev.length === state.tracksData?.tracks.length
                                                ? []
                                                : state.tracksData?.tracks.map((t) => t.id)
                                        )
                                    }
                                    data-testid='select-all'
                                />
                            }
                            label={`Selected ${state.selectedTracks.length}`}
                        />
                        {state.selectedTracks.length > 0 && (
                            <Button
                                variant='contained'
                                color='error'
                                startIcon={<Delete />}
                                onClick={() => state.setIsBulkConfirmOpen(true)}
                                data-testid='bulk-delete-button'
                            >
                                Delete Selected
                            </Button>
                        )}
                    </Box>
                )}

                {state.isLoading ? (
                    <LoadingIndicator />
                ) : state.isError ? (
                    <Typography color='error'>Error loading tracks</Typography>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {state.tracksData?.tracks.map(track => (
                                <Grid item xs={12} key={track.id}>
                                    <TrackItem
                                        track={track}
                                        onEdit={() => {
                                            state.setEditingTrackId(track.id);
                                            state.setIsModalOpen(true);
                                        }}
                                        onDelete={() => state.setDeletingTrackId(track.id)}
                                        isSelectMode={state.isSelectMode}
                                        isSelected={state.selectedTracks.includes(track.id)}
                                        onSelect={() => state.handleSelectTrack(track.id)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
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
                open={state.isModalOpen || !!state.editingTrackId}
                onClose={() => {
                    state.setIsModalOpen(false);
                    state.setEditingTrackId(null);
                }}
                onSubmit={(formData) => {
                    if (state.editingTrackId) {
                        state.updateTrackMutation.mutate({
                            id: state.editingTrackId,
                            data: {
                                title: formData.title,
                                artist: formData.artist,
                                album: formData.album,
                                genres: formData.genres,
                                coverImage: formData.coverImage,
                            }
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
                open={!!state.deletingTrackId}
                onClose={() => state.setDeletingTrackId(null)}
                onConfirm={() => {
                    state.deleteMutation.mutate(+state.deletingTrackId!);
                    state.setDeletingTrackId(null);
                }}
                title='Delete Track'
                message='Are you sure you want to delete this track?'
            />

            <ConfirmDialog
                open={state.isBulkConfirmOpen}
                onClose={() => state.setIsBulkConfirmOpen(false)}
                onConfirm={() => {
                    state.deleteMultipleMutation.mutate(state.selectedTracks);
                    state.setIsBulkConfirmOpen(false);
                }}
                title='Delete Selected Tracks'
                message={`Are you sure you want to delete ${state.selectedTracks.length} selected tracks?`}
            />
        </Container>
    );
};

export default TrackPage;*/
