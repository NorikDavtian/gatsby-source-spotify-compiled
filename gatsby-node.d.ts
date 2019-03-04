import { TimeRange } from './spotify-api';
export interface PluginOptions {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    timeRanges?: TimeRange[];
    fetchPlaylists?: boolean;
    fetchRecent?: boolean;
    playlistId?: string;
}
export declare const sourceNodes: ({ actions, createNodeId, store, cache }: {
    actions: any;
    createNodeId: any;
    store: any;
    cache: any;
}, pluginOptions: PluginOptions) => Promise<void>;
