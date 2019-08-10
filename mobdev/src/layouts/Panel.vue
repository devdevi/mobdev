<template>
    <section>
          <b-field grouped>
          <b-field expanded>
            <b-autocomplete
                v-model="name"
                :data="filteredDataArray"
                placeholder="ej; bulldog french..."
                icon="magnify"
                :keep-first="true"
                :open-on-focus="true"
                @select="getImages">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-field>
        <b-field >
            <button class="button is-primary  is-fullwidth is-capitalized"
      @click="reset">reset all filters</button>
        </b-field>
    </b-field>
            <div class="columns is-multiline">
              <div class="column" v-for="(data, index) in breeds" :key="index">
                <button class="button is-capitalized"
                :class="[data.isActive ? 'is-primary': 'is-inverted is-outlined']"
                @click.prevent='hiddenBreed(data.key, data.isActive)'>
                <span>{{data.key}}</span>
                </button>
              </div>
            </div>
    </section>
</template>
<script>
// Services
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'DogApiPanel',
  data() {
    return {
      name: '',
      selected: null,
    };
  },
  // props:{
  //   limit: {
  //     type: Number,
  //     required: false,
  //   },
  // },
  mounted() {
    this.SEARCH()
      .then(() => console.log('Cargando data'));
  },
  computed: {
    ...mapGetters(['listAllBreeds', 'breeds', 'byBreed', 'bySubBreed', 'limit']),
    filteredDataArray() {
      return this.listAllBreeds.filter(option => option
        .toString()
        .toLowerCase()
        .indexOf(this.name.toLowerCase()) >= 0);
    },
  },
  methods: {
    ...mapActions(['SEARCH', 'GET_ASYNC_PICTURES', 'TOGGLE_BREED_STATE', 'RESET_FILTERS']),
    ...mapMutations(['SET_LIMIT']),
    getImages(name) {
      this.GET_ASYNC_PICTURES({ name })
        .then(() => console.log(`Cargando imagenes de ${name}`));
    },
    hiddenBreed(name, val) {
      const value = !val;
      this.TOGGLE_BREED_STATE({ name, value });
    },
    reset() {
      this.RESET_FILTERS();
    },
    setLimit(val) {
      this.SET_LIMIT({ val });
    },
  },
};

</script>
