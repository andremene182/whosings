/*** Core Module ***/

//modules
import {getLyricsByTrack, getTracks, getArtistRelated} from 'modules/services';
import { extractRndElemFromArr, extractRandomInt, removeDuplicatesByKey, shuffleArray } from 'modules/utilities';


import gameConfig from 'gameConfig.json';


//Indexed DB configuration
export const dbName = 'whosings';
export const usersStore = 'users';
export const dbConfig = {
  name: dbName,
  version: 2,
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

//Musixmatch genres 
export const musicGenres = gameConfig.musicGenres;
export const totalQuestions = gameConfig.totalQuestions;

export const routes = {
  dashboard: '/dashboard',
  game: '/game',
  high_scores: '/high-scores',
  init: '/'
}

/**
 * createQuizData function
 * @author Andrea Menegazzo
 * @deprecated it was another extraction algorithm. Depreacted because of the musixmatch free dev account limits
 * @date 2021-11-12
 * @param {number} genreId
 * @param {string} language='en'
 * @returns {obj} the quiz data
 */
export const createQuizData = async (genreId, language='en') => {
  const tracksNum = 3;
  const page = extractRandomInt(5) + 1;
  const correctIndex = extractRandomInt(tracksNum);

  //get tracks by genre, only 20 to not reach the 1k hits limit
  var tracks = await getTracks(genreId, language, page, 20);

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
 * createQuizDataPack function
 * @author Andrea Menegazzo
 * @description create quiz data based on a specific genre
 * @date 2021-11-12
 * @param {number} genreId the musixmatch genre id
 * @param {any} language='en'
 * @returns {any}
 */
export const createQuizDataPack = async (genreId, quizNum = 5, language='en') => {
  const page = extractRandomInt(3) + 1;

  //get tracks by genre, only 10 to not reach the 2k hits limit easily
  var tracks = await getTracks(genreId, language, page);

  //var tracks = dummyTracks;
  if (tracks){
    //randomize and extract the tracks for the quiz
    var extractedTracks = extractRndElemFromArr(tracks, quizNum);
    
    //get artist related to the extracted tracks artist, to give options that make sense
    const artistRelated = await getArtistRelatedFromTracks(tracks);

    //create the quiz data
    let quiz = extractedTracks.map(async (track, trackIndex) => {
        return {lyrics: await(getLyricsByTrack(track.track.track_id)), 
                artists: shuffleArray([artistSchema(track.track.artist_name,true,track.track.track_name), ...artistRelated[trackIndex]])
            }
    });

    quiz = await Promise.all(quiz);

    return quiz;  
   } else {
       throw new Error("can't get the tracks");
   }
}


/**
 * getArtistRelatedFromTracks function
 * @author Andrea Menegazzo
 * @date 2021-11-13
 * @param {array} tracks the musixmatch tracks array
 * @returns {array}
 */
const getArtistRelatedFromTracks = async(tracks) => {

  const artistRelatedPromise = tracks.map((track) => {
    const artistRelated= getArtistRelated(track.track.artist_id, 4);
    return artistRelated;
  });
  var artistRelated = await Promise.all(artistRelatedPromise);

  artistRelated = artistRelated.map((related) => {
    let extractedRelated = extractRndElemFromArr(related, 2);
    extractedRelated = extractedRelated.map((artist)=> {
      return (artistSchema(artist.artist.artist_name, false, undefined));
    });
    return extractedRelated;
  });

  return artistRelated;
}



/**
 * parseLyrics function
 * @author Andrea Menegazzo
 * @date 2021-11-11
 * @param {string} lyrics the lyrics to parse.
 * @returns {string} parsed lyrics.
 */
export const parseLyrics = (lyrics) => {
  var splittedLyrics = lyrics.split('\n').filter((line) => line);
  //TODO better extraction of the lyrics
  splittedLyrics = splittedLyrics.slice(0,4);
  return splittedLyrics.join("<br/>");
}


/**
 * userSchema function
 * @author Andrea Menegazzo
 * @description describes the schema to save the user to the indexedDB
 * @date 2021-11-12
 * @param {string} username the username of the user.
 * @param {number} scores the scores of the user.
 * @param {array} games the games of the user.
 * @param {boolean} loggedIn a flag that indicates if the user is loggedIn or not.
 * @returns {object} the user object
 */
export const userSchema = (username, scores=0, games=[], loggedIn=true) => {
  return {username, scores, games, loggedIn}
}

/**
 * artistSchema function
 * @author Andrea Menegazzo
 * @description describes the artist schema which composes the quiz data 
 * @date 2021-11-13
 * @param {any} artistName
 * @param {any} correct
 * @param {any} track
 * @returns {any}
 */
export const artistSchema = (artistName, correct, track) => {
  return {artistName, correct, track}
}

/**
 * extractRndMusicGenre
 * @author Andrea Menegazzo
 * @description extracts random music genre to prepare the quiz. Genres can defined in musicGenres array!
 * @date 2021-11-13
 * @returns {any}
 */
export const extractRndMusicGenre = () => {
  const musicGenreNum = musicGenres.length;
  let extracted = extractRandomInt(musicGenreNum);
  console.log(extracted);
  return musicGenres[extracted];
}

/**
 * addNewGame function
 * @author Andrea Menegazzo
 * @description creates game data to save on the DB
 * @date 2021-11-12
 * @param {any} userGames
 * @param {any} gamesToKeep=5
 * @returns {any}
 */
export const addNewGame = (userGames, scores, gamesToKeep = 5) => {
    if (userGames.length === gamesToKeep) {
      userGames.shift();
    }
    const addNewGame = {gameDate: new Date(), scores: scores};
    userGames.push(addNewGame);
    return userGames;
}