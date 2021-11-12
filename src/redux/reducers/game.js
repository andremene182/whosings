import {
  START_GAME
} from "redux/actions/types";


var initialState = {isPlaying: false};

export default function Game (state = initialState, action) {

  const { type, payload } = action;

  switch (type) {
    case START_GAME:
      return {
        ...state,
        isPlaying: true
      };
    default:
      return state;
  }
  
}