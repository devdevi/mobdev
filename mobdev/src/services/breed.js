import dogApiServices from './dog_api';


// https://github.com/axios/axios
const dogApiService = {};

dogApiService.getImage = function getImage(q) {
  return dogApiServices.get(`breed/${q}/images`)
    .then(res => res.data);
};

dogApiService.search = function getBreeds() {
  return dogApiServices.get('breeds/list/all')
    .then(res => res.data);
};

export default dogApiService;
