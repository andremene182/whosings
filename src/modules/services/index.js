/*** Services Module ***/

import { callRestApi } from "modules/utilities"
import {parseLyrics} from "modules/core";

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
export const getTracks = async(genreId, lyricsLanguage='en', page=1, pageSize=20) => {
  try{
    const tracks = await callRestApi('track.search',{f_music_genre_id: genreId, page_size: pageSize, s_track_rating: 'desc', f_lyrics_language: lyricsLanguage, page: page});
    return tracks.message.body.track_list;
  } catch (e) {
    console.log(e);
    throw new Error(e.message)
  }
}

/**
 * getLyricksByTrack function
 * @author Andrea Menegazzo
 * @date 2021-11-10
 * @param {number} trackId the musixmatch track id
 * @param {boolean} lyricsParsing parse lyrics to remove dirty lines 
 * @returns {string} the lyrics
 */
export const getLyricsByTrack = async(trackId, lyricsParsing = true) => {
  try{
    const track = await callRestApi('track.lyrics.get',{track_id: trackId, f_has_lyrics: true});
    if(track.message.body){
      const lyrics = track.message.body.lyrics.lyrics_body;
      if (lyricsParsing) 
        return parseLyrics(lyrics);
      else return lyrics;
     
    } else {
      throw new Error('track not found')
    }
  } catch (e) {
    throw new Error(e.message);
  }
}


/**
 * getArtistRelated function
 * @author Andrea Menegazzo
 * @description get artists related to a given artist
 * @date 2021-11-10
 * @param {number} artistId the musixmatch artist id
 * @param {number} relatedNum number of related artists to extract
 * @returns {array} the related artists
 */
export const getArtistRelated = async(artistId, relatedNum) => {
  try{
    const track = await callRestApi('artist.related.get',{artist_id: artistId, page_size: relatedNum});
    if(track.message.body){
      return track.message.body.artist_list;
    } else {
      throw new Error("there's no related artists")
    }
  } catch (e) {
    throw new Error(e.message);
  }
}