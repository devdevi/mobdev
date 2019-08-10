import axios from 'axios';
import configService from './config';

const dogApiService = axios.create({
  baseURL: configService.apiUrl,
  // headers: {'X-Custom-Header': ''}
});

export default dogApiService;
