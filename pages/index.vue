<template>
  <div class="home-page">
    <Hero />
    <AirlineCarousel />
  </div>
</template>

<script>
import Hero from '~/components/homepage/Hero.vue'
import AirlineCarousel from '~/components/homepage/AirlineCarousel.vue'

export default {
  name: 'HomePage',
  components: {
    Hero,
    AirlineCarousel
  }
}
</script>

<style>
/* Any global styles for the home page can be added here */
</style>