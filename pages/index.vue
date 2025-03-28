<template>
  <div class="home-page">
    <Hero />
    <!-- Add other components or sections of your homepage here -->
  </div>
</template>

<script>
import Hero from '~/components/homepage/Hero.vue'

export default {
  name: 'HomePage',
  components: {
    Hero
  }
}
</script>

<style>
/* Any global styles for the home page can be added here */
</style>