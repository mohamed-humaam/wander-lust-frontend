<template>
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
          <!-- Overview Section -->
          <section class="content-section">
            <h2 class="section-title">Overview</h2>
            <div class="package-description" v-html="packageData.description"></div>
          </section>

          <!-- Features Section -->
          <section class="content-section" v-if="packageData.features?.length">
            <h2 class="section-title">Package Features</h2>
            <div class="features-grid">
              <div v-for="feature in packageData.features" :key="feature.id" class="feature-card">
                <div class="feature-icon">
                  <img :src="getImageUrl(feature.icon)" :alt="feature.name" @error="handleIconError" />
                </div>
                <div class="feature-content">
                  <h3 class="feature-title">{{ feature.name }}</h3>
                  <div class="feature-description" v-html="feature.description"></div>
                </div>
              </div>
            </div>
          </section>

          <!-- Room Options Section -->
          <section class="content-section" v-if="packageData.rooms?.length">
            <h2 class="section-title">Room Options</h2>
            <div class="rooms-grid">
              <div v-for="room in packageData.rooms" :key="room.id" class="room-card">
                <div class="room-icon">
                  <img :src="getImageUrl(room.icon)" :alt="room.name" @error="handleIconError" />
                </div>
                <div class="room-content">
                  <h3 class="room-title">{{ room.name }}</h3>
                  <div class="room-description" v-html="room.description"></div>
                </div>
              </div>
            </div>
          </section>

          <!-- Activities Section -->
          <section class="content-section" v-if="packageData.activities?.length">
            <h2 class="section-title">Included Activities</h2>
            <div class="activities-grid">
              <div v-for="activity in packageData.activities" :key="activity.id" class="activity-card">
                <div class="activity-icon">
                  <img :src="getImageUrl(activity.icon.startsWith('0') ? `icons/${activity.icon}` : activity.icon)" :alt="activity.name" @error="handleIconError" />
                </div>
                <div class="activity-content">
                  <h3 class="activity-title">{{ activity.name }}</h3>
                  <div class="activity-description" v-html="activity.description"></div>
                </div>
              </div>
            </div>
          </section>

          <!-- Amenities Section -->
          <section class="content-section" v-if="packageData.amenities?.length">
            <h2 class="section-title">Travel Amenities</h2>
            <div class="amenities-grid">
              <div v-for="amenity in packageData.amenities" :key="amenity.id" class="amenity-card">
                <div class="amenity-icon">
                  <img :src="getImageUrl(amenity.icon)" :alt="amenity.name" @error="handleIconError" />
                </div>
                <div class="amenity-content">
                  <h3 class="amenity-title">{{ amenity.name }}</h3>
                  <div class="amenity-description" v-html="amenity.description"></div>
                </div>
              </div>
            </div>
          </section>

          <!-- Location Section -->
          <section class="content-section" v-if="packageData.location">
            <h2 class="section-title">Destination</h2>
            <div class="location-card">
              <div class="location-images">
                <img
                    :src="getImageUrl(packageData.location.images?.[0])"
                    :alt="packageData.location.name"
                    class="main-location-image"
                    @error="handleImageError"
                />
                <div class="location-gallery" v-if="packageData.location.gallery?.length">
                  <img
                      v-for="(img, idx) in packageData.location.gallery.slice(0, 3)"
                      :key="idx"
                      :src="getImageUrl(img)"
                      :alt="`${packageData.location.name} - Gallery ${idx + 1}`"
                      class="gallery-thumb"
                      @error="handleImageError"
                  />
                  <div class="more-photos" v-if="packageData.location.gallery.length > 3">
                    <span>+{{ packageData.location.gallery.length - 3 }} more</span>
                  </div>
                </div>
              </div>
              <div class="location-content">
                <h3 class="location-title">{{ packageData.location.name }}</h3>
                <div class="location-description" v-html="packageData.location.description"></div>
                <a
                    v-if="packageData.location.google_location"
                    :href="packageData.location.google_location"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="map-link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                    <line x1="8" y1="2" x2="8" y2="18"></line>
                    <line x1="16" y1="6" x2="16" y2="22"></line>
                  </svg>
                  View on Google Maps
                </a>
                <div v-if="locationCoordinates" class="location-coordinates">
                  <p><strong>Coordinates:</strong> {{ locationCoordinates.latitude }}, {{ locationCoordinates.longitude }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Right Column: Booking Card -->
        <div class="sidebar-content">
          <div class="booking-card">
            <h3 class="booking-title">Reserve Your Adventure</h3>

            <div class="price-display">
              <span class="currency">$</span>
              <span class="price-value">{{ formatPrice(packageData.price) }}</span>
              <span class="price-unit">/ person</span>
            </div>

            <div class="booking-details">
              <div class="booking-detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{{ packageData.duration }} Days Trip</span>
              </div>

              <div class="booking-detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ packageData.location?.name }}</span>
              </div>

              <div class="booking-detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>2-6 Travelers</span>
              </div>

              <div class="booking-detail-item" v-if="packageData.category">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>{{ packageData.category.name }}</span>
              </div>
            </div>

            <div class="booking-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="travel-date">Travel Date</label>
                  <input type="date" id="travel-date" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="guests">Guests</label>
                  <select id="guests" class="form-control">
                    <option value="1">1 Guest</option>
                    <option value="2" selected>2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                  </select>
                </div>
              </div>

              <button class="reserve-button" @click="reservePackage">
                <span>Reserve Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <button class="inquire-button" @click="inquireAboutPackage">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Inquire About This Package</span>
              </button>
            </div>

            <div class="booking-info">
              <div class="info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>Secure booking process</span>
              </div>
              <div class="info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Immediate confirmation</span>
              </div>
              <div class="info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                <span>Pay 20% now, rest later</span>
              </div>
            </div>
          </div>

          <!-- Need assistance card -->
          <div class="assistance-card">
            <div class="assistance-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h4>Need Assistance?</h4>
            <p>Our travel experts are ready to help you plan your perfect journey.</p>
            <a href="tel:+18001234567" class="assistance-contact">+1 (800) 123-4567</a>
            <div class="assistance-email">
              <a href="mailto:info@wanderlust.com">info@wanderlust.com</a>
            </div>
          </div>

          <!-- Package highlights card -->
          <div class="highlights-card" v-if="packageData.features?.length > 0">
            <h4>Package Highlights</h4>
            <ul class="highlights-list">
              <li v-for="feature in packageData.features.slice(0, 5)" :key="feature.id">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{{ feature.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Similar Packages Section -->
    <section class="similar-packages-section">
      <div class="container">
        <h2 class="section-title">You May Also Like</h2>
        <div class="similar-packages-grid">
          <!-- This would be populated with actual similar packages -->
          <div class="similar-package-card" v-for="i in 3" :key="i">
            <div class="similar-package-img"></div>
            <div class="similar-package-content">
              <h3>Similar Package {{ i }}</h3>
              <p>Explore more amazing destinations similar to {{ packageData.name }}.</p>
              <div class="similar-package-price">
                <span>From ${{ (parseInt(packageData.price) - 50 + (i * 30)).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Loading State -->
  <div v-else class="loading-container">
    <div class="loading-spinner"></div>
    <p>Loading package details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useGetResourceWithRelations } from '~/composables/api-fetch';

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
  if (data.value) {
    packageData.value = Array.isArray(data.value) ? data.value[0] : data.value;
    isLoading.value = false;
  }
});

// Computed properties
const locationCoordinates = computed(() => {
  if (!packageData.value?.location?.location) return null;
  return parseLocationCoordinates(packageData.value.location.location);
});

// Parse location coordinates
const parseLocationCoordinates = (locationString) => {
  try {
    if (!locationString) return null;
    const parsed = JSON.parse(`{${locationString}}`);
    return {
      latitude: parsed.latitude,
      longitude: parsed.longitude
    };
  } catch (e) {
    console.error('Error parsing location coordinates:', e);
    return null;
  }
};

// Utility functions
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/assets/images/placeholder/img.png';

  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  const cleanPath = imagePath;
  const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || 'http://wander-lust.test';
  return `${apiBaseUrl}/${cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath}`;
};

const handleImageError = (event) => {
  event.target.src = '/assets/images/placeholder/img.png';
};

const handleIconError = (event) => {
  event.target.src = '/assets/images/placeholder/icon.png';
};

const formatPrice = (price) => {
  if (!price && price !== 0) return '0.00';
  return parseFloat(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Action functions
const reservePackage = () => {
  console.log('Reserving package:', packageData.value?.name);
  alert(`Thank you for reserving ${packageData.value?.name}. We'll contact you shortly to confirm your booking.`);
};

const inquireAboutPackage = () => {
  console.log('Inquiring about package:', packageData.value?.name);
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
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --transition: all 0.25s ease;
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
  line-height: 1.6;
  background-color: var(--background-light);
  font-size: 16px;
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
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
  margin-bottom: 4rem;
}

/* Hero Section
.hero-section {
  position: relative;
  margin-bottom: 2.5rem;
  overflow: hidden;
} */

.gallery-container {
  position: relative;
  height: 600px;
}

.gallery-slider {
  position: relative;
  height: 100%;
  z-index: 1;
}

.gallery-image-container {
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-image:hover {
  transform: scale(1.03);
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
  padding-bottom: 3.5rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.badge-container {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.category-badge, .duration-badge {
  background-color: rgba(255, 125, 0, 0.85);
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.package-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.25rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.location-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
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
  width: 3.5rem;
  height: 3.5rem;
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
  font-size: 1.3rem;
  font-weight: bold;
}

.swiper-pagination-bullet {
  background: white;
  opacity: 0.7;
  width: 10px;
  height: 10px;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: var(--primary-color);
  transform: scale(1.2);
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-top: 2rem;
}

@media (min-width: 992px) {
  .content-grid {
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
  }
}

/* Main Content Sections */
.content-section {
  background-color: var(--background-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: 2.5rem;
  margin-bottom: 2rem;
  transition: box-shadow 0.3s ease;
}

.content-section:hover {
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.75rem;
  color: var(--text-color);
  position: relative;
  padding-bottom: 0.75rem;
}

.section-title:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 3.5rem;
  height: 4px;
  background-color: var(--primary-color);
  border-radius: 2px;
}

.package-description {
  color: var(--text-light);
  margin-bottom: 1rem;
  line-height: 1.8;
  font-size: 1.05rem;
}

/* Features Grid */
.features-grid,
.rooms-grid,
.activities-grid,
.amenities-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .features-grid,
  .rooms-grid,
  .activities-grid,
  .amenities-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.75rem;
  }
}

.feature-card,
.room-card,
.activity-card,
.amenity-card {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
  background-color: var(--background-light);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.feature-card:hover,
.room-card:hover,
.activity-card:hover,
.amenity-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: rgba(255, 125, 0, 0.2);
}

.feature-icon,
.room-icon,
.activity-icon,
.amenity-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  background-color: rgba(255, 125, 0, 0.15);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: var(--transition);
}

.feature-card:hover .feature-icon,
.room-card:hover .room-icon,
.activity-card:hover .activity-icon,
.amenity-card:hover .amenity-icon {
  background-color: rgba(255, 125, 0, 0.25);
  transform: scale(1.05);
}

.feature-icon img,
.room-icon img,
.activity-icon img,
.amenity-icon img {
  width: 1.6rem;
  height: 1.6rem;
  object-fit: contain;
}

.feature-content,
.room-content,
.activity-content,
.amenity-content {
  flex-grow: 1;
}

.feature-title,
.room-title,
.activity-title,
.amenity-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: var(--text-color);
}

.feature-description,
.room-description,
.activity-description,
.amenity-description {
  font-size: 0.95rem;
  color: var(--text-light);
  line-height: 1.6;
}

/* Location Section */
.location-card {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: var(--radius-md);
  overflow: hidden;
}

@media (min-width: 768px) {
  .location-card {
    flex-direction: row;
  }
}

.location-images {
  flex: 1;
}

.main-location-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: 0.75rem;
  transition: transform 0.3s ease;
}

.main-location-image:hover {
  transform: scale(1.02);
}

.location-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.gallery-thumb {
  width: 100%;
  height: 85px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
  cursor: pointer;
}

.gallery-thumb:hover {
  transform: scale(1.05);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.more-photos {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  height: 85px;
  cursor: pointer;
  transition: var(--transition);
}

.more-photos:hover {
  background-color: var(--primary-color);
}

.location-content {
  flex: 1;
}

.location-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.location-description {
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.map-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: var(--background-light);
  color: var(--text-color);
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: var(--transition);
  border: 1px solid var(--border-color);
}

.map-link:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  text-decoration: none;
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

/* Booking Card */
.booking-card {
  background-color: var(--background-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2.5rem;
  position: sticky;
  top: 2rem;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.booking-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.booking-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.75rem;
  text-align: center;
  color: var(--text-color);
}

.price-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 1.75rem;
}

.currency {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
}

.price-value {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-color);
  margin: 0 0.25rem;
  line-height: 1;
}

.price-unit {
  font-size: 1.1rem;
  color: var(--text-light);
  font-weight: 500;
}

.booking-details {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 1.75rem;
  padding: 1.25rem;
  background-color: var(--background-light);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.booking-detail-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 1rem;
  font-weight: 500;
}

.booking-detail-item svg {
  color: var(--primary-color);
  flex-shrink: 0;
}

.booking-form {
  margin-bottom: 1.75rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-color);
}

