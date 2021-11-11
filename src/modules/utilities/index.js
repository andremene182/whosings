/*** Utilities Module ***/

//modules
import axios from 'axios';

//config
import config from 'containers/Root/config';

/**
 * callRestApi function
 * @author Andrea Menegazzo
 * @date 2021-11-08
 * @description calls a restFul Api.
 * @param {string} baseUrl the base url of the api. Ex: https://www.api.com
 * @param {string} version the version of the api. Ex: v1
 * @param {string} apiMethod the method of the api. Ex: chart.tracks.get
 * @param {string} httpMethod the http request method. Ex: get
 * @param {object} params the query params. Ex: {userid: 12345}
 * @param {object} body the body of the request. Usually not necessary on get requests. Ex: {firstName: 'marco'}
 * @param {object} headers the header of the request. Ex: {X-param: 'param'}
 * @param {object} authToken the auth token {key:value} object. Ex: {Authorization: 'Bearer abcd1234'}
 * @param {string} authPosition the auth token position. It must be "header", "query" or "body".
 * @returns {any} the response data
 */
export const callRestApi = async (
  apiMethod,
  params,
  body,
  headers,
  httpMethod = 'get',
  baseUrl = config.apiUrls.musixMatch,
  version = '1.1',
  authToken = {'apikey': process.env.REACT_APP_MUSIXMATCH_API_KEY},
  authPosition = 'query'
) => {
  var apiUrl = baseUrl + '/' + version + '/' + apiMethod;

  //just to avoid the cors problem
  if(process.env.REACT_APP_ENV === "development"){
    apiUrl = process.env.REACT_APP_PROXY_URL + apiUrl;
  }

  var axiosOptions = 
  {
    method: httpMethod,
    url:  apiUrl,
  }

  if (params)
    axiosOptions.params = params;
  
  if (body)
    axiosOptions.data = body;
  
  if (headers)
    axiosOptions.headers= {...axiosOptions.headers, ...headers}

  if (authPosition === 'query')
    axiosOptions.params = {...params, ...authToken}
    
  else if (authPosition === 'body')
    axiosOptions.body = {...body, ...authToken}
  
  else if (authPosition === 'header')
    axiosOptions.headers = {...headers, ...authToken}
  
  try {
    const res = await axios(axiosOptions);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


/**
 * extractRndElemFromArr function
 * @author Andrea Menegazzo
 * @date 2021-11-10
 * @param {array} arr the array from which to extract the random elements.
 * @param {number} nToExtract the number to elements to extract.
 * @returns {array} the array with random extracted elements.
 */
export const extractRndElemFromArr = (arr, nToExtract) => {
  const shuffled = arr.sort(() => {return .5 - Math.random()});
  const extracted = shuffled.slice(0,nToExtract);
  return extracted;
}


/**
 * extractRandomInt function
 * @author Andrea Menegazzo
 * @date 2021-11-10
 * @description extracts random number, in a range from 0 to max-1.
 * @param {number} limit  
 * @returns {number} the extracted number
 */
export const extractRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

/**
 * removeDuplicatesByKey
 * @author Andrea Menegazzo
 * @date 2021-11-10
 * @param {array} arr the array of object
 * @param {string} key the key of duplicates values
 * @returns {array} the filtered array of object
 */
export const removeDuplicatesByKey = (arr, key) => {
   return [
     ...new Map(arr.map(x=>[key(x),x]))
     .values()
    ]
}