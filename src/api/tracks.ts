import axios, { AxiosResponse } from 'axios';
export interface Track {
    audioFile: string;
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

export const fetchGenres = async (): Promise<string[]> => {
    const response: AxiosResponse<string[]> = await apiClient.get('/genres');
    return response.data;
};

export const fetchTracks = async (
    page = 1,
    limit = 10,
    sort = 'title',
    filter: Record<string, string> = {},
    search = ''
): Promise<{ tracks: Track[]; totalPages: number; currentPage: number }> => {
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
    const { page: currentPage, totalPages } = response.data.meta;

    return { tracks, totalPages, currentPage };
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


export const uploadCloudinaryLinkToBackend = async (
    trackId: string,
    audioUrl: string
): Promise<void> => {
    const blob = new Blob([audioUrl], { type: 'audio/mp3' });
    const file = new File([blob], 'cloudinary-audio-link.mp3', { type: 'audio/mp3' });

    const formData = new FormData();
    formData.append('file', file);

    await fetch(`http://localhost:8003/api/tracks/${trackId}/upload`, {
        method: 'POST',
        body: formData,
    });
};








