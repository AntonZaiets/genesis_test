import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';
import SearchBar from '../SearchBar/SearchBar.tsx';

const FiltersSection = ({
                            searchTerm,
                            onSearchChange,
                            sort,
                            onSortChange,
                            filter,
                            onFilterChange,
                            genres,
                            tracksData
                        }) => (
    <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <SearchBar value={searchTerm} onChange={onSearchChange} data-testid="search-input" />
        <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} onChange={onSortChange} label="Sort By" data-testid="sort-select">
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="album">Album</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="genre-select-label">Genre</InputLabel>
            <Select
                labelId="genre-select-label"
                value={filter.genre || 'All'}
                onChange={(e: SelectChangeEvent) => {
                    const value = e.target.value;
                    onFilterChange('genre', value === 'All' ? '' : value);
                }}
                label="Genre"
                data-testid="filter-genre"
            >
                <MenuItem value="All">All</MenuItem>
                {genres?.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                        {genre}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="artist-select-label">Artist</InputLabel>
            <Select
                labelId="artist-select-label"
                value={filter.artist || 'All'}
                onChange={(e: SelectChangeEvent) => {
                    const value = e.target.value;
                    onFilterChange('artist', value === 'All' ? '' : value);
                }}
                label="Artist"
                data-testid="filter-artist"
            >
                <MenuItem value="All">All</MenuItem>
                {[...new Set(tracksData?.tracks.map((t) => t.artist))].map((artist) => (
                    <MenuItem key={artist} value={artist}>
                        {artist}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Box>
);

export default FiltersSection;
