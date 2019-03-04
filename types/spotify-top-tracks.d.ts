import { Track } from './spotify-track';
export interface TopTracksResponse {
    items: Track[];
    total: number;
    limit: number;
    offset: number;
    previous: null;
    href: string;
    next: string;
}
