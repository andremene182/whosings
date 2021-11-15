import './App.css';

//containers
import Root from 'containers/Root/Root';

import {
  initDB
} from "react-indexed-db";
import {
  dbConfig
} from "modules/Core";


initDB(dbConfig);


function App() {
  return ( <Root />
  );
}

export default App;