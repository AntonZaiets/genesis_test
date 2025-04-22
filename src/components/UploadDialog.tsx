import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    CircularProgress,
    Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadAudio, deleteAudio, Track } from '../api/tracks';
import { toast } from 'react-toastify';

interface UploadDialogProps {
    open: boolean;
    onClose: () => void;
    trackId: string;
    currentAudioUrl?: string;
}

const UploadDialog = ({ open, onClose, trackId, currentAudioUrl }: UploadDialogProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const queryClient = useQueryClient();

    const uploadMutation = useMutation({
        mutationFn: (file: File) => uploadAudio(trackId, file),
        onSuccess: () => {
            queryClient.invalidateQueries(['tracks']);
            toast.success('Audio uploaded successfully');
            onClose();
        },
        onError: () => {
            toast.error('Error uploading audio');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteAudio(trackId),
        onSuccess: () => {
            queryClient.invalidateQueries(['tracks']);
            toast.success('Audio deleted successfully');
            onClose();
        },
        onError: () => {
            toast.error('Error deleting audio');
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(11111111111111111111111111111111, e.target);
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files;
            // Validate file type
            if (!file.type.match('audio.*')) {
                toast.error('Please select an audio file');
                return;
            }
            // Validate file size (e.g., 20MB max)
            if (file.size > 20 * 1024 * 1024) {
                toast.error('File size should be less than 20MB');
                return;
            }
            setSelectedFile(file);
        }
    };
    console.log(11111111111111111111111111111111, selectedFile);
    const handleUpload = () => {
        if (selectedFile) {
            uploadMutation.mutate(selectedFile);
        }
    };

    const handleDelete = () => {
        deleteMutation.mutate();
    };

    const isLoading = uploadMutation.isLoading || deleteMutation.isLoading;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {currentAudioUrl ? 'Replace Audio File' : 'Upload Audio File'}
            </DialogTitle>
            <DialogContent>
                <Box my={2}>
                    <input
                        type="file"
                        accept="audio/mpeg"
                        onChange={handleFileChange}
                        disabled={isLoading}
                    />
                    {selectedFile && (
                        <Typography variant="body2" mt={1}>
                            Selected file: {selectedFile.name}
                        </Typography>
                    )}
                </Box>

                {currentAudioUrl && (
                    <Box mt={2}>
                        <Typography variant="body1">Current audio file:</Typography>
                        <audio controls src={currentAudioUrl} style={{ width: '100%', marginTop: 1 }} />
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                {currentAudioUrl && (
                    <Button
                        onClick={handleDelete}
                        color="error"
                        disabled={isLoading}
                        data-testid="confirm-delete"
                    >
                        {deleteMutation.isLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            'Delete Audio'
                        )}
                    </Button>
                )}
                <Button onClick={onClose} disabled={isLoading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleUpload}
                    variant="contained"
                    disabled={!selectedFile || isLoading}
                >
                    {uploadMutation.isLoading ? (
                        <CircularProgress size={24} />
                    ) : (
                        'Upload'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadDialog;