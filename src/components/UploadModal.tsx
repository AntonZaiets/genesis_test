import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { uploadTrackFile } from '../api/tracks';

interface UploadModalProps {
    open: boolean;
    trackId: string;
    onClose: () => void;
}

const UploadModal = ({ open, trackId, onClose }: UploadModalProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        console.log(2222222222222222222, file);
        if (!file) return;

        setIsUploading(true);
        try {
            await uploadTrackFile(trackId, file);
            onClose();
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} data-testid="upload-modal">
            <DialogTitle>
                Upload Audio File
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                    data-testid="close-upload-button"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <input
                    type="file"
                    accept=".mp3,.wav"
                    onChange={handleFileChange}
                    data-testid="file-input"
                />
                {file && <p data-testid="selected-file">{file.name}</p>}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    variant="contained"
                    data-testid="upload-submit"
                >
                    {isUploading ? <CircularProgress size={24} /> : 'Upload1234'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadModal