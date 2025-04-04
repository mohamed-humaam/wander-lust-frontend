<template>
  <div>
    <ClientOnly>
      <div v-if="pending" class="loading-state">
        <p>Loading category packages...</p>
      </div>
      <div v-else-if="error" class="error-state">
        <p>Error loading packages: {{ error.message }}</p>
      </div>
      <div v-else-if="category" class="category-page">
        <!-- Category Header -->
        <div class="category-header">
          <h1>{{ category.name }}</h1>
          <p class="category-description" v-html="category.description"></p>
        </div>

        <!-- Packages Section -->
        <div class="packages-section">
          <div v-if="filteredPackages.length" class="packages-container">
            <ProductCard
                v-for="pkg in filteredPackages"
                :key="pkg.id"
                :packageData="pkg"
                @view-details="navigateToPackage"
            />
          </div>
          <div v-else class="no-packages">
            <p>No packages available in this category.</p>
            <NuxtLink to="/packages" class="back-link">Browse all packages</NuxtLink>
          </div>
        </div>
      </div>
      <div v-else class="not-found">
        <p>Category not found</p>
        <NuxtLink to="/packages" class="back-link">Return to all packages</NuxtLink>
      </div>
    </ClientOnly>

  </div>
</template>

<script setup>
import ProductCard from '~/components/packages/ProductCard.vue';

const route = useRoute();
const slug = route.params.slug;

const { data: packagesData, error, pending } = await useAsyncData(
    `category-${slug}`,
    async () => {
      const { data: packagesData, error: packagesError } = await usePackages();

      if (packagesError.value) {
        throw packagesError.value;
      }

      if (packagesData.value) {
        const matchingPackage = packagesData.value.find(
            pkg => pkg.category?.slug === slug
        );

        if (matchingPackage) {
          const category = matchingPackage.category;
          const filteredPackages = packagesData.value.filter(
              pkg => pkg.category?.id === category.id
          );

          return { category, filteredPackages };
        }
      }

      return { category: null, filteredPackages: [] };
    }
);

const category = computed(() => packagesData.value?.category);
const filteredPackages = computed(() => packagesData.value?.filteredPackages || []);

const navigateToPackage = (packageId) => {
  navigateTo(`/packages/product/${packageId}`);
};
</script>

<style scoped>
.category-page {
  margin: 0 auto;
}

.category-header {
  margin-bottom: 2rem;
  text-align: center;
}

.category-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.category-description {
  max-width: 800px;
  margin: 0 auto;
  color: #666;
  line-height: 1.6;
}

.packages-container {
  padding: 1rem 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.loading-state, .error-state, .not-found, .no-packages {
  text-align: center;
  padding: 3rem 1rem;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.back-link {
  margin-top: 1rem;
  color: #ff5e14;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #e54e09;
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .packages-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .category-header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .packages-container {
    grid-template-columns: 1fr;
  }

  .category-header h1 {
    font-size: 1.8rem;
  }
}
</style>