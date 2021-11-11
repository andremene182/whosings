//This Store will bring Actions and Reducers together and hold the Application state.

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

//Con questo comando si associa il reducer allo store. Lo store "capisce" che quel reducer modificherà i suoi dati.
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;