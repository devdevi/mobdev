<template>
  <div class="container-fluid has-text-centered">
    <div class="columns is-mobile is-centered">
    <div class="column is-half">
        <figure class="is-128x128">
        <img  class="is-128x128" alt="Vue logo" src="../assets/logo.png">
      </figure>
    </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-10 is-clearfix">
    <dog-api-panel :limit="limit"></dog-api-panel>
      </div>
    </div>
     <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
    <div class="columns is-centered" v-if="!isLoading">
      <div class="column is-10">
        <b-tabs position="is-centered is-capitalized" size="is-small">
          <div v-for="(data, index) in breeds" :key="index" >
            <template v-if="data.isActive">
                <b-tab-item :label="data.key">
                <breed-gallery :pictures="data.value" :limit="limit"> </breed-gallery>
                </b-tab-item>
            </template>
         </div>
        </b-tabs>
      </div>
      </div>
        <HelloWorld msg="Hecho con Vue, Buefy."/>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
// Components
import DogApiPanel from '@/layouts/Panel.vue';
import BreedGallery from '@/components/BreedGallery.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    DogApiPanel,
    BreedGallery,
  },
  data() {
    return {
    };
  },
  created() {
  },
  computed: {
    ...mapGetters(['breeds', 'limit', 'isLoading', 'activeTab']),
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
