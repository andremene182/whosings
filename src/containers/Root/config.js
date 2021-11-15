const env = process.env.REACT_APP_ENV;

const development = {
  apiUrls: {
    musixMatch: "http://api.musixmatch.com/ws"
  },
  apiKey: "a47592f0c181ad2fa799bf0b6fd9340f"
};

const production = {
  apiUrls: {
    musixMatch: "http://api.musixmatch.com/ws"
  },
  apiKey: "a47592f0c181ad2fa799bf0b6fd9340f"
};

const config = {
  development,
  production,
};

export default config[env];