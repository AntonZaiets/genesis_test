import { Box, CircularProgress, Typography } from '@mui/material';
import {ILoadingIndicator} from './Interface';

const LoadingIndicator = ({ message = 'Loading...',
                              size = 40,
                              color = 'primary',
                          }: ILoadingIndicator) => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            p={4}
            data-testid='loading-indicator'
        >
            <CircularProgress
                size={size}
                color={color}
                data-testid='circular-progress'
            />
            {message && (
                <Typography
                    variant='body1'
                    mt={2}
                    data-testid='loading-message'
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default LoadingIndicator;