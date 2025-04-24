<template>
  <div
      class="location-card"
      @mouseenter="pauseAutoSlide"
      @mouseleave="startAutoSlide"
  >
    <!-- Image Gallery -->
    <div class="gallery-container">
      <transition-group name="fade" tag="div" class="image-stack">
        <img
            v-for="(image, idx) in locationData.images"
            :key="image"
            :src="getImageUrl(image)"
            :alt="`${locationData.name} - Image ${idx + 1}`"
            class="gallery-image"
            v-show="currentImageIndex === idx"
            @error="handleImageError"
        />
      </transition-group>

      <!-- Navigation Controls -->
      <div class="gallery-controls" v-if="hasMultipleImages">
        <button
            @click.stop="prevImage"
            class="control-btn prev-btn"
            aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div class="indicators">
          <button
              v-for="(_, idx) in locationData.images"
              :key="idx"
              @click.stop="setImageIndex(idx)"
              :class="['indicator-dot', { active: currentImageIndex === idx }]"
              :aria-label="`Go to image ${idx + 1}`"
              :aria-current="currentImageIndex === idx ? 'true' : 'false'"
          ></button>
        </div>

        <button
            @click.stop="nextImage"
            class="control-btn next-btn"
            aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      <!-- Category Badge -->
      <div class="package-badges">
        <div class="badge category-badge" v-if="categoryName">
          {{ categoryName }}
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="card-content">
      <h2 class="package-title">{{ locationData.name }}</h2>

      <div class="description" v-html="truncateDescription(locationData.description, 120)"></div>

      <!-- Location Features -->
      <div class="highlights" v-if="locationFeatures.length">
        <div v-for="(feature, idx) in locationFeatures" :key="idx" class="highlight-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{{ feature }}</span>
        </div>
      </div>

      <!-- Price Information -->
      <div class="price-info" v-if="locationData.price_per_night">
        <span class="price">${{ locationData.price_per_night }}</span>
        <span class="per-night">per night</span>
      </div>

      <!-- Action Buttons -->
      <div class="card-actions-container">
        <button
            class="explore-btn"
            @click="$emit('view-details', locationData.id)"
        >
          <span class="btn-text">View Details</span>
          <span class="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </span>
        </button>
        <button
            class="book-btn"
            @click="$emit('book-now', locationData.id)"
        >
          <span class="btn-text">Book Now</span>
          <span class="btn-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onBeforeUnmount} from 'vue';

const props = defineProps({
  locationData: {
    type: Object,
    required: true,
    default: () => ({
      id: null,
      name: 'Location',
      images: [],
      description: '',
      price_per_night: null,
      room_links: []
    })
  }
});

const emit = defineEmits(['view-details', 'book-now']);

// Image Gallery State
const currentImageIndex = ref(0);
let autoSlideInterval = null;

const hasMultipleImages = computed(() => {
  return props.locationData?.images?.length > 1;
});

const categoryName = computed(() => {
  if (props.locationData?.room_links?.[0]?.category?.name) {
    return props.locationData.room_links[0].category.name;
  }
  return null;
});

const locationFeatures = computed(() => {
  // Extract features from description
  if (!props.locationData.description) return [];

  // Get bullet points from HTML description
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = props.locationData.description;

  // Try to get list items first
  const listItems = tempDiv.querySelectorAll('li');
  if (listItems.length > 0) {
    const features = [];
    for (let i = 0; i < Math.min(3, listItems.length); i++) {
      features.push(listItems[i].textContent.trim());
    }
    return features;
  }

  // Fallback to sentences if no list items
  const text = tempDiv.textContent.replace(/\s+/g, ' ').trim();
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  return sentences.slice(0, 3).map(s => s.trim());
});

// Image Handling Functions
const nextImage = () => {
  if (!props.locationData?.images?.length) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % props.locationData.images.length;
};

const prevImage = () => {
  if (!props.locationData?.images?.length) return;
  currentImageIndex.value = (currentImageIndex.value - 1 + props.locationData.images.length) % props.locationData.images.length;
};

const setImageIndex = (index) => {
  currentImageIndex.value = index;
};

