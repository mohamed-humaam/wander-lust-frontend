<template>
  <ClientOnly>
    <div class="package-detail-container" v-if="packageData">
      <!-- Hero Section with Image Gallery -->
      <div class="gallery-container">
        <!-- Image Gallery Slider -->
        <div class="gallery-slider">
          <swiper
              :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
              :slides-per-view="1"
              :space-between="0"
              :loop="true"
              :pagination="{ clickable: true }"
              :navigation="true"
              :autoplay="{ delay: 5000, disableOnInteraction: false }"
          >
            <swiper-slide v-for="(image, index) in packageData.images" :key="index">
              <div class="gallery-image-container">
                <img :src="getImageUrl(image)" :alt="`${packageData.name} - Image ${index + 1}`" class="gallery-image" @error="handleImageError" />
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <!-- Hero Content Overlay -->
        <div class="hero-content">
          <div class="container">
            <div class="hero-text">
              <div class="badge-container">
                <span class="category-badge">{{ packageData.category?.name || 'Travel Package' }}</span>
                <span class="duration-badge">{{ packageData.duration }} Days</span>
              </div>
              <h1 class="package-title">{{ packageData.name }}</h1>
              <div class="location-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ packageData.location?.name || 'Unknown Location' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Section -->
      <div class="container">
        <div class="content-grid">
          <!-- Left Column: Package Details -->
          <div class="main-content">
            <OverviewContentSection :description="packageData.description" />

            <FeaturesContentSection :features="packageData.features" />

            <RoomsContentSection :rooms="packageData.rooms" />

            <ActivitiesContentSection :activities="packageData.activities" />

            <AmenitiesContentSection :amenities="packageData.amenities" />

            <DestinationContentSection
                v-if="packageData.location"
                :location="packageData.location"
            />
          </div>

          <!-- Right Column: Booking Card -->
          <div class="sidebar-content">
            <BookingCard
                :price="packageData.price"
                :duration="packageData.duration"
                :location-name="packageData.location?.name"
                :category="packageData.category?.name"
                :highlights="packageData.features?.map(f => f.name)"
                :package-name="packageData.name"
                @reserve="reservePackage"
                @inquire="inquireAboutPackage"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading package details...</p>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useGetResourceWithRelations } from '~/composables/api-fetch';

// Import components
import OverviewContentSection from '~/components/productPage/OverviewContentSection.vue';
import FeaturesContentSection from '~/components/productPage/FeaturesContentSection.vue';
import RoomsContentSection from '~/components/productPage/RoomsContentSection.vue';
import ActivitiesContentSection from '~/components/productPage/ActivitiesContentSection.vue';
import AmenitiesContentSection from '~/components/productPage/AmenitiesContentSection.vue';
import DestinationContentSection from '~/components/productPage/DestinationContentSection.vue';
import BookingCard from '~/components/productPage/BookingCard.vue';

const route = useRoute();
const packageId = route.params.id;
const packageData = ref(null);
const isLoading = ref(true);

// Use the composable to fetch package data
const { data, pending, error } = useGetResourceWithRelations(
    'packages',
    { id: packageId },
    ['category', 'location', 'amenities', 'rooms', 'activities', 'features']
);

// Watch for data changes
watchEffect(() => {
  if (data?.value) {
    // Filter the data to get only the package with matching ID
    const filteredPackage = Array.isArray(data.value)
        ? data.value.find(pkg => pkg.id == packageId)
        : (data.value.id == packageId ? data.value : null);

    if (filteredPackage) {
      packageData.value = filteredPackage;
    } else {
      console.error('Package not found with ID:', packageId);
      // Handle case where package isn't found
    }
    isLoading.value = false;
  }
  if (!data?.value) {
    console.warn("No data available, API may have failed");
    return;
  }
  if (!packageId) {
    console.error("Invalid package ID:", packageId);
    return;
  }
  if (error.value) {
    console.error("Error fetching package:", error.value);
    packageData.value = null; // Prevent undefined state
    isLoading.value = false;
  }
});

// Utility functions
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/assets/images/placeholder/img.png';

  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  const cleanPath = imagePath;
  const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || 'http://admin.wanderlustadventuresmv.com/api';
  return `${apiBaseUrl}/${cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath}`;
};

const handleImageError = (event) => {
  event.target.src = '/assets/images/placeholder/img.png';
};

// Action functions
const reservePackage = (bookingDetails) => {
  // This function is now kept for compatibility
  // The main WhatsApp redirect happens in the BookingCard component
  console.log('Booking details received:', bookingDetails);
};

const inquireAboutPackage = () => {
  alert(`Thank you for your interest in ${packageData.value?.name}. Our travel experts will contact you soon with more information.`);
};
</script>

<style scoped>
/* Global Variables */
:root {
  --primary-color: #ff7d00;
  --primary-dark: #e86f00;
  --primary-light: #ffa64d;
  --secondary-color: #0ea5e9;
  --text-color: #0f172a;
  --text-light: #64748b;
  --border-color: #e2e8f0;
  --background-light: #f8fafc;
  --background-white: #ffffff;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --transition: all 0.2s ease;
}

/* Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  color: var(--text-color);
  line-height: 1.5;
  background-color: var(--background-light);
  font-size: 15px;
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Package Detail Container */
.package-detail-container {
  //margin-bottom: 2rem;
}

/* Hero Section */
.gallery-container {
  position: relative;
  height: 480px;
  margin-bottom: 1.5rem;
}

.gallery-slider {
  position: relative;
  height: 100%;
  z-index: 1;
}

.gallery-image-container {
  width: 100%;
  height: 480px;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  z-index: 2;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0) 100%);
}

.hero-text {
  max-width: 800px;
  padding-bottom: 2rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.badge-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.category-badge, .duration-badge {
  background-color: rgba(255, 125, 0, 0.85);
  padding: 0.35rem 0.8rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.package-title {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.location-container {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
  font-weight: 500;
}

/* Swiper Customization */
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-button-next,
.swiper-button-prev {
  color: white;
  background-color: rgba(255, 125, 0, 0.7);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  transition: var(--transition);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: var(--primary-color);
  transform: scale(1.05);
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 1rem;
  font-weight: bold;
}

.swiper-pagination-bullet {
  background: white;
  opacity: 0.7;
  width: 8px;
  height: 8px;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: var(--primary-color);
  transform: scale(1.1);
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.main-content {
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 992px) {
  .content-grid {
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid rgba(255, 125, 0, 0.2);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-container p {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-light);
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .gallery-container,
  .gallery-image-container {
    height: 420px;
  }
}

@media (max-width: 991px) {
  .gallery-container,
  .gallery-image-container {
    height: 380px;
  }

  .package-title {
    font-size: 2rem;
  }
}

@media (max-width: 767px) {
  .gallery-container,
  .gallery-image-container {
    height: 300px;
  }

  .package-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .gallery-container,
  .gallery-image-container {
    height: 250px;
  }

  .package-title {
    font-size: 1.5rem;
  }
}
</style>