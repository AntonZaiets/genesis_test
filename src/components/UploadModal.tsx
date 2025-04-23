/*
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
import {deleteTrackFile, uploadCloudinaryLinkToBackend, uploadTrackFileToCloudinary} from '../api/tracks';

interface UploadModalProps {
    open: boolean;
    trackId: string;
    currentAudioFile?: string;
    onClose: () => void;
}

const UploadModal = ({ open, trackId, onClose, currentAudioFile }: UploadModalProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    /!*const handleUpload = async () => {
        console.log(2222222222222222222, file);
        if (!file) return;

        setIsUploading(true);
        try {
            await uploadTrackFile(trackId, file);
            onClose();
        } finally {
            setIsUploading(false);
        }
    };*!/
    /!*const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await uploadTrackFile(file);
            console.log('Uploaded to Cloudinary:', url);
            alert('Файл завантажено: ' + url);
            onClose();
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Помилка завантаження');
        } finally {
            setIsUploading(false);
        }
    };*!/

    /!*const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setError(null);
        try {
            // Завантажуємо файл на Cloudinary
            const { url, public_id } = await uploadTrackFileToCloudinary(file);

            // Передаємо посилання на файл в бекенд як назву файлу
            await uploadCloudinaryLinkToBackend(trackId, url);

            onClose();
        } catch (err) {
            setError('Upload failed. Please try again.');
            console.error('Upload failed:', err);
        } finally {
            setIsUploading(false);
        }
    };*!/
    const handleUpload = async () => {
        if (!file || !trackId) return;

        setIsUploading(true);
        setError(null);

        try {
            const renamedFile = new File([file], `${trackId}.${file.name.split('.').pop()}`, {
                type: file.type,
            });
            const { url, public_id } = await uploadTrackFileToCloudinary(renamedFile, trackId);

            await uploadCloudinaryLinkToBackend(trackId, url);

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
*/
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
import { uploadFile } from '../api/dropboxService';
import { uploadCloudinaryLinkToBackend } from '../api/tracks';
import { useQueryClient } from '@tanstack/react-query';
interface UploadModalProps {
    open: boolean;
    trackId: string;
    currentAudioFile?: string;
    onClose: () => void;
    onUploadSuccess?: () => void;
}

const UploadModal = ({ open, trackId, onClose, onUploadSuccess }: UploadModalProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    /*const handleUpload = async () => {
        if (!file || !trackId) return;

        setIsUploading(true);
        setError(null);

        try {
            const ext = file.name.split('.').pop();
            const renamedFile = new File([file], `${trackId}.${ext}`, { type: file.type });

            const url = await uploadFile(renamedFile, renamedFile.name);

            // Надсилаємо посилання на аудіофайл в бекенд
            await uploadCloudinaryLinkToBackend(trackId, url);

            onClose();
        } catch (err) {
            setError('Upload failed. Please try again.');
            console.error('Upload failed:', err);
        } finally {
            setIsUploading(false);
        }
    };*/
    const handleUpload = async () => {
        if (!file || !trackId) return;

        setIsUploading(true);
        setError(null);

        try {
            const ext = file.name.split('.').pop();
            const renamedFile = new File([file], `${trackId}.${ext}`, { type: file.type });
            const url = await uploadFile(renamedFile, renamedFile.name);
            await uploadCloudinaryLinkToBackend(trackId, url);
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    variant="contained"
                    data-testid="upload-submit"
                >
                    {isUploading ? <CircularProgress size={24} /> : 'Upload'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadModal;