const startAutoSlide = () => {
  if (!hasMultipleImages.value) return;

  stopAutoSlide(); // Clear any existing interval
  autoSlideInterval = setInterval(() => {
    nextImage();
  }, 5000);
};

const pauseAutoSlide = () => {
  stopAutoSlide();
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

// Utility Functions
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/assets/images/placeholder/img.png';

  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Safe environment check for API base URL
  const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || 'https://admin.wanderlustadventuresmv.com';
  return `${apiBaseUrl}/${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`;
};

const handleImageError = (event) => {
  event.target.src = '/assets/images/placeholder/img.png';
};

const truncateDescription = (html, length) => {
  if (!html) return '';
  const text = html.replace(/<[^>]*>/g, '');
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

// Lifecycle Hooks
onMounted(() => {
  startAutoSlide();
});

onBeforeUnmount(() => {
  stopAutoSlide();
});
</script>

<style scoped>
.location-card {
  position: relative;
  width: 100%;
  max-width: 380px;
  border-radius: 18px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.location-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

/* Gallery Styles */
.gallery-container {
  position: relative;
  height: 240px;
  overflow: hidden;
  background-color: #f5f7fa;
}

.image-stack {
  position: relative;
  width: 100%;
  height: 100%;
}

.gallery-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Gallery Controls */
.gallery-controls {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  z-index: 2;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
  color: #222;
}

.control-btn.prev-btn {
  transform: translateX(-10px);
}

.location-card:hover .control-btn {
  opacity: 1;
  transform: translateX(0);
}

.control-btn:hover {
  background-color: rgba(255, 255, 255, 0.95);
  transform: scale(1.1) !important;
}

.control-btn:active {
  transform: scale(0.95) !important;
}

/* Image Indicators */
.indicators {
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 3;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.indicator-dot.active {
  background-color: #fff;
  width: 12px;
  height: 12px;
}

.indicator-dot:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

/* Badges */
.package-badges {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 4;
}

.badge {
  padding: 8px 12px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  letter-spacing: 0.5px;
}

.category-badge {
  background-color: #5a67d8;
  color: #fff;
}

/* Content Styles */
.card-content {
  padding: 24px;
}

.package-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
  margin: 8px 0 12px;
  line-height: 1.3;
}

.description {
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 16px;
}

.highlights {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.85rem;
  color: #4a5568;
}

.highlight-item svg {
  color: #10b981;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Price Information */
.price-info {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-top: 16px;
}

.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a202c;
}

.per-night {
  font-size: 0.9rem;
  color: #4a5568;
}

/* Action Buttons */
.card-actions-container {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 12px;
  margin-top: 24px;
}

.explore-btn, .book-btn {
  position: relative;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 12px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.explore-btn {
  background-color: #f3f7ff;
  color: #4f5eb3;
  border: 1px solid #e0e8ff;
}

.book-btn {
  background-color: #5a67d8;
  color: white;
  box-shadow: 0 4px 12px rgba(90, 103, 216, 0.15);
}

.btn-text {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.btn-icon, .btn-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.btn-arrow {
  transform: translateX(0);
  opacity: 1;
}

/* Button Hover Effects */
.explore-btn:hover {
  background-color: #e5eeff;
  transform: translateY(-2px);
}

.explore-btn:hover .btn-icon {
  transform: rotate(90deg);
}

.book-btn:hover {
  background-color: #4c51bf;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(90, 103, 216, 0.25);
}

.book-btn:hover .btn-text {
  transform: translateX(-4px);
}

.book-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.explore-btn:active, .book-btn:active {
  transform: translateY(1px);
}

/* Before and After Decorative Elements */
.book-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 107%, #6875f5 0%, #4c51bf 45%, #434190 80%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.book-btn:hover::before {
  opacity: 1;
}

/* Responsive Adjustments */
@media (max-width: 480px) {
  .location-card {
    max-width: 100%;
  }

  .gallery-container {
    height: 200px;
  }

  .card-content {
    padding: 20px;
  }

  .package-title {
    font-size: 1.1rem;
  }

  .highlights {
    margin-bottom: 16px;
  }

  .card-actions-container {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .explore-btn, .book-btn {
    height: 44px;
  }
}
</style>