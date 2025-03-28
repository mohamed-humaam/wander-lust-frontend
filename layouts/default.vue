<template>
  <div class="layout">
    <!-- Navbar at the top -->
    <Navbar />

    <!-- Main content area -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footer at the bottom -->
    <Footer />

  </div>
</template>

<script>
export default {}
</script>

<style>
/* Base layout */
.layout {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
}

.main-content {
  //padding-top: 80px;
  flex: 1;
  //padding-left: 20px;
  //padding-right: 20px;
  //padding-bottom: 20px;
}

/* Media query to match navbar.vue responsive breakpoint */
@media (min-width: 768px) {
  .main-content {
    //padding-top: 100px;
  }
}
</style>