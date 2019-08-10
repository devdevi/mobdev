<template>
  <div class="columns is-multiline is-mobile is-2 is-cenered">
    <div class="column"
      v-for="(picture, index) in pictures.slice(0,limit)"
      :key="index" >
      <figure class="image is-128x128">
        <img  class="image is-128x128" :src="picture">
      </figure>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Breed',
  props: {
    limit: {
      type: Number,
      required: true,
    },
    pictures: {
      type: Array,
      required: true,
    },
  },
};

</script>
