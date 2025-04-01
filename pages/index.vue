<template>
  <div class="home-page">
    <Hero />

    <AirlineCarousel />

    <WhyUs />

    <GoogleReviews />
  </div>
</template>

<script>
import Hero from '~/components/homepage/Hero.vue'
import AirlineCarousel from '~/components/homepage/AirlineCarousel.vue'
import WhyUs from "~/components/homepage/WhyUs.vue";
import GoogleReviews from '~/components/homepage/GoogleReviews.vue';

export default {
  name: 'HomePage',
  components: {
    WhyUs,
    Hero,
    AirlineCarousel,
    GoogleReviews
  }
}
</script>

<style>
/* Any global styles for the home page can be added here */
</style>