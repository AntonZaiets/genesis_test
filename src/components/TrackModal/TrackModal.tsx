import React, { useState } from 'react';
import TrackForm from '../TrackForm/TrackForm.tsx';
import {createTrack, updateTrack} from '../../api/tracks.ts';

const TrackModal: React.FC<{ trackId?: string; initialData?: any; onClose: () => void }> = ({ trackId, initialData, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: { title: string; artist: string; album?: string; genres: string[]; coverImage?: string }) => {
        setIsLoading(true);
        try {
            if (trackId) {
                await updateTrack(trackId, data);
            } else {
                await createTrack(data);
            }
        } catch (error) {
            console.error('Error submitting form', error);
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    return (
        <div>
            <h2>{trackId ? 'Edit Track' : 'Create Track'}</h2>
            <TrackForm initialData={initialData} onSubmit={handleSubmit} />
            {isLoading && <div>Loading...</div>}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default TrackModal;
