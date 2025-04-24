/*
import { useState, useEffect, useCallback } from 'react';
import { ITrack } from '../types/types.ts';
import { fetchTracks, deleteTrack, createTrack, updateTrack } from '../api/tracks.ts';
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useTrackPageState = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState('');
    const [filter, setFilter] = useState<string | null>(null);
    const [genres, setGenres] = useState<string[]>([]);
    const [artists, setArtists] = useState<string[]>([]);
    const [tracks, setTracks] = useState<ITrack[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedTracks, setSelectedTracks] = useState<ITrack[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTrack, setEditingTrack] = useState<ITrack | null>(null);
    const [isSingleDeleteOpen, setIsSingleDeleteOpen] = useState(false);
    const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
    const queryClient = useQueryClient();
    useEffect(() => {
        setIsLoading(true);
        fetchTracks(page, 10, sort, filter, searchTerm)  // використовуємо fetchTracks
            .then((response) => {
                setTracks(response.tracks);
                setTotalPages(response.totalPages);
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page, searchTerm, sort, filter]);

    const toggleSelectMode = () => setIsSelectMode((prev) => !prev);

    const openCreateModal = () => {
        setIsFormOpen(true);
        setEditingTrack(null);
    };

    const closeForm = () => setIsFormOpen(false);

    const handleSubmit = (track: ITrack) => {
        if (editingTrack) {
            updateTrack(track).then(() => setIsFormOpen(false));
        } else {
            createTrack(track).then(() => setIsFormOpen(false));
        }
    };

    const openEditModal = (track: ITrack) => {
        setIsFormOpen(true);
        setEditingTrack(track);
    };

    const handleFilterChange = (newFilter: string | null) => setFilter(newFilter);

    const handleSelect = (track: ITrack) => {
        setSelectedTracks((prev) =>
            prev.includes(track) ? prev.filter((t) => t !== track) : [...prev, track]
        );
    };

    const toggleSelectAll = () => {
        if (selectedTracks.length === tracks.length) {
            setSelectedTracks([]);
        } else {
            setSelectedTracks(tracks);
        }
    };

    const confirmDelete = (track: ITrack) => {
        setIsSingleDeleteOpen(true);
        setEditingTrack(track);
    };

    const closeSingleDelete = () => setIsSingleDeleteOpen(false);

    const handleSingleDelete = () => {
        if (editingTrack) {
            deleteTrack(+editingTrack.id).then(() => {
                setIsSingleDeleteOpen(false);
                setTracks(tracks.filter((t) => t.id !== editingTrack.id));
            });
        }
    };

    const openBulkDeleteConfirm = () => setIsBulkDeleteOpen(true);

    const closeBulkDelete = () => setIsBulkDeleteOpen(false);

    const handleBulkDelete = useMutation({
        mutationFn: async (ids: string[]) => {
            await Promise.all(ids.map(id => deleteTrack(+id)));
        },
        onSuccess: () => {
            setSelectedTracks([]);
            setIsSelectMode(false);
            queryClient.invalidateQueries(['tracks']);
        }
    });

    const areAllSelected = selectedTracks.length === tracks.length;

    return {
        searchTerm,
        setSearchTerm,
        sort,
        setSort,
        genres,
        setGenres,
        artists,
        setArtists,
        filter,
        handleFilterChange,
        tracks,
        isLoading,
        isError,
        page,
        setPage,
        totalPages,
        isSelectMode,
        toggleSelectMode,
        selectedTracks,
        handleSelect,
        areAllSelected,
        toggleSelectAll,
        isFormOpen,
        openCreateModal,
        closeForm,
        editingTrack,
        handleSubmit,
        openEditModal,
        isSingleDeleteOpen,
        closeSingleDelete,
        handleSingleDelete,
        isBulkDeleteOpen,
        closeBulkDelete,
        handleBulkDelete,
        openBulkDeleteConfirm,
    };
};
*/
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTracks, fetchGenres, deleteTrack, updateTrack, createTrack } from '../api/tracks';
import useDebounce from "./useDebounce.ts";
import {SelectChangeEvent} from "@mui/material";

const useTrackPageState = () => {
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

    const { data: tracksData, isLoading, isError } = useQuery({
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

    const createTrackMutation = useMutation({
        mutationFn: createTrack,
        onSuccess: () => queryClient.invalidateQueries(['tracks'])
    });

    const updateTrackMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: { title: string, artist: string, album?: string, genres: string[], coverImage?: string } }) =>
            updateTrack(id, data),
        onSuccess: () => queryClient.invalidateQueries(['tracks']),
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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const setTrackToEdit = (trackId: string) => {
        setEditingTrackId(trackId);
        openModal();
    };
    const handleDelete = (trackId: string) => setDeletingTrackId(trackId);
    const handleCancelDelete = () => setDeletingTrackId(null);

    return {
        page,
        setPage,
        limit,
        sort,
        setSort,
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        isModalOpen,
        setIsModalOpen,
        editingTrackId,
        setEditingTrackId,
        deletingTrackId,
        setDeletingTrackId,
        selectedTracks,
        setSelectedTracks,
        isSelectMode,
        setIsSelectMode,
        isBulkConfirmOpen,
        setIsBulkConfirmOpen,
        debouncedSearchTerm,
        genres,
        tracksData,
        isLoading,
        isError,
        deleteMutation,
        deleteMultipleMutation,
        createTrackMutation,
        updateTrackMutation,
        handleSortChange,
        handleFilterChange,
        handleSelectTrack,
        openModal,
        closeModal,
        setTrackToEdit,
        handleDelete,
        handleCancelDelete
    };
};

export default useTrackPageState;

