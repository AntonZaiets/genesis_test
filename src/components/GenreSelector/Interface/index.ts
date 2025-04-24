export interface IGenreSelector {
    value: string[];
    onChange: (genres: string[]) => void;
    error?: boolean;
    helperText?: string;
}