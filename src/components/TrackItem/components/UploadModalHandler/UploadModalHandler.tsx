import React from 'react';
import UploadModal from '../../..//UploadModal/UploadModal.tsx';
import { getTemporaryLink } from '../../../../api/dropboxService.ts';

const UploadModalHandler = ({
                                showUpload,
                                setShowUpload,
                                trackId,
                                setAudioUrl
                            }: {
    showUpload: boolean;
    setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
    trackId: string;
    setAudioUrl: React.Dispatch<React.SetStateAction<string | null>>;
}) => (
    <UploadModal
        open={showUpload}
        trackId={trackId}
        onClose={() => setShowUpload(false)}
        onUploadSuccess={async () => {
            const tempLink = await getTemporaryLink(`${trackId}.mp3`);
            setAudioUrl(tempLink);
        }}
    />
);

export default UploadModalHandler;
