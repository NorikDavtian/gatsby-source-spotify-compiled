import { PluginOptions } from './gatsby-node';
import { TokenResponse } from './types/spotify-token';
import { Artist } from './types/spotify-top-artists';
import { Track } from './types/spotify-track';
export declare type Scope = 'playlist-read-private' | 'user-modify-playback-state' | 'user-top-read' | 'user-read-recently-played' | 'user-read-currently-playing' | 'playlist-modify-private' | 'app-remote-control' | 'playlist-modify-public' | 'user-read-birthdate' | 'user-read-playback-state' | 'user-follow-read' | 'user-read-email' | 'streaming' | 'playlist-read-collaborative' | 'user-library-modify' | 'user-read-private' | 'user-follow-modify' | 'user-library-read';
export declare type TimeRange = 'long_term' | 'medium_term' | 'short_term';
export declare const SPOTIFY_ACCOUNT_URL = "https://accounts.spotify.com";
export declare const SPOTIFY_API_URL = "https://api.spotify.com/v1";
export declare const REDIRECT_URL = "http://localhost:5071/spotify";
export declare const generateAuthUrl: (clientId: string, scopes?: Scope[]) => string;
export declare const getTokens: (clientId: string, clientSecret: string, code: string, grantType: "authorization_code" | "refresh_token") => Promise<TokenResponse>;
export declare const getPlaylists: (accessToken: string, limit?: number) => Promise<import("./types/spotify-playlists").Playlist[]>;
export declare const getPlaylistTracks: (accessToken: string, playlistId: string, limit?: number) => Promise<import("./types/spotify-playlist").PlaylistTrack[]>;
export declare const getRecentTracks: (accessToken: string, limit?: number) => Promise<import("./types/spotify-recent").Item[]>;
export declare const getUserData: ({ clientId, clientSecret, refreshToken, timeRanges, fetchPlaylists, fetchRecent, playlistId, }: PluginOptions) => Promise<{
    playlists: import("./types/spotify-playlists").Playlist[];
    playlistTracks: import("./types/spotify-playlist").PlaylistTrack[];
    recentTracks: import("./types/spotify-recent").Item[];
    artists: (Artist & {
        time_range: TimeRange;
    })[];
    tracks: (Track & {
        time_range: TimeRange;
    })[];
}>;
