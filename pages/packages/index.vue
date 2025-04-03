<!-- pages/packages/index.vue -->
<template>
  <div class="packages-page">
    <h1>Our Travel Packages</h1>
    <ClientOnly>
      <div class="packages-container">
        <template v-if="!pending && packages && packages.length">
          <ProductCard
              v-for="pkg in packages"
              :key="pkg?.id || index"
              :packageData="pkg"
          />
        </template>
        <div v-else-if="pending" class="loading">
          Loading packages...
        </div>
        <div v-else class="no-packages">
          No packages available at the moment.
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import ProductCard from '~/components/packages/ProductCard.vue';

const { data: packages, pending, error } = await useAsyncData('packages', () =>
    usePackages()
);

// Add error handling
if (error.value) {
  console.error('Error fetching packages:', error.value);
}
</script>

<style>
.packages-page {
  margin: 0 auto;
}

.packages-page h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2d3748;
}

.packages-container {
  padding: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.loading {
  text-align: center;
  padding: 2rem;
  grid-column: 1 / -1;
}
</style>