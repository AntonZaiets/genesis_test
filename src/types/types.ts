export interface Track {
    id: string;
    title: string;
    artist: string;
    album?: string;
    genres: string[];
    coverImage?: string;
    audioFile?: string;
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
