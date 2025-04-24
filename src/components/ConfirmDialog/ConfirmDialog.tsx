import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import { IConfirmDialog } from './Interface';
const ConfirmDialog = ({ open,
                           onClose,
                           onConfirm,
                           title,
                           message,
                           confirmText = 'Confirm',
                           cancelText = 'Cancel',
                       }: IConfirmDialog) => {
    return (
        <Dialog open={open} onClose={onClose} data-testid='confirm-dialog'>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} data-testid='cancel-delete'>
                    {cancelText}
                </Button>
                <Button
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                    color='error'
                    data-testid='confirm-delete'
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;