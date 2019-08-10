import Vue from 'vue';
import Vuex from 'vuex';
// Services
import dogApiService from '@/services/breed';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breeds: {},
    listAllBreeds: [],
    byBreed: [],
    bySubBreed: {},
    breed: {
      breed: '',
      subBreed: [],
    },
    newDictBreed: {
      key: null,
      value: null,
      isActive: false,
    },
    isLoading: false,
    selectedBreed: '',
    limit: 25,
    activeTab: 0,
  },
  getters: {
    listAllBreeds: state => state.listAllBreeds,
    breeds: state => state.breeds,
    limit: state => state.limit,
    byBreed: state => state.byBreed,
    bySubBreed: state => state.bySubBreed,
    isLoading: state => state.isLoading,
    activeTab: state => state.activeTab,
  },
  mutations: {
    SET_ALL_BREEDS(state, dataBreeds) {
      state.listAllBreeds = dataBreeds;
    },
    SET_BY_BREED: (state, breed) => {
      state.byBreed.push(breed);
    },
    SET_BY_SUB_BREED: (state, { name, subBreed }) => {
      const obj = {};
      obj[name] = subBreed;
      state.bySubBreed = { ...state.bySubBreed, ...obj };
    },
    PUSH_TO_BREEDS: (state, data) => {
      const obj = {};
      obj[data.key] = data;
      state.breeds = { ...state.breeds, ...obj };
    },
    SET_BREED_STATE: (state, { name, value }) => {
      state.breeds[name].isActive = value;
      if (!value) {
        state.activeTab -= 1;
      }
    },
    SET_RESET_FILTERS: (state) => {
      state.breeds = {};
    },
    SET_IS_LOADING: (state) => {
      state.isLoading = !state.isLoading;
    },
    SET_ACTIVE_TAB: (state) => {
      state.activeTab = Object.keys(state.breeds).length - 1;
    },
    SET_LIMIT: (state, { val }) => {
      state.limit = val;
    },
  },
  actions: {
    SEARCH({ commit }) {
      dogApiService.search().then((res) => {
        const breeds = res.message;
        const dataBreeds = [];
        Object.entries(breeds).forEach(([key, value]) => {
          if (value.length) {
            const breed = key;
            const subBreed = [];
            value.forEach((val) => {
              subBreed.push(val);
              dataBreeds.push(`${key} ${val}`);
            });
            commit('SET_BY_SUB_BREED', { breed, subBreed });
          } else {
            commit('SET_BY_BREED', key);
            dataBreeds.push(key);
          }
        });
        commit('SET_ALL_BREEDS', dataBreeds);
      });
    },
    GET_ASYNC_PICTURES({ commit }, { name }) {
      if (name) {
        if (!(name in this.state.breeds)) {
          commit('SET_IS_LOADING');
          let breed = name.split(' ');
          if (breed) {
            breed = breed.join('/');
          }
          dogApiService.getImage(breed).then((res) => {
            const data = { key: name, value: res.message, isActive: true };
            commit('PUSH_TO_BREEDS', data);
            commit('SET_IS_LOADING');
            commit('SET_ACTIVE_TAB');
          });
        }
      }
    },
    TOGGLE_BREED_STATE: ({ commit }, { name, value }) => {
      commit('SET_BREED_STATE', { name, value });
    },
    RESET_FILTERS({ commit }) {
      commit('SET_RESET_FILTERS');
    },
    GET_ACTIVE_TAB({ commit }) {
      commit('SET_ACTIVE_TAB');
    },
  },
});
