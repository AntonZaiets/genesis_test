export interface IUploadModal {
    open: boolean;
    trackId: string;
    currentAudioFile?: string;
    onClose: () => void;
    onUploadSuccess?: () => void;
}