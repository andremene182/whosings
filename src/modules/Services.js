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
    return tracks.message.body.track_list;
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getSnippetByTrack = async (trackId) => {
  try {
    const track = await callRestApi('track.snippet.get', {
      track_id: trackId
    });
    if (track.message.body) {
      const snippet = track.message.body.snippet.snippet_body;
      return snippet;
    } else {
      throw new Error('track not found')
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

export const getArtistRelated = async (artistId, relatedNum) => {
  try {
    const track = await callRestApi('artist.related.get', {
      artist_id: artistId,
      page_size: relatedNum
    });
    if (track.message.body) {
      return track.message.body.artist_list;
    } else {
      throw new Error("there's no related artists")
    }
  } catch (e) {
    throw new Error(e.message);
  }
}