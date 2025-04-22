/*
import React, { useState, useEffect } from 'react';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import { fetchTracks, fetchGenres, createTrack, updateTrack, deleteTrack, Track } from './api/tracks';

const App: React.FC = () => {
    const [isFormVisible, setFormVisible] = useState<boolean>(false);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Завантаження даних при монтуванні
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [loadedTracks, loadedGenres] = await Promise.all([
                    fetchTracks(),
                    fetchGenres()
                ]);
                setTracks(loadedTracks);
                setGenres(loadedGenres);
            } catch (err) {
                setError('Failed to load data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleCreateTrack = () => {
        setCurrentTrack(null);
        setFormVisible(true);
    };

    const handleEditTrack = (track: Track) => {
        setCurrentTrack(track);
        setFormVisible(true);
    };

    const handleTrackSubmit = async (trackData: Omit<Track, 'id'> | Track) => {
        try {
            if ('id' in trackData) {
                // Оновлення існуючого треку
                const updatedTrack = await updateTrack(trackData.id, trackData);
                setTracks(tracks.map(t => t.id === updatedTrack.id ? updatedTrack : t));
            } else {
                // Створення нового треку
                const newTrack = await createTrack(trackData);
                setTracks([...tracks, newTrack]);
            }
            setFormVisible(false);
        } catch (err) {
            setError('Failed to save track');
            console.error(err);
        }
    };

    const handleDeleteTrack = async (id: string) => {
        try {
            await deleteTrack(id);
            setTracks(tracks.filter(track => track.id !== id));
        } catch (err) {
            setError('Failed to delete track');
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Music Manager</h1>

            <button
                data-testid="create-track-button"
                onClick={handleCreateTrack}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
            >
                Create Track
            </button>

            {isFormVisible && (
                <TrackForm
                    track={currentTrack}
                    genres={genres}
                    onSubmit={handleTrackSubmit}
                    onClose={() => setFormVisible(false)}
                />
            )}

            <TrackList
                tracks={tracks}
                onEdit={handleEditTrack}
                onDelete={handleDeleteTrack}
            />
        </div>
    );
};

export default App;*/
import { Routes, Route, Navigate } from 'react-router-dom';
import TrackPage from './pages/TracksPage';
import LoadingIndicator from './components/LoadingIndicator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(); // Створення екземпляра QueryClient

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Routes>
                    <Route path="/tracks" element={<TrackPage />} />
                    <Route path="/" element={<Navigate to="/tracks" replace />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>

                <LoadingIndicator />
                <ToastContainer
                    data-testid="toast-container"
                    position="bottom-right"
                    autoClose={3000}
                />
            </div>
        </QueryClientProvider>
    );
};

export default App;

