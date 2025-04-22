import axios, { AxiosResponse } from 'axios';
export interface Track {
    audioUrl: any;
    id: string;
    title: string;
    artist: string;
    album: string;
    genres: string[];
    coverImage: string;
    file?: any;
}

const apiClient = axios.create({
    baseURL: 'http://localhost:8003/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Отримати список жанрів
export const fetchGenres = async (): Promise<string[]> => {
    const response: AxiosResponse<string[]> = await apiClient.get('/genres');
    return response.data;
};

// Отримати треки
export const fetchTracks = async (
    page = 1,
    limit = 10,
    sort = 'title',
    filter: Record<string, string> = {},
    search = ''
): Promise<{ tracks: Track[]; hasNext: boolean }> => {
    const response: AxiosResponse<{ data: Track[]; meta: { page: number; totalPages: number } }> =
        await apiClient.get('/tracks', {
            params: {
                page,
                limit,
                sort,
                search,
                ...filter,
            },
        });

    const tracks = response.data.data;
    const hasNext = response.data.meta.page < response.data.meta.totalPages;


    return { tracks, hasNext };
};


export const createTrack = async (trackData: { title: string; artist: string; album?: string; genres: string[]; coverImage?: string }) => {
    try {
        const response = await apiClient.post('/tracks', trackData);
        console.log('Track created:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating track", error);
        throw error;
    }
};

export const updateTrack = async (
    trackId: string,
    trackData: {
        title: string;
        artist: string;
        album?: string;
        genres: string[];
        coverImage?: string;
    }
) => {
    try {
        const response = await apiClient.put(`/tracks/${trackId}`, trackData);
        console.log('Updated track:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating track', error);
        throw error;
    }
};



export const deleteTrack = async (id: number): Promise<void> => {
    await apiClient.delete(`/tracks/${id}`);
};

export const uploadTrackFile = async (trackId: string, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);

    await fetch(`http://localhost:8003/api/tracks/${trackId}/upload`, {
        method: 'POST',
        body: formData,
    });
};

