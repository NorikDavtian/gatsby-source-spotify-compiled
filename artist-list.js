"use strict";
exports.__esModule = true;
exports.generateArtistString = function (artists) {
    if (artists.length === 1) {
        return artists[0].name;
    }
    var additionalArtists = artists
        .slice(1, artists.length > 2 ? -1 : undefined)
        .map(function (a) { return a.name; })
        .join(', ') +
        (artists.length > 2 ? " and " + artists[artists.length - 1].name : '');
    return artists[0].name + " feat. " + additionalArtists;
};
