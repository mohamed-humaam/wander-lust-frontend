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
        <!-- Category Header with Background Image -->
        <div
            class="category-header"
            :style="categoryBackgroundStyle"
        >
          <div class="category-overlay">
            <h1>{{ category.name }}</h1>
            <p class="category-description" v-html="category.description"></p>
          </div>
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
import { useGetCategories } from '~/composables/api-fetch';

const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

// Track mounted state to prevent updates after unmount
const isMounted = ref(true);
onMounted(() => {
  isMounted.value = true;
});

// Fetch categories first to get the category data
const { data: categories, error: categoriesError } = await useGetCategories();

// Then fetch package data with error handling
const { data: packagesData, error, pending } = await useAsyncData(
    `category-${slug}`,
    async () => {
      try {
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
      } catch (err) {
        if (isMounted.value) {
          console.error('Error fetching packages:', err);
        }
        return { category: null, filteredPackages: [], error: err };
      }
    }
);

// Find the category directly from categories API response
const categoryFromApi = computed(() => {
  if (!isMounted.value) return null;
  if (categories.value) {
    return categories.value.find(cat => cat.slug === slug);
  }
  return null;
});

// Use either the category from packages data or directly from categories API
const category = computed(() => {
  if (!isMounted.value) return null;
  if (packagesData.value?.category) {
    return packagesData.value.category;
  }
  return categoryFromApi.value;
});

const filteredPackages = computed(() => {
  if (!isMounted.value) return [];
  return packagesData.value?.filteredPackages || [];
});

// Compute the background image style with safe checks
const categoryBackgroundStyle = computed(() => {
  if (category.value?.images?.length) {
    const imagePath = category.value.images[0];

    if (imagePath.startsWith('http')) {
      return {
        backgroundImage: `url(${imagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }

    let cleanPath = imagePath;
    if (cleanPath.startsWith('storage/')) {
      cleanPath = cleanPath.replace('storage/', '');
    }

    if (cleanPath.startsWith('/')) {
      cleanPath = cleanPath.substring(1);
    }

    return {
      backgroundImage: `url(${baseUrl.replace('/api', '')}/${cleanPath})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
  }
  return {};
});

const navigateToPackage = (packageId) => {
  router.push(`/packages/product/${packageId}`);
};

// Watch for route changes to refresh data when navigating between categories
watch(
    () => route.params.slug,
    (newSlug, oldSlug) => {
      if (newSlug !== oldSlug && isMounted.value) {
        // Refresh the page to get new data
        router.go(0);
      }
    }
);

// Cleanup on unmount
onBeforeUnmount(() => {
  isMounted.value = false;
});
</script>

<style scoped>
.category-page {
  margin: 0 auto;
}

.category-header {
  position: relative;
  margin-bottom: 2rem;
  height: 300px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 125, 0, 0.3); /* Add orange overlay here */
  padding: 2rem;
  text-align: center;
}

.category-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

.category-description {
  max-width: 800px;
  margin: 0 auto;
  color: #fff;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
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
  .category-header {
    height: 250px;
  }

  .packages-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
  }

  .category-header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .category-header {
    height: 200px;
  }

  .packages-container {
    grid-template-columns: 1fr;
  }

  .category-header h1 {
    font-size: 1.8rem;
  }

  .category-description {
    font-size: 0.9rem;
  }
}
</style>