import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Autocomplete,
    Chip,
    Button,
    DialogActions,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import {ITrackForm} from "./Interface";
import {TTrackFormData} from "../../types/types.ts";

const TrackForm = ({ open, onClose, track, genres, onSubmit }: ITrackForm) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TTrackFormData>({
        defaultValues: {
            title: '',
            artist: '',
            album: '',
            genres: [],
            coverImage: '',
        }
    });

    useEffect(() => {
        if (track) {
            reset({
                title: track.title,
                artist: track.artist,
                album: track.album || '',
                genres: track.genres || [],
                coverImage: track.coverImage || '',
            });
        }
    }, [track, reset]);

    return (
        <Dialog open={open} onClose={onClose} data-testid="track-form-modal">
            <DialogTitle>
                {track ? 'Edit Track' : 'Create New Track'}
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                    data-testid="close-form-button"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={{ display: 'grid', gap: 2 }}>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: 'Title is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Title"
                                fullWidth
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                data-testid="input-title"
                            />
                        )}
                    />
                    <Controller
                        name="artist"
                        control={control}
                        rules={{ required: 'Artist is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Artist"
                                fullWidth
                                error={!!errors.artist}
                                helperText={errors.artist?.message}
                                data-testid="input-artist"
                            />
                        )}
                    />
                    <Controller
                        name="album"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Album"
                                fullWidth
                                data-testid="input-album"
                            />
                        )}
                    />
                    <Controller
                        name="genres"
                        control={control}
                        rules={{
                            validate: (value) =>
                                value.length > 0 || 'Select at least one genre'
                        }}
                        render={({ field }) => (
                            <Autocomplete
                                multiple
                                options={genres}
                                value={field.value || []}
                                onChange={(_, value) => field.onChange(value)}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            {...getTagProps({ index })}
                                            label={option}
                                            data-testid={`genre-${option}`}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Genres"
                                        error={!!errors.genres}
                                        helperText={
                                            typeof errors.genres?.message === 'string'
                                                ? errors.genres?.message
                                                : ''
                                        }
                                        data-testid="genre-selector"
                                    />
                                )}
                            />
                        )}
                    />
                    <Controller
                        name="coverImage"
                        control={control}
                        rules={{
                            pattern: {
                                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                                message: 'Invalid URL format'
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Cover Image URL"
                                fullWidth
                                error={!!errors.coverImage}
                                helperText={errors.coverImage?.message}
                                data-testid="input-cover-image"
                            />
                        )}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} data-testid="cancel-button">Cancel</Button>
                    <Button type="submit" variant="contained" data-testid="submit-button">
                        {track ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TrackForm

