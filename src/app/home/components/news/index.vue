<template>
  <div class="news">
    <router-link :to="{ name: 'Home' }">{{ msg }}</router-link>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>

<style lang='scss'>
  @import "./index.scss";
</style>
