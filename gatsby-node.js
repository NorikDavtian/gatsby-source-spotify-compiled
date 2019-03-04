"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var gatsby_source_filesystem_1 = require("gatsby-source-filesystem");
var artist_list_1 = require("./artist-list");
var nodes_1 = require("./nodes");
var spotify_api_1 = require("./spotify-api");
var referenceRemoteFile = function (url, _a) {
    var cache = _a.cache, createNode = _a.createNode, createNodeId = _a.createNodeId, touchNode = _a.touchNode, store = _a.store;
    return __awaiter(_this, void 0, void 0, function () {
        var cachedResult, fileNode;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, cache.get(url)];
                case 1:
                    cachedResult = _b.sent();
                    if (cachedResult) {
                        touchNode({ nodeId: cachedResult });
                        return [2 /*return*/, { localFile___NODE: cachedResult }];
                    }
                    return [4 /*yield*/, gatsby_source_filesystem_1.createRemoteFileNode({
                            url: url,
                            store: store,
                            cache: cache,
                            createNode: createNode,
                            createNodeId: createNodeId,
                            ext: !url.includes('.') ? '.jpg' : undefined
                        })];
                case 2:
                    fileNode = _b.sent();
                    if (fileNode) {
                        cache.set(url, fileNode.id);
                        return [2 /*return*/, { localFile___NODE: fileNode.id }];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
};
exports.sourceNodes = function (_a, pluginOptions) {
    var actions = _a.actions, createNodeId = _a.createNodeId, store = _a.store, cache = _a.cache;
    return __awaiter(_this, void 0, void 0, function () {
        var createNode, touchNode, helpers, _b, tracks, artists, playlists, playlistTracks, recentTracks;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    createNode = actions.createNode, touchNode = actions.touchNode;
                    helpers = { cache: cache, createNode: createNode, createNodeId: createNodeId, store: store, touchNode: touchNode };
                    return [4 /*yield*/, spotify_api_1.getUserData(pluginOptions)];
                case 1:
                    _b = _c.sent(), tracks = _b.tracks, artists = _b.artists, playlists = _b.playlists, playlistTracks = _b.playlistTracks, recentTracks = _b.recentTracks;
                    return [4 /*yield*/, Promise.all(tracks.map(function (track, index) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        _a = createNode;
                                        _b = nodes_1.TopTrackNode;
                                        _c = [{}, track];
                                        _d = { id: track.time_range + "__" + track.id, order: index, artistString: artist_list_1.generateArtistString(track.artists) };
                                        if (!(track.album && track.album.images && track.album.images.length)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, referenceRemoteFile(track.album.images[0].url, helpers)];
                                    case 1:
                                        _e = _f.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _e = null;
                                        _f.label = 3;
                                    case 3:
                                        _a.apply(void 0, [_b.apply(void 0, [__assign.apply(void 0, _c.concat([(_d.image = _e, _d)]))])]);
                                        return [2 /*return*/];
                                }
                            });
                        }); }).concat(artists.map(function (artist, index) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        _a = createNode;
                                        _b = nodes_1.TopArtistNode;
                                        _c = [{}, artist];
                                        _d = { id: artist.time_range + "__" + artist.id, order: index };
                                        if (!(artist.images && artist.images.length)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, referenceRemoteFile(artist.images[0].url, helpers)];
                                    case 1:
                                        _e = _f.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _e = null;
                                        _f.label = 3;
                                    case 3:
                                        _a.apply(void 0, [_b.apply(void 0, [__assign.apply(void 0, _c.concat([(_d.image = _e, _d)]))])]);
                                        return [2 /*return*/];
                                }
                            });
                        }); }), playlists.map(function (playlist, index) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        _a = createNode;
                                        _b = nodes_1.PlaylistNode;
                                        _c = [{}, playlist];
                                        _d = { order: index };
                                        if (!(playlist.images && playlist.images.length)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, referenceRemoteFile(playlist.images[0].url, helpers)];
                                    case 1:
                                        _e = _f.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _e = null;
                                        _f.label = 3;
                                    case 3:
                                        _a.apply(void 0, [_b.apply(void 0, [__assign.apply(void 0, _c.concat([(_d.image = _e, _d)]))])]);
                                        return [2 /*return*/];
                                }
                            });
                        }); }), playlistTracks.map(function (playlistTrack, index) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e, _f, _g;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        _a = createNode;
                                        _b = nodes_1.PlaylistTrackNode;
                                        _c = [{}, playlistTrack];
                                        _d = { 
                                            // possible for the same track to be in the playlist multiple times
                                            id: String(playlistTrack.track.id + playlistTrack.added_at), order: index };
                                        _e = [{}, playlistTrack.track];
                                        _f = { artistString: artist_list_1.generateArtistString(playlistTrack.track.artists) };
                                        if (!(playlistTrack.track.album &&
                                            playlistTrack.track.album.images &&
                                            playlistTrack.track.album.images.length)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, referenceRemoteFile(playlistTrack.track.album.images[0].url, helpers)];
                                    case 1:
                                        _g = _h.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _g = null;
                                        _h.label = 3;
                                    case 3:
                                        _a.apply(void 0, [_b.apply(void 0, [__assign.apply(void 0, _c.concat([(_d.track = __assign.apply(void 0, _e.concat([(_f.image = _g, _f)])), _d)]))])]);
                                        return [2 /*return*/];
                                }
                            });
                        }); }), recentTracks.map(function (track, index) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e, _f, _g;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        _a = createNode;
                                        _b = nodes_1.RecentTrackNode;
                                        _c = [{}, track];
                                        _d = { id: String(track.played_at), order: index };
                                        _e = [{}, track.track];
                                        _f = { artistString: artist_list_1.generateArtistString(track.track.artists) };
                                        if (!(track.track.album &&
                                            track.track.album.images &&
                                            track.track.album.images.length)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, referenceRemoteFile(track.track.album.images[0].url, helpers)];
                                    case 1:
                                        _g = _h.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _g = null;
                                        _h.label = 3;
                                    case 3:
                                        _a.apply(void 0, [_b.apply(void 0, [__assign.apply(void 0, _c.concat([(_d.track = __assign.apply(void 0, _e.concat([(_f.image = _g, _f)])), _d)]))])]);
                                        return [2 /*return*/];
                                }
                            });
                        }); })))];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
};
