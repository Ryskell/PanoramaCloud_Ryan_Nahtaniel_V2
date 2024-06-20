<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue'; // Assurez-vous que ce chemin est correct et que le composant NavBar existe

export default defineComponent({
  components: {
    NavBar,
  },
});
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>
