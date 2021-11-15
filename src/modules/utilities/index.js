/*** Utilities Module ***/

//modules
import axios from 'axios';

//config
import config from 'containers/Root/config';

export const callRestApi = async (
  apiMethod,
  params,
  body,
  headers,
  httpMethod = 'get',
  baseUrl = config.apiUrls.musixMatch,
  version = '1.1',
  authToken = {
    'apikey': process.env.REACT_APP_MUSIXMATCH_API_KEY
  },
  authPosition = 'query'
) => {

  var apiUrl = baseUrl + '/' + version + '/' + apiMethod;

  //just to avoid the cors problem
  if (process.env.REACT_APP_ENV === "development") {
    apiUrl = process.env.REACT_APP_PROXY_URL + apiUrl;
  }

  var axiosOptions = {
    method: httpMethod,
    url: apiUrl,
  }

  if (params)
    axiosOptions.params = params;

  if (body)
    axiosOptions.data = body;

  if (headers)
    axiosOptions.headers = {
      ...axiosOptions.headers,
      ...headers
    }

  if (authPosition === 'query')
    axiosOptions.params = {
      ...params,
      ...authToken
    }

  else if (authPosition === 'body')
    axiosOptions.body = {
      ...body,
      ...authToken
    }

  else if (authPosition === 'header')
    axiosOptions.headers = {
      ...headers,
      ...authToken
    }

  try {
    const res = await axios(axiosOptions);
    return res.data;
  } catch (error) {
    throw error;
  }

};


export const extractRndElemFromArr = (arr, nToExtract) => {
  const extracted = shuffleArray(arr).slice(0, nToExtract);
  return extracted;
}


export const shuffleArray = (arr) => {
  const shuffled = arr.sort(() => {
    return .5 - Math.random()
  });
  return shuffled;
}


export const extractRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

export const removeDuplicatesByKey = (arr, key) => {
  return [
    ...new Map(arr.map(x => [key(x), x]))
    .values()
  ]
}