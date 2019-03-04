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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
exports.__esModule = true;
var node_fetch_1 = __importDefault(require("node-fetch"));
exports.SPOTIFY_ACCOUNT_URL = 'https://accounts.spotify.com';
exports.SPOTIFY_API_URL = 'https://api.spotify.com/v1';
exports.REDIRECT_URL = 'http://localhost:5071/spotify';
exports.generateAuthUrl = function (clientId, scopes) {
    if (scopes === void 0) { scopes = ['user-top-read', 'user-read-recently-played']; }
    var base = new URL(exports.SPOTIFY_ACCOUNT_URL + "/authorize");
    base.searchParams.append('response_type', 'code');
    base.searchParams.append('redirect_uri', exports.REDIRECT_URL);
    base.searchParams.append('client_id', clientId);
    base.searchParams.append('scope', scopes.join(' '));
    return String(base);
};
exports.getTokens = function (clientId, clientSecret, code, grantType) { return __awaiter(_this, void 0, void 0, function () {
    var body, response, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                body = new URLSearchParams();
                body.append('grant_type', grantType);
                body.append('redirect_uri', exports.REDIRECT_URL);
                body.append(grantType === 'refresh_token' ? 'refresh_token' : 'code', code);
                body.append('client_id', clientId);
                body.append('client_secret', clientSecret);
                return [4 /*yield*/, node_fetch_1["default"](exports.SPOTIFY_ACCOUNT_URL + "/api/token", {
                        method: 'POST',
                        body: body
                    })];
            case 1:
                response = _c.sent();
                if (!!response.ok) return [3 /*break*/, 3];
                _a = Error.bind;
                _b = response.statusText + ": ";
                return [4 /*yield*/, response.text()];
            case 2: throw new (_a.apply(Error, [void 0, _b + (_c.sent())]))();
            case 3: return [4 /*yield*/, response.json()];
            case 4: return [2 /*return*/, (_c.sent())];
        }
    });
}); };
var getTop = function (accessToken, type, timeRange, limit) {
    if (timeRange === void 0) { timeRange = 'medium_term'; }
    if (limit === void 0) { limit = 20; }
    return __awaiter(_this, void 0, void 0, function () {
        var url, response, _a, _b, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = new URL(exports.SPOTIFY_API_URL + "/me/top/" + type);
                    url.searchParams.append('time_range', timeRange);
                    url.searchParams.append('limit', String(Math.min(limit, 50)));
                    return [4 /*yield*/, node_fetch_1["default"](String(url), {
                            headers: {
                                Authorization: "Bearer " + accessToken
                            }
                        })];
                case 1:
                    response = _c.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    _a = Error.bind;
                    _b = "[" + url + " / " + accessToken + "] " + response.statusText + ": ";
                    return [4 /*yield*/, response.text()];
                case 2: throw new (_a.apply(Error, [void 0, _b + (_c.sent())]))();
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    result = _c.sent();
                    return [2 /*return*/, result.items];
            }
        });
    });
};
exports.getPlaylists = function (accessToken, limit) {
    if (limit === void 0) { limit = 50; }
    return __awaiter(_this, void 0, void 0, function () {
        var url, response, _a, _b, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = new URL(exports.SPOTIFY_API_URL + "/me/playlists");
                    url.searchParams.append('limit', String(Math.min(limit, 50)));
                    return [4 /*yield*/, node_fetch_1["default"](String(url), {
                            headers: {
                                Authorization: "Bearer " + accessToken
                            }
                        })];
                case 1:
                    response = _c.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    _a = Error.bind;
                    _b = response.statusText + ": ";
                    return [4 /*yield*/, response.text()];
                case 2: throw new (_a.apply(Error, [void 0, _b + (_c.sent())]))();
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    result = _c.sent();
                    return [2 /*return*/, result.items];
            }
        });
    });
};
exports.getPlaylistTracks = function (accessToken, playlistId, limit) {
    if (limit === void 0) { limit = 50; }
    return __awaiter(_this, void 0, void 0, function () {
        var url, response, _a, _b, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = new URL(exports.SPOTIFY_API_URL + "/playlists/" + playlistId + "/tracks");
                    url.searchParams.append('limit', String(Math.min(limit, 50)));
                    return [4 /*yield*/, node_fetch_1["default"](String(url), {
                            headers: {
                                Authorization: "Bearer " + accessToken
                            }
                        })];
                case 1:
                    response = _c.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    _a = Error.bind;
                    _b = response.statusText + ": ";
                    return [4 /*yield*/, response.text()];
                case 2: throw new (_a.apply(Error, [void 0, _b + (_c.sent())]))();
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    result = _c.sent();
                    return [2 /*return*/, result.items];
            }
        });
    });
};
exports.getRecentTracks = function (accessToken, limit) {
    if (limit === void 0) { limit = 50; }
    return __awaiter(_this, void 0, void 0, function () {
        var url, response, _a, _b, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = new URL(exports.SPOTIFY_API_URL + "/me/player/recently-played");
                    url.searchParams.append('limit', String(Math.min(limit, 50)));
                    return [4 /*yield*/, node_fetch_1["default"](String(url), {
                            headers: {
                                Authorization: "Bearer " + accessToken
                            }
                        })];
                case 1:
                    response = _c.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    _a = Error.bind;
                    _b = response.statusText + ": ";
                    return [4 /*yield*/, response.text()];
                case 2: throw new (_a.apply(Error, [void 0, _b + (_c.sent())]))();
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    result = _c.sent();
                    return [2 /*return*/, result.items];
            }
        });
    });
};
exports.getUserData = function (_a) {
    var clientId = _a.clientId, clientSecret = _a.clientSecret, refreshToken = _a.refreshToken, _b = _a.timeRanges, timeRanges = _b === void 0 ? ['short_term', 'medium_term', 'long_term'] : _b, _c = _a.fetchPlaylists, fetchPlaylists = _c === void 0 ? true : _c, _d = _a.fetchRecent, fetchRecent = _d === void 0 ? true : _d, _e = _a.playlistId, playlistId = _e === void 0 ? '' : _e;
    return __awaiter(_this, void 0, void 0, function () {
        var access_token, playlists, _f, playlistTracks, _g, recentTracks, _h, artists, tracks;
        var _this = this;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, exports.getTokens(clientId, clientSecret, refreshToken, 'refresh_token')];
                case 1:
                    access_token = (_j.sent()).access_token;
                    if (!fetchPlaylists) return [3 /*break*/, 3];
                    return [4 /*yield*/, exports.getPlaylists(access_token)];
                case 2:
                    _f = _j.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _f = [];
                    _j.label = 4;
                case 4:
                    playlists = _f;
                    if (!playlistId) return [3 /*break*/, 6];
                    return [4 /*yield*/, exports.getPlaylistTracks(access_token, playlistId)];
                case 5:
                    _g = _j.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _g = [];
                    _j.label = 7;
                case 7:
                    playlistTracks = _g;
                    if (!fetchRecent) return [3 /*break*/, 9];
                    return [4 /*yield*/, exports.getRecentTracks(access_token)];
                case 8:
                    _h = _j.sent();
                    return [3 /*break*/, 10];
                case 9:
                    _h = [];
                    _j.label = 10;
                case 10:
                    recentTracks = _h;
                    return [4 /*yield*/, Promise.all(timeRanges.map(function (t) { return __awaiter(_this, void 0, void 0, function () {
                            var artists;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getTop(access_token, 'artists', t)];
                                    case 1:
                                        artists = (_a.sent());
                                        return [2 /*return*/, artists.map(function (artist) { return (__assign({}, artist, { time_range: t })); })];
                                }
                            });
                        }); }))];
                case 11:
                    artists = _j.sent();
                    return [4 /*yield*/, Promise.all(timeRanges.map(function (t) { return __awaiter(_this, void 0, void 0, function () {
                            var tracks;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getTop(access_token, 'tracks', t)];
                                    case 1:
                                        tracks = (_a.sent());
                                        return [2 /*return*/, tracks.map(function (track) { return (__assign({}, track, { time_range: t })); })];
                                }
                            });
                        }); }))];
                case 12:
                    tracks = _j.sent();
                    return [2 /*return*/, {
                            playlists: playlists,
                            playlistTracks: playlistTracks,
                            recentTracks: recentTracks,
                            artists: [].concat.apply([], artists),
                            tracks: [].concat.apply([], tracks)
                        }];
            }
        });
    });
};
