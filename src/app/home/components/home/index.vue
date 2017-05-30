<template>
  <div class="home">
    <button v-on:click='testClick'>点击</button>
    {{ msg }}
    <router-link :to="{ name: 'News' }">{{ test1 }}</router-link>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>

<style lang='scss'>
  @import "./index.scss";
</style>
