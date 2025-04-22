import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmDialog = ({
                           open,
                           onClose,
                           onConfirm,
                           title,
                           message,
                           confirmText = 'Confirm',
                           cancelText = 'Cancel',
                       }: ConfirmDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose} data-testid="confirm-dialog">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} data-testid="cancel-delete">
                    {cancelText}
                </Button>
                <Button
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                    color="error"
                    data-testid="confirm-delete"
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;