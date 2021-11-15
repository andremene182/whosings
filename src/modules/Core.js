/*** Core Module ***/

//modules
import {
  getSnippetByTrack,
  getTracks,
  getArtistRelated
} from 'modules/Services';
import {
  extractRndElemFromArr,
  extractRandomInt,
  removeDuplicatesByKey,
  shuffleArray
} from 'modules/Utilities';
import gameConfig from 'gameConfig.json';

//Indexed DB configuration
export const dbName = 'whosings';
export const usersStore = 'users';
export const musicGenres = gameConfig.musicGenres;
export const totalQuestions = gameConfig.totalQuestions;

export const dbConfig = {
  name: dbName,
  version: gameConfig.dbVersion,
  objectStoresMeta: [{
    store: usersStore,
    storeConfig: {
      keyPath: 'id',
      autoIncrement: true
    },
    storeSchema: [{
        name: 'username',
        keypath: 'username',
        options: {
          unique: true
        }
      },
      {
        name: 'scores',
        keypath: 'scores',
        options: {
          unique: false
        }
      },
      {
        name: 'games',
        keypath: 'games',
        options: {
          unique: false
        }
      },
      {
        name: 'loggedIn',
        keypath: 'loggedIn',
        options: {
          unique: false
        }
      }
    ]
  }]
};



export const routes = {
  dashboard: '/dashboard',
  game: '/game',
  high_scores: '/high-scores',
  init: '/'
}


export const createQuizData = async (genreId, language = 'en') => {
  const tracksNum = 3;
  const page = extractRandomInt(5) + 1;
  const correctIndex = extractRandomInt(tracksNum);
  var tracks = await getTracks(genreId, language, page, 20);
  tracks = removeDuplicatesByKey(tracks, data => data.track.artist_id);
  var extractedTracks = extractRndElemFromArr(tracks, tracksNum);

  extractedTracks = extractedTracks.map((track) => {
    return {
      artist: track.track.artist_name,
      track: track.track.track_name,
      id: track.track.track_id
    }
  });

  const correctTrack = extractedTracks[correctIndex];
  correctTrack.correct = true;

  var snippet = await getSnippetByTrack(correctTrack.id);
  const quiz = {
    lyrics: snippet,
    tracks: extractedTracks
  };

  return quiz;
}


export const createQuizDataPack = async (genreId, quizNum = 5, language = 'en') => {
  const page = extractRandomInt(3) + 1;
  var tracks = await getTracks(genreId, language, page, 20);
  tracks = removeDuplicatesByKey(tracks, data => data.track.artist_id);
  if (tracks) {
    var extractedTracks = extractRndElemFromArr(tracks, quizNum);
    const artistRelated = await getArtistRelatedFromTracks(extractedTracks);
    let quiz = extractedTracks.map(async (track, trackIndex) => {
      return {
        lyrics: await (getSnippetByTrack(track.track.track_id)),
        artists: shuffleArray([artistSchema(track.track.artist_name, true, track.track.track_name), ...artistRelated[trackIndex]])
      }
    });

    quiz = await Promise.all(quiz);

    return quiz;
  } else {
    throw new Error("can't get the tracks");
  }
}


const getArtistRelatedFromTracks = async (tracks) => {

  var related = [];
  for (const track of tracks) {
    
    var artistRelated = await getArtistRelated(track.track.artist_id, 4);
    let extractedRelated;

    if (artistRelated.length >= 2) {
      extractedRelated = extractRndElemFromArr(artistRelated, 2);
      extractedRelated = extractedRelated.map((artist) => {
        return (artistSchema(artist.artist.artist_name, false, undefined));
      });
    } else {
      let cleanTracks = tracks.filter((item) => {
        return item.track.artist_id !== track.track.artist_id;
      });
      extractedRelated = extractRndElemFromArr(cleanTracks, 2);
      extractedRelated = extractedRelated.map((track) => {
        return (artistSchema(track.track.artist_name, false, undefined));
      });
    }
    related.push(extractedRelated);
  }

  return related;
}

export const userSchema = (username, scores = 0, games = [], loggedIn = true) => {
  return {
    username,
    scores,
    games,
    loggedIn
  }
}


export const artistSchema = (artistName, correct, track) => {
  return {
    artistName,
    correct,
    track
  }
}

export const extractRndMusicGenre = () => {
  const musicGenreNum = musicGenres.length;
  let extracted = extractRandomInt(musicGenreNum);
  return musicGenres[extracted];
}

export const addNewGame = (userGames, scores, gamesToKeep = 5) => {
  if (userGames.length === gamesToKeep) {
    userGames.shift();
  }
  const addNewGame = {
    gameDate: new Date(),
    scores: scores
  };
  userGames.push(addNewGame);
  return userGames;
}