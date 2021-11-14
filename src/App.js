import './App.css';

//containers
import Root from 'containers/Root';

import { initDB } from "react-indexed-db";
import {dbConfig} from "modules/core";


initDB(dbConfig);


function App() {
  return (
    <Root />
  );
}

export default App;
