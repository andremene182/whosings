/** CONFIG file **/

//Environment
const env = process.env.REACT_APP_ENV;

 

const development = {
  apiUrls: {
    musixMatch: "http://api.musixmatch.com/ws"
  },
};

const production = {
  apiUrls: {
    musixMatch:"http://api.musixmatch.com/ws"
  }
};

const config = {
  development,
  production,
};

export default config[env];