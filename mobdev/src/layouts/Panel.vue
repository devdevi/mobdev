<template>
  <nav class="panel">
    <p class="panel-heading">repositories</p>
    <div class="panel-block">
      <b-field label="Find a JS framework">
            <b-autocomplete
                rounded
                v-model="name"
                :data="filteredDataArray"
                placeholder="e.g. jQuery"
                icon="magnify"
                :keep-first="true"
                :open-on-focus="true"
                @select="getImages">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-field>
    </div>
    <p class="panel-tabs">
      <a class="is-active">all</a>
      <a v-for="(breed, val, index) in breeds" :key="index">
          {{breed.key}}
      </a>
      <a>by Breed</a>
      <a>by Sub Breed</a>
    </p>
    <div v-for="(data, index) in breeds" :key="index">
    <a class="panel-block"
      :class="data.isActive ? 'is-active': ''">
      <label  class="panel-block" >
      <b-checkbox :value="data.isActive" @click.native='hiddeBreed(data.key)'>
          {{data.key}}
      </b-checkbox>
    </label>
    </a>
    </div>
    <div class="panel-block">
      <button class="button is-link is-outlined is-fullwidth"
      @click="reset">reset all filters</button>
    </div>
  </nav>
</template>
<script>
// Services
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DogApiPanel',
  data() {
    return {
      name: '',
      selected: null,
    };
  },
  mounted() {
    this.SEARCH()
      .then(() => console.log('Cargando data'));
  },
  computed: {
    ...mapGetters(['listAllBreeds', 'breeds', 'byBreed', 'bySubBreed']),
    filteredDataArray() {
      return this.listAllBreeds.filter(option => option
        .toString()
        .toLowerCase()
        .indexOf(this.name.toLowerCase()) >= 0);
    },
  },
  methods: {
    ...mapActions(['SEARCH', 'GET_ASYNC_PICTURES', 'TOGGLE_BREED_STATE', 'RESET_FILTERS']),
    getImages(name) {
      console.log(name);
      this.GET_ASYNC_PICTURES({ name })
        .then(() => console.log(`Cargando imagenes de ${name}`));
    },
    hiddeBreed(name) {
      this.TOGGLE_BREED_STATE({ name });
    },
    reset() {
      this.RESET_FILTERS();
    },
  },
};

</script>
