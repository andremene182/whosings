/*** Services Module ***/

import { callRestApi } from "modules/utilities"

/**
 * getTracks function
 * @author Andrea Menegazzo
 * @date 2021-11-10
 * @description gets music tracks by parameters.
 * @param {number} genreId the musixmatch genreId. Useful to filter tracks by genre.
 * @param {string} lyricsLanguage the language of the tracks lyrics.
 * @param {number} page the page to retrieve.
 * @param {number} pageSize the number of tracks per page.
 * @returns {object} the tracks.
 */
export const getTracks = async(genreId, lyricsLanguage='en', page=1, pageSize=50) => {
  try{
    const tracks = await callRestApi('track.search',{f_music_genre_id: genreId, page_size: pageSize, s_track_rating: 'desc', f_lyrics_language: lyricsLanguage, page: page});
    return tracks.message.body.track_list;
  } catch (e) {
    throw new Error(e.message)
  }
}

/**
 * getLyricksByTrack function
 * @author Andrea Menegazzo
 * @date 2021-11-10
 * @param {number} trackId the musixmatch track id
 * @returns {string} the lyrics
 */
export const getLyricsByTrack = async(trackId) => {
  try{
    const track = await callRestApi('track.lyrics.get',{track_id: trackId, f_has_lyrics: true});
    if(track.message.body){
      return track.message.body.lyrics.lyrics_body;
    } else {
      throw new Error('track not found')
    }
  } catch (e) {
    throw new Error(e.message);
  }
}