import {
  LOGIN_SUCCESS,
  LOGOUT,
} from "redux/actions/types";


var initialState = {
  isLoggedIn: null
};

export default function Auth(state = initialState, action) {

  const {
    type,
    payload
  } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
          user: payload
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
          user: null,
      };
    default:
      return state;
  }

}