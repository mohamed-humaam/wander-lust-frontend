<template>
  <section class="overview-content-section">
    <h2 class="section-title">Overview</h2>
    <div class="package-description" v-html="description"></div>
  </section>
</template>

<script setup>
defineProps({
  description: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.overview-content-section {
  background-color: var(--background-white);
  border-radius: var(--radius-lg, 12px);
  box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1));
  padding: 1.5rem;
  height: auto;
  min-height: 0;
}

.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: var(--text-color);
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 2.5rem;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 2px;
}

.package-description {
  color: var(--text-light);
  line-height: 1.7;
  font-size: 0.95rem;
  margin-bottom: 0;
}
</style>