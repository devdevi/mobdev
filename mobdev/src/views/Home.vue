<template>
  <div class="container-fluid has-text-centered">
    <div class="columns is-mobile is-centered">
    <div class="column is-half">
        <figure class="is-128x128">
        <img alt="Vue logo" src="../assets/logo.png">
      </figure>
    </div>
    </div>
    <div class="columns is-centered is-4">
      <div class="column is-4 is-clearfix">
    <dog-api-panel></dog-api-panel>
      </div>
      <div class="column is-8">
         <div class="columns is-multiline is-mobile is-2 is-cenered"
         v-for="(breed, index) in breeds" :key="index">
         <template v-if="breed.isActive">
            <div class="column"
            v-for="(picture, index) in breed.value.slice(0,limit)" :key="index" >
              <figure class="image is-128x128">
                <img  class="image is-128x128" :src="picture">
              </figure>
            </div>
         </template>
      </div>
      </div>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
// Components
import DogApiPanel from '@/layouts/Panel.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    DogApiPanel,
  },
  data() {
    return {

    };
  },
  created() {
  },
  computed: {
    ...mapGetters(['breeds', 'limit']),
  },
  methods: {
  },
};

</script>

<style lang="scss" scoped>
img {
  max-height: 250px;
}
</style>
