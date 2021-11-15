/*** Core Module ***/

//modules
import {
  getSnippetByTrack,
  getTracks,
  getArtistRelated
} from 'modules/services';
import {
  extractRndElemFromArr,
  extractRandomInt,
  removeDuplicatesByKey,
  shuffleArray
} from 'modules/utilities';
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
  var tracks = await getTracks(genreId, language, page);
  if (tracks) {
    var extractedTracks = extractRndElemFromArr(tracks, quizNum);
    const artistRelated = await getArtistRelatedFromTracks(tracks);

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

  const artistRelatedPromise = tracks.map((track) => {
    const artistRelated = getArtistRelated(track.track.artist_id, 4);
    return artistRelated;
  });
  var artistRelated = await Promise.all(artistRelatedPromise);

  artistRelated = artistRelated.map((related) => {
    let extractedRelated = extractRndElemFromArr(related, 2);
    extractedRelated = extractedRelated.map((artist) => {
      return (artistSchema(artist.artist.artist_name, false, undefined));
    });
    return extractedRelated;
  });

  return artistRelated;
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