import {ITrack} from "../../../types/types.ts";

export interface ITrackItem {
    track: ITrack;
    onEdit: () => void;
    onDelete: () => void;
    isSelectMode: boolean;
    isSelected: boolean;
    onSelect: () => void;
}