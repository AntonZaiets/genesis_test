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
import { uploadFile } from '../../api/dropboxService.ts';
import { uploadFileNameToBackend } from '../../api/tracks.ts';
import { useQueryClient } from '@tanstack/react-query';
import { IUploadModal } from './Interface';

const UploadModal = ({ open, trackId, onClose, onUploadSuccess }: IUploadModal) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };


    const handleUpload = async () => {
        if (!file || !trackId) return;

        setIsUploading(true);
        setError(null);

        try {
            const ext = file.name.split('.').pop();
            const renamedFile = new File([file], `${trackId}.${ext}`, { type: file.type });
            const url = await uploadFile(renamedFile, renamedFile.name);
            await uploadFileNameToBackend(trackId, url);
            queryClient.invalidateQueries(['tracks']);
            onUploadSuccess?.();
            onClose();
        } catch (err) {
            setError('Upload failed. Please try again.');
            console.error('Upload failed:', err);
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
                {error && <p style={{ color: 'red' }} data-testid="error-message">{error}</p>}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} data-testid="cancel-upload" >Cancel</Button>
                <Button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    variant="contained"
                    data-testid="upload-submit"
                >
                    {isUploading ? <CircularProgress size={24} data-testid="upload-progress" /> : 'Upload'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadModal;


