import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchBar from './SearchBar';

const TrackFilters = ({ searchTerm, onSearch, sort, onSortChange, genres, filter, onFilterChange, artists }) => (
    <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <SearchBar value={searchTerm} onChange={onSearch} />

        <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} onChange={onSortChange} label="Sort By">
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="album">Album</MenuItem>
            </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Genre</InputLabel>
            <Select
                value={filter.genre || 'All'}
                onChange={(e) => onFilterChange('genre', e.target.value === 'All' ? '' : e.target.value)}
                label="Genre"
            >
                <MenuItem value="All">All</MenuItem>
                {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                        {genre}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Artist</InputLabel>
            <Select
                value={filter.artist || 'All'}
                onChange={(e) => onFilterChange('artist', e.target.value === 'All' ? '' : e.target.value)}
                label="Artist"
            >
                <MenuItem value="All">All</MenuItem>
                {artists.map((artist) => (
                    <MenuItem key={artist} value={artist}>
                        {artist}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Box>
);