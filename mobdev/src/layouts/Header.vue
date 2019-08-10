
<template>
  <b-navbar class="">
    <template slot="brand">
      <b-navbar-item href="/">
        <img alt="logo" src="../assets/logo.png" />
      </b-navbar-item>
    </template>
    <template slot="start">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">

</style>
