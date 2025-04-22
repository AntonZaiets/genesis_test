/*
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export type TrackFormData = {
    title: string;
    artist: string;
    album?: string;
    coverImage?: string;
};

type TrackFormProps = {
    initialData?: TrackFormData & { genres: string[] };
    onSubmit: (data: TrackFormData & { genres: string[] }) => void;
};

const TrackForm: React.FC<TrackFormProps> = ({ initialData, onSubmit }) => {
    const defaultValues = {
        title: initialData?.title ?? '',
        artist: initialData?.artist ?? '',
        album: initialData?.album ?? '',
        coverImage: initialData?.coverImage ?? '',
    } satisfies TrackFormData;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TrackFormData>({
        defaultValues,
    });

    const [genres, setGenres] = useState<string[]>(initialData?.genres || []);

    const addGenre = (genre: string) => {
        if (genre && !genres.includes(genre)) {
            setGenres((prev) => [...prev, genre]);
        }
    };

    const removeGenre = (genre: string) => {
        setGenres((prev) => prev.filter((g) => g !== genre));
    };

    const submitForm = (data: TrackFormData) => {
        onSubmit({ ...data, genres });
    };

    return (
        <form onSubmit={handleSubmit(submitForm)} data-testid="track-form">
            <div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    {...register('title', { required: 'Title is required' })}
                    data-testid="input-title"
                />
                {errors.title && <span data-testid="error-title">{errors.title.message}</span>}
            </div>

            <div>
                <label htmlFor="artist">Artist</label>
                <input
                    id="artist"
                    {...register('artist', { required: 'Artist is required' })}
                    data-testid="input-artist"
                />
                {errors.artist && <span data-testid="error-artist">{errors.artist.message}</span>}
            </div>

            <div>
                <label htmlFor="album">Album</label>
                <input id="album" {...register('album')} data-testid="input-album" />
            </div>

            <div>
                <label>Genres</label>
                <div>
                    {genres.map((genre, index) => (
                        <span key={index} data-testid={`genre-${genre}`}>
              {genre}{' '}
                            <button type="button" onClick={() => removeGenre(genre)}>
                X
              </button>
            </span>
                    ))}
                </div>
                <button type="button" onClick={() => addGenre(prompt('Enter genre') || '')}>
                    + Add Genre
                </button>
            </div>

            <div>
                <label htmlFor="coverImage">Cover Image URL</label>
                <input
                    id="coverImage"
                    {...register('coverImage', {
                        pattern: {
                            value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                            message: 'Invalid URL',
                        },
                    })}
                    data-testid="input-cover-image"
                />
                {errors.coverImage && (
                    <span data-testid="error-cover-image">{errors.coverImage.message}</span>
                )}
            </div>

            <button type="submit" data-testid="submit-button">
                Submit
            </button>
        </form>
    );
};

export default TrackForm;
*/

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
import CloseIcon from '@mui/icons-material/Close';
import { Track } from '../api/tracks';
import { TrackFormData } from '../types/types';

interface TrackFormProps {
    open?: boolean;
    onClose?: () => void;
    track?: Track;
    genres?: string[];
    onSubmit: (data: TrackFormData) => void;
}

const TrackForm = ({ open, onClose, track, genres, onSubmit }: TrackFormProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TrackFormData>({
        defaultValues: {
            title: '',
            artist: '',
            album: '',
            genres: [],
            coverImage: ''
        }
    });

    useEffect(() => {
        if (track) {
            reset({
                title: track.title,
                artist: track.artist,
                album: track.album || '',
                genres: track.genres || [],
                coverImage: track.coverImage || ''
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
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" data-testid="submit-button">
                        {track ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TrackForm

