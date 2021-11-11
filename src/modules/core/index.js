/*** Core Module ***/

//modules
import {getLyricsByTrack, getTracks} from 'modules/services';
import { extractRndElemFromArr, extractRandomInt, removeDuplicatesByKey } from 'modules/utilities';

//Indexed DB configuration
export const dbName = 'whosings';
export const usersStore = 'users';
export const dbConfig = {
  name: dbName,
  version: 1,
  objectStoresMeta: [
    {
      store: usersStore,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
      { name: 'username', keypath: 'username', options: { unique: true} },
      { name: 'scores', keypath: 'scores', options: { unique: false } },
      { name: 'games', keypath: 'games', options: { unique: false } },
      { name: 'loggedIn', keypath: 'loggedIn', options: { unique: false } }]
    }
  ]
};

//Musixmatch genres id
export const musicGenres = {
  rock: {name: 'rock', id: 21},
  pop: {name: 'pop', id: 14}
  //pop_rock: 1133
}


export const createQuizData = async (genreId, language='en') => {
  const tracksNum = 3;
  const page = extractRandomInt(5) + 1;
  const correctIndex = extractRandomInt(tracksNum);

  //get tracks by genre
  var tracks = await getTracks(genreId, language, page, 50);

  //remove duplicate artists
  tracks = removeDuplicatesByKey(tracks, data => data.track.artist_id);

  //randomize and extract the tracks for the quiz
  var extractedTracks = extractRndElemFromArr(tracks, tracksNum);
  
  extractedTracks = extractedTracks.map((track)=> {
    return {artist:track.track.artist_name, track: track.track.track_name, id: track.track.track_id}
  });

  //extract the winner track
  const correctTrack = extractedTracks[correctIndex];
  correctTrack.correct = true;

  //get the lyrics
  var lyrics = await getLyricsByTrack(correctTrack.id);

  const quiz = {lyrics: parseLyrics(lyrics), tracks: extractedTracks};

  return quiz;
}


/**
 * parseLyrics function
 * @author Andrea Menegazzo
 * @date 2021-11-11
 * @param {string} lyrics the lyrics to parse.
 * @returns {string} parsed lyrics.
 */
const parseLyrics = (lyrics) => {
  var splittedLyrics = lyrics.split('\n').filter((line) => line);
  //TODO better extraction of the lyrics
  splittedLyrics = splittedLyrics.slice(0,4);
  return splittedLyrics.join('\n');
}