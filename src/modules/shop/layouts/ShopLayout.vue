<template>
    <!-- component -->
<!-- Create By Joker Banny -->

  <!-- Header Navbar -->
<TopMenu/>
<RouterView/>





<!-- Footer -->
<CustomFooter/>

  

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import CustomFooter from '../components/CustomFooter.vue';
import TopMenu from '../components/TopMenu.vue';

</script>

<style scoped>

</style>