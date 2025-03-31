<template>
  <div class="home-page">
    <Hero />

    <AirlineCarousel />

    <WhyUs />
  </div>
</template>

<script>
import Hero from '~/components/homepage/Hero.vue'
import AirlineCarousel from '~/components/homepage/AirlineCarousel.vue'
import WhyUs from "~/components/homepage/WhyUs.vue";

export default {
  name: 'HomePage',
  components: {
    WhyUs,
    Hero,
    AirlineCarousel
  }
}
</script>

<style>
/* Any global styles for the home page can be added here */
</style>