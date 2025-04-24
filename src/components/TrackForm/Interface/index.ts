import {ITrack, TTrackFormData} from "../../../types/types.ts";

export interface ITrackForm {
    open?: boolean;
    onClose?: () => void;
    track?: ITrack;
    genres?: string[];
    onSubmit: (data: TTrackFormData) => void;
}