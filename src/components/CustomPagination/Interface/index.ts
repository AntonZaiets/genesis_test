export interface IPagination {
    currentPage: number;
    totalPages?: number;
    onPageChange: (page: number) => void;
}