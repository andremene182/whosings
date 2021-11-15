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
    'apikey': config.apiKey
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
    const status = res.data.message.header.status_code;
    if(status !== 200){
      throw new Error("api problems - maybe you're not authorized - status code: " + status);
    } else {
      return res.data;
    }
  } catch (error) {
    if (error.response) {
      throw new Error("response error");
    } 
    else if (error.request) {
      throw new Error("request error");
    } else {
      throw new Error(error.message);
    }
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