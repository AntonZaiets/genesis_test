import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import TrackInfo from './components/TrackInfo/TrackInfo.tsx';
import TrackActions from './components/TrackActions/TrackActions.tsx';
import TrackAudioPlayer from './components/TrackAudioPlayer/TrackAudioPlayer.tsx';
import TrackCheckbox from './components/TrackCheckbox/TrackCheckbox.tsx';
import UploadModalHandler from './components/UploadModalHandler/UploadModalHandler.tsx';
import { getTemporaryLink } from '../../api/dropboxService.ts';
import { ITrackItem } from './Interface';

const TrackItem = ({ track, onEdit, onDelete, isSelectMode, isSelected, onSelect }: ITrackItem) => {
    const [showUpload, setShowUpload] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchAudioUrl = async () => {
            if (track.audioFile) {
                try {
                    const tempLink = await getTemporaryLink(`${track.id}.mp3`);
                    setAudioUrl(tempLink);
                } catch (err) {
                    console.error('Error fetching Dropbox audio link:', err);
                }
            }
        };

        fetchAudioUrl();
    }, [track.audioFile, track.id]);

    return (
        <Card
            data-testid={`track-item-${track.id}`}
            sx={{
                position: 'relative',
                opacity: track.audioFile ? 1 : 0.7,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                flexWrap: 'wrap',
            }}
        >
            <TrackCheckbox isSelectMode={isSelectMode} isSelected={isSelected} onSelect={onSelect} trackId={track.id} />
            <TrackInfo track={track} />
            <TrackAudioPlayer audioUrl={audioUrl} trackId={track.id} />
            <TrackActions
                onEdit={onEdit}
                onDelete={onDelete}
                onSelect={onSelect}
                isSelectMode={isSelectMode}
                isSelected={isSelected}
                trackId={track.id}
                setShowUpload={setShowUpload}
            />
            <UploadModalHandler showUpload={showUpload} setShowUpload={setShowUpload} trackId={track.id} setAudioUrl={setAudioUrl} />
        </Card>
    );
};

export default TrackItem;
