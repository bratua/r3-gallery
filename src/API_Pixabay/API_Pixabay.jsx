import axios from 'axios';

const API_OPTIONS = {
  apiKey: '29459770-8893fd985768567c1d8693203',
  apiURL: 'https://pixabay.com/api/',
};

axios.defaults.baseURL = API_OPTIONS.apiURL;

export const getQueryPicture = async (query, page) => {
  const url = `?q=${query}&page=${page}&key=${API_OPTIONS.apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(url);
  // console.log('api', response);
  return response.data.hits;
};
