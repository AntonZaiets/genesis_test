import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/useToast';
import { useModal } from '@/hooks/useModal';
import { useTrackApi } from '@/api/useTrackApi';
import { Track } from '@/types/track';

const useTrackPageState = () => {
    const { showToast } = useToast();
    const { isOpen, openModal, closeModal } = useModal();
    const [tracks, setTracks] = useState<Track[]>([]);
    const [selectedTracks, setSelectedTracks] = useState<number[]>([]);
    const [editingTrack, setEditingTrack] = useState<Track | null>(null);
    const [trackToDelete, setTrackToDelete] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { getTracks, deleteTrack } = useTrackApi();

    const fetchTracks = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, totalPages } = await getTracks(page);
            setTracks(data);
            setTotalPages(totalPages);
            setIsError(false);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchTracks();
    }, [fetchTracks]);

    const openCreateModal = () => {
        setEditingTrack(null);
        openModal();
    };

    const editTrack = (id: number) => {
        const track = tracks.find(t => t.id === id);
        if (track) {
            setEditingTrack(track);
            openModal();
        }
    };

    const confirmDeleteTrack = (id: number) => setTrackToDelete(id);

    const performDelete = async () => {
        if (trackToDelete == null) return;
        try {
            await deleteTrack(trackToDelete);
            showToast('Track deleted');
            setTrackToDelete(null);
            fetchTracks();
        } catch {
            showToast('Error deleting track', 'error');
        }
    };

    const toggleTrackSelection = (id: number) => {
        setSelectedTracks(prev =>
            prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
        );
    };

    const toggleSelectMode = () => {
        setIsSelectMode(prev => !prev);
        setSelectedTracks([]);
    };

    return {
        tracks,
        selectedTracks,
        page,
        totalPages,
        isSelectMode,
        isOpen,
        editingTrack,
        isLoading,
        isError,
        trackToDelete,

        setPage,
        toggleSelectMode,
        toggleTrackSelection,
        openCreateModal,
        editTrack,
        closeModal,
        confirmDeleteTrack,
        setTrackToDelete,
        performDelete,
        fetchTracks,
    };
};

export default useTrackPageState;
