import { Chip, TextField, Box, Autocomplete } from '@mui/material';
import  useGenres  from '../hooks/useGenres';

interface GenreSelectorProps {
    value: string[];
    onChange: (genres: string[]) => void;
    error?: boolean;
    helperText?: string;
}

const GenreSelector = ({ value, onChange, error, helperText }: GenreSelectorProps) => {
    const { data: genres } = useGenres();

    return (
        <Autocomplete
            multiple
            options={genres || []}
            value={value}
            onChange={(_, newValue) => onChange(newValue)}
            freeSolo
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        key={option}
                        label={option}
                        {...getTagProps({ index })}
                        onDelete={() => {
                            const newGenres = [...value];
                            newGenres.splice(index, 1);
                            onChange(newGenres);
                        }}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Genres"
                    placeholder="Select or add genres"
                    error={error}
                    helperText={helperText}
                    data-testid="genre-selector"
                />
            )}
        />
    );
};

export default GenreSelector;