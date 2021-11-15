const env = process.env.REACT_APP_ENV;

const development = {
  apiUrls: {
    musixMatch: "http://api.musixmatch.com/ws"
  },
  apiKey: "2dfabb2266b1766e14b21cc71129c4ac"
};

const production = {
  apiUrls: {
    musixMatch: "http://api.musixmatch.com/ws"
  },
  apiKey: "2dfabb2266b1766e14b21cc71129c4ac"
};

const config = {
  development,
  production,
};

export default config[env];