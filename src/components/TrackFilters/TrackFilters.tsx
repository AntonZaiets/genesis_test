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
                <MenuItem value="title" data-testid="sort-option-title">Title</MenuItem>
                <MenuItem value="artist" data-testid="sort-option-artist">Artist</MenuItem>
                <MenuItem value="album" data-testid="sort-option-album">Album</MenuItem>
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
                    <MenuItem
                        key={genre}
                        value={genre}
                        data-testid={`genre-option-${genre}`}
                    >
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
                <MenuItem value="All" data-testid="artist-option-all">All</MenuItem>
                {[...new Set(tracksData?.tracks.map((t) => t.artist))].map((artist) => (
                    <MenuItem
                        key={artist}
                        value={artist}
                        data-testid={`artist-option-${artist}`}
                    >
                        {artist}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Box>
);

export default FiltersSection;
