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
  //TODO activate
  var tracks = await getTracks(genreId, language, page);

  //var tracks = dummyTracks;

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


const dummyTracks = 
[
  {
      "track": {
          "track_id": 87181812,
          "track_name": "Demons",
          "track_name_translation_list": [],
          "track_rating": 81,
          "commontrack_id": 10626637,
          "instrumental": 0,
          "explicit": 1,
          "has_lyrics": 1,
          "has_subtitles": 1,
          "has_richsync": 1,
          "num_favourite": 82050,
          "album_id": 21084425,
          "album_name": "Night Visions",
          "artist_id": 13895270,
          "artist_name": "Imagine Dragons",
          "track_share_url": "https://www.musixmatch.com/lyrics/Imagine-Dragons/Demons?utm_source=application&utm_campaign=api&utm_medium=me%3A1409622233319",
          "track_edit_url": "https://www.musixmatch.com/lyrics/Imagine-Dragons/Demons/edit?utm_source=application&utm_campaign=api&utm_medium=me%3A1409622233319",
          "restricted": 0,
          "updated_time": "2021-09-01T16:08:03Z",
          "primary_genres": {
              "music_genre_list": [
                  {
                      "music_genre": {
                          "music_genre_id": 1133,
                          "music_genre_parent_id": 14,
                          "music_genre_name": "Pop/Rock",
                          "music_genre_name_extended": "Pop / Pop/Rock",
                          "music_genre_vanity": "Pop-Pop-Rock"
                      }
                  },
                  {
                      "music_genre": {
                          "music_genre_id": 1144,
                          "music_genre_parent_id": 21,
                          "music_genre_name": "Adult Alternative",
                          "music_genre_name_extended": "Rock / Adult Alternative",
                          "music_genre_vanity": "Rock-Adult-Alternative"
                      }
                  },
                  {
                      "music_genre": {
                          "music_genre_id": 20,
                          "music_genre_parent_id": 34,
                          "music_genre_name": "Alternative",
                          "music_genre_name_extended": "Alternative",
                          "music_genre_vanity": "Alternative"
                      }
                  },
                  {
                      "music_genre": {
                          "music_genre_id": 21,
                          "music_genre_parent_id": 34,
                          "music_genre_name": "Rock",
                          "music_genre_name_extended": "Rock",
                          "music_genre_vanity": "Rock"
                      }
                  }
              ]
          }
      }
  },
  {
      "track": {
          "track_id": 114565919,
          "track_name": "Sharp Dressed Man",
          "track_name_translation_list": [],
          "track_rating": 86,
          "commontrack_id": 383062,
          "instrumental": 0,
          "explicit": 0,
          "has_lyrics": 1,
          "has_subtitles": 1,
          "has_richsync": 0,
          "num_favourite": 690,
          "album_id": 23948513,
          "album_name": "Eliminator",
          "artist_id": 1294,
          "artist_name": "ZZ Top",
          "track_share_url": "https://www.musixmatch.com/lyrics/ZZ-Top/Sharp-Dressed-Man?utm_source=application&utm_campaign=api&utm_medium=me%3A1409622233319",
          "track_edit_url": "https://www.musixmatch.com/lyrics/ZZ-Top/Sharp-Dressed-Man/edit?utm_source=application&utm_campaign=api&utm_medium=me%3A1409622233319",
          "restricted": 0,
          "updated_time": "2021-06-30T14:38:12Z",
          "primary_genres": {
              "music_genre_list": [
                  {
                      "music_genre": {
                          "music_genre_id": 7,
                          "music_genre_parent_id": 34,
                          "music_genre_name": "Electronic",
                          "music_genre_name_extended": "Electronic",
                          "music_genre_vanity": "Electronic"
                      }
                  },
                  {
                      "music_genre": {
                          "music_genre_id": 14,
                          "music_genre_parent_id": 34,
                          "music_genre_name": "Pop",
                          "music_genre_name_extended": "Pop",
                          "music_genre_vanity": "Pop"
                      }
                  },
                  {
                      "music_genre": {
                          "music_genre_id": 21,
                          "music_genre_parent_id": 34,
                          "music_genre_name": "Rock",
                          "music_genre_name_extended": "Rock",
                          "music_genre_vanity": "Rock"
                      }
                  },
                  {
                      "music_genre": {
                          "music_genre_id": 1147,
                          "music_genre_parent_id": 21,
                          "music_genre_name": "Blues-Rock",
                          "music_genre_name_extended": "Rock / Blues-Rock",
                          "music_genre_vanity": "Rock-Blues-Rock"
                      }
                  },
                  {
                      "music_genre": {
                          "music_genre_id": 1152,
                          "music_genre_parent_id": 21,
                          "music_genre_name": "Hard Rock",
                          "music_genre_name_extended": "Rock / Hard Rock",
                          "music_genre_vanity": "Rock-Hard-Rock"
                      }
                  }
              ]
          }
      }
  },
  {
      "track": {
          "track_id": 73446919,
          "track_name": "Wildest Dreams",
          "track_name_translation_list": [
              {
                  "track_name_translation": {
                      "language": "JA",
                      "translation": "ワイルデスト・ドリームス"
                  }
              }
          ],
          "track_rating": 81,
          "commontrack_id": 43410236,
          "instrumental": 0,
          "explicit": 1,
          "has_lyrics": 1,
          "has_subtitles": 1,
          "has_richsync": 1,
          "num_favourite": 81253,
          "album_id": 19649460,
          "album_name": "1989",
          "artist_id": 259675,
          "artist_name": "Taylor Swift",
          "track_share_url": "https://www.musixmatch.com/lyrics/Taylor-Swift/Wildest-Dreams-2?utm_source=application&utm_campaign=api&utm_medium=me%3A1409622233319",
          "track_edit_url": "https://www.musixmatch.com/lyrics/Taylor-Swift/Wildest-Dreams-2/edit?utm_source=application&utm_campaign=api&utm_medium=me%3A1409622233319",
          "restricted": 0,
          "updated_time": "2021-09-17T13:51:53Z",
          "primary_genres": {
              "music_genre_list": [
                  {
                      "music_genre": {
                          "music_genre_id": 7,
                          "music_genre_parent_id": 34,
                          "music_genre_name": "Electronic",
                          "music_genre_name_extended": "Electronic",
                          "music_genre_vanity": "Electronic"
                      }
                  },
                  {
                      "music_genre": {
                          "music_genre_id": 14,
                          "music_genre_parent_id": 34,
                          "music_genre_name": "Pop",
                          "music_genre_name_extended": "Pop",
                          "music_genre_vanity": "Pop"
                      }
                  },
                  {
                      "music_genre": {
                          "music_genre_id": 20,
                          "music_genre_parent_id": 34,
                          "music_genre_name": "Alternative",
                          "music_genre_name_extended": "Alternative",
                          "music_genre_vanity": "Alternative"
                      }
                  },
                  {
                      "music_genre": {
                          "music_genre_id": 21,
                          "music_genre_parent_id": 34,
                          "music_genre_name": "Rock",
                          "music_genre_name_extended": "Rock",
                          "music_genre_vanity": "Rock"
                      }
                  }
              ]
          }
      }
  },
  {
      "track": {
          "track_id": 31184528,
          "track_name": "Bohemian Rhapsody",
          "track_name_translation_list": [
              {
                  "track_name_translation": {
                      "language": "JA",
                      "translation": "ボヘミアン・ラプソディ"
                  }
              }
          ],
          "track_rating": 81,
          "commontrack_id": 132596592,
          "instrumental": 0,
          "explicit": 0,
          "has_lyrics": 1,
          "has_subtitles": 1,
          "has_richsync": 1,
          "num_favourite": 18,
          "album_id": 13785654,
          "album_name": "A Night at the Opera",
          "artist_id": 118,
          "artist_name": "Queen",
          "track_share_url": "https://www.musixmatch.com/lyrics/Queen/Bohemian-Rhapsody-7?utm_source=application&utm_campaign=api&utm_medium=me%3A1409622233319",
          "track_edit_url": "https://www.musixmatch.com/lyrics/Queen/Bohemian-Rhapsody-7/edit?utm_source=application&utm_campaign=api&utm_medium=me%3A1409622233319",
          "restricted": 0,
          "updated_time": "2021-09-13T14:21:29Z",
          "primary_genres": {
              "music_genre_list": [
                  {
                      "music_genre": {
                          "music_genre_id": 1152,
                          "music_genre_parent_id": 21,
                          "music_genre_name": "Hard Rock",
                          "music_genre_name_extended": "Rock / Hard Rock",
                          "music_genre_vanity": "Rock-Hard-Rock"
                      }
                  },
                  {
                      "music_genre": {
                          "music_genre_id": 21,
                          "music_genre_parent_id": 34,
                          "music_genre_name": "Rock",
                          "music_genre_name_extended": "Rock",
                          "music_genre_vanity": "Rock"
                      }
                  }
              ]
          }
      }
  },
  {
      "track": {
          "track_id": 224390618,
          "track_name": "MAMMAMIA",
          "track_name_translation_list": [],
          "track_rating": 82,
          "commontrack_id": 134267095,
          "instrumental": 0,
          "explicit": 1,
          "has_lyrics": 1,
          "has_subtitles": 1,
          "has_richsync": 1,
          "num_favourite": 29,
          "album_id": 47336327,
          "album_name": "MAMMAMIA - Single",
          "artist_id": 46735705,
          "artist_name": "Måneskin",
          "track_share_url": "https://www.musixmatch.com/lyrics/M%C3%A5neskin-1/MAMMAMIA?utm_source=application&utm_campaign=api&utm_medium=me%3A1409622233319",
          "track_edit_url": "https://www.musixmatch.com/lyrics/M%C3%A5neskin-1/MAMMAMIA/edit?utm_source=application&utm_campaign=api&utm_medium=me%3A1409622233319",
          "restricted": 0,
          "updated_time": "2021-10-08T22:08:02Z",
          "primary_genres": {
              "music_genre_list": [
                  {
                      "music_genre": {
                          "music_genre_id": 21,
                          "music_genre_parent_id": 34,
                          "music_genre_name": "Rock",
                          "music_genre_name_extended": "Rock",
                          "music_genre_vanity": "Rock"
                      }
                  }
              ]
          }
      }
  }
]


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