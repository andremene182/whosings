/*** Services Module ***/

import {
  callRestApi
} from "modules/Utilities"

export const getTracks = async (genreId, lyricsLanguage = 'en', page = 1, pageSize = 20) => {
  try {
    const tracks = await callRestApi('track.search', {
      f_music_genre_id: genreId,
      page_size: pageSize,
      s_track_rating: 'desc',
      f_lyrics_language: lyricsLanguage,
      page: page
    });
    let gettedTracks = tracks.message.body.track_list;
    if(gettedTracks.length > 0)
      return gettedTracks;
    else
      throw new Error("tracks not found");
  } catch (e) {
    throw new Error(e.message);
  }
}

export const getSnippetByTrack = async (trackId) => {
  try {
    const snippet = await callRestApi('track.snippet.get', {
      track_id: trackId
    });
    if (snippet.message.body.snippet)
      return snippet.message.body.snippet.snippet_body;
    else 
      throw new Error('snippet of track id ' + trackId + ' not found')
  } catch (e) {
    throw new Error(e.message);
  }
}

export const getArtistRelated = async (artistId, relatedNum) => {
  try {
    const related = await callRestApi('artist.related.get', {
      artist_id: artistId,
      page_size: relatedNum
    });
      return related.message.body.artist_list;
  } catch (e) {
    throw new Error(e.message);
  }
}