.form-control {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 1rem;
  transition: var(--transition);
  background-color: var(--background-light);
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(255, 125, 0, 0.2);
}

.reserve-button {
  width: 100%;
  padding: 1.1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.25rem;
  box-shadow: 0 4px 12px rgba(255, 125, 0, 0.25);
}

.reserve-button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(255, 125, 0, 0.35);
}

.inquire-button {
  width: 100%;
  padding: 1.1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: transparent;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.inquire-button:hover {
  background-color: var(--background-light);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.booking-info {
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-light);
}

.info-item svg {
  color: var(--secondary-color);
  flex-shrink: 0;
}

/* Assistance Card */
.assistance-card {
  background-color: var(--background-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 2.25rem;
  margin-top: 2rem;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.assistance-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.assistance-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.assistance-icon svg {
  width: 2.75rem;
  height: 2.75rem;
  color: var(--primary-color);
}

.assistance-card h4 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.85rem;
  color: var(--text-color);
}

.assistance-card p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
}

.assistance-contact {
  display: block;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.6rem;
  transition: var(--transition);
}

.assistance-contact:hover {
  color: var(--primary-color);
}

.assistance-email {
  font-size: 1rem;
}

.assistance-email a {
  color: var(--primary-color);
  font-weight: 500;
}

/* Similar Packages Section */
.similar-packages-section {
  background-color: var(--background-light);
  padding: 4rem 0;
  border-top: 1px solid var(--border-color);
}

.similar-packages-placeholder {
  background-color: var(--background-white);
  border-radius: var(--radius-md);
  padding: 5rem 2rem;
  text-align: center;
  color: var(--text-light);
  box-shadow: var(--shadow-sm);
  border: 1px dashed var(--border-color);
}

.placeholder-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-light);
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}

.loading-spinner {
  width: 3.5rem;
  height: 3.5rem;
  border: 4px solid rgba(255, 125, 0, 0.2);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.75rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-container p {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-light);
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .gallery-container,
  .gallery-image-container {
    height: 550px;
  }

  .package-title {
    font-size: 2.75rem;
  }
}

@media (max-width: 991px) {
  .gallery-container,
  .gallery-image-container {
    height: 450px;
  }

  .package-title {
    font-size: 2.5rem;
  }

  .hero-text {
    padding-bottom: 3rem;
  }

  .content-section {
    padding: 2rem;
  }
}

@media (max-width: 767px) {
  .gallery-container,
  .gallery-image-container {
    height: 350px;
  }

  .package-title {
    font-size: 2rem;
  }

  .hero-text {
    padding-bottom: 2rem;
  }

  .content-section {
    padding: 1.75rem;
  }

  .main-location-image {
    height: 220px;
  }

  .gallery-thumb {
    height: 70px;
  }

  .more-photos {
    height: 70px;
  }

  .price-value {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .gallery-container,
  .gallery-image-container {
    height: 300px;
  }

  .package-title {
    font-size: 1.75rem;
  }

  .hero-text {
    padding-bottom: 1.5rem;
  }

  .badge-container {
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .category-badge,
  .duration-badge {
    font-size: 0.8rem;
    padding: 0.3rem 0.75rem;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .content-section {
    padding: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .booking-card {
    padding: 1.75rem;
  }

  .price-value {
    font-size: 2.25rem;
  }

  .main-location-image {
    height: 180px;
  }

  .gallery-thumb {
    height: 60px;
  }

  .more-photos {
    height: 60px;
    font-size: 0.8rem;
  }

  .reserve-button,
  .inquire-button {
    padding: 0.9rem;
  }
}
</style>