import { useQuery } from '@tanstack/react-query';
import { fetchGenres } from '../api/tracks';

const useGenres = () => {
    return useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres,
        staleTime: Infinity,
    });
};

export default useGenres;