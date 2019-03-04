import { Track } from './spotify-track';
export interface PlaylistResponse {
    href: string;
    items: PlaylistTrack[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}
export interface PlaylistTrack {
    added_at: string;
    added_by: AddedBy;
    is_local: boolean;
    primary_color: null;
    track: Track;
    video_thumbnail: VideoThumbnail;
}
export interface AddedBy {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: 'user';
    uri: string;
}
export interface ExternalUrls {
    spotify: string;
}
export interface Image {
    height: number | null;
    url: string;
    width: number | null;
}
export interface VideoThumbnail {
    url: string;
}
