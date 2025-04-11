<template>
  <div class="layout">
    <Navbar />
    <div class="content-wrapper">
      <main class="main-content">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from '/components/navigations/navbar.vue';
import Footer from '/components/navigations/footer.vue';

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      scrollPosition: 0
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  beforeUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
    handleScroll() {
      if (typeof window !== 'undefined') {
        this.scrollPosition = window.scrollY;

        // Get the navbar element
        const navbar = this.$refs.navbar.$el;

        // Calculate opacity based on scroll position
        // Start becoming transparent after 50px of scroll
        const opacity = Math.min(1, this.scrollPosition / 50);

        // Apply background opacity
        navbar.style.backgroundColor = `rgba(255, 255, 255, ${1 - opacity * 0.9})`;
        navbar.style.backdropFilter = `blur(${opacity * 5}px)`;
        navbar.style.boxShadow = opacity > 0
            ? 'var(--shadow-sm)'
            : 'none';
      }
    }
  }
}
</script>

<style>
.layout {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  z-index: 1;
}

.main-content {
  flex: 1;
  position: relative;
  z-index: 2;
  padding-top: var(--nav-height);
}

footer {
  position: relative;
  z-index: 0;
}

@media (min-width: 768px) {
  .main-content {
    padding-top: var(--nav-height);
  }
}
</style>