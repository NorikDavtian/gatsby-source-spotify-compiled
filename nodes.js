"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var gatsby_node_helpers_1 = __importDefault(require("gatsby-node-helpers"));
var createNodeFactory = gatsby_node_helpers_1["default"]({
    typePrefix: 'Spotify'
}).createNodeFactory;
exports.TopArtistNode = createNodeFactory('TopArtist');
exports.TopTrackNode = createNodeFactory('TopTrack');
exports.PlaylistTrackNode = createNodeFactory('PlaylistTrack');
exports.PlaylistNode = createNodeFactory('Playlist');
exports.RecentTrackNode = createNodeFactory('RecentTrack');
