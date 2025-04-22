import React from 'react';
import { Button, Box } from '@mui/material';

interface PaginationProps {
    currentPage: number;
    totalPages?: number;
    onPageChange: (page: number) => void;
}

const CustomPagination = ({ currentPage, totalPages = 5, onPageChange }: PaginationProps) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            gap={2}
            mt={3}
            data-testid="pagination"
        >
            <Button
                variant="outlined"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                data-testid="pagination-prev"
            >
                Previous
            </Button>

            <span>Page {currentPage} of {totalPages}</span>

            <Button
                variant="outlined"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                data-testid="pagination-next"
            >
                Next
            </Button>
        </Box>
    );
};

export default CustomPagination