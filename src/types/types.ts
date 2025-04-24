export interface ITrack {
    id: string;
    title: string;
    artist: string;
    album: string;
    genres: string[];
    coverImage: string;
    audioFile: string;
    file?: any;
}

export type TTrackFormData = {
    title: string;
    artist: string;
    album?: string;
    genres: string[];
    coverImage?: string;
};
