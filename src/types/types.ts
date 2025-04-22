export interface Track {
    id: string;
    title: string;
    artist: string;
    album?: string;
    genres: string[];
    coverImage?: string;
    audioUrl?: string;
    duration?: number;
    uploadDate?: string;
}

export type TrackFormData = {
    title: string;
    artist: string;
    album?: string;
    genres: string[];
    coverImage?: string;
};


export interface TracksResponse {
    tracks: Track[];
    totalPages: number;
    currentPage: number;
}