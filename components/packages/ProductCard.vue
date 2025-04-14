<template>
  <div
      class="travel-card"
      @mouseenter="pauseAutoSlide"
      @mouseleave="startAutoSlide"
  >
    <!-- Image Gallery with Improved Controls -->
    <div class="gallery-container">
      <transition-group name="fade" tag="div" class="image-stack">
        <img
            v-for="(image, idx) in packageData.images"
            :key="image"
            :src="getImageUrl(image)"
            :alt="`${packageData.name} - Image ${idx + 1}`"
            class="gallery-image"
            v-show="currentImageIndex === idx"
            @error="handleImageError"
        />
      </transition-group>

      <!-- Improved Navigation Controls -->
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
              v-for="(_, idx) in packageData.images"
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

      <!-- Enhanced Visual Elements -->
      <div class="package-badges">
        <div class="badge price-badge">
          <span class="currency">$</span>{{ formatPrice(packageData.price) }}
        </div>

        <div class="badge featured-badge" v-if="packageData.featured">
          Featured
        </div>
      </div>
    </div>

    <!-- Content Section with Better Layout -->
    <div class="card-content">
      <div class="location-info">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span>{{ packageData.location?.name || 'Unknown Location' }}</span>
      </div>

      <h2 class="package-title">{{ packageData.name }}</h2>

      <div class="package-meta">
        <div class="meta-item" v-if="packageData.duration">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{{ packageData.duration }} days</span>
        </div>

        <div class="meta-item" v-if="packageData.rating">
          <div class="rating">
            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                 fill="i <= Math.floor(packageData.rating) ? 'currentColor' : 'none'" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>{{ packageData.rating || 0 }}/5</span>
          </div>
        </div>
      </div>

      <div class="description" v-html="truncateDescription(packageData.description, 120)"></div>

      <div class="highlights" v-if="packageData.highlights && packageData.highlights.length">
        <div v-for="(highlight, idx) in packageData.highlights.slice(0, 3)" :key="idx" class="highlight-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{{ highlight }}</span>
        </div>
      </div>

      <!-- Redesigned Action Buttons -->
      <div class="card-actions-container">
        <button
            class="explore-btn"
            @click="$emit('view-details', packageData.id)"
        >
          <span class="btn-text">Explore</span>
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
            @click="$emit('book-now', packageData.id)"
        >
          <span class="btn-text">Reserve Now</span>
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
  packageData: {
    type: Object,
    required: true,
    default: () => ({
      id: null,
      name: 'Travel Package',
      price: 0,
      images: [],
      location: {name: 'Unknown Location'},
      description: '',
      duration: '',
      rating: 0,
      highlights: [],
      featured: false
    })
  }
});

const emit = defineEmits(['view-details', 'book-now']);

// Image Gallery State
const currentImageIndex = ref(0);
let autoSlideInterval = null;

const hasMultipleImages = computed(() => {
  return props.packageData?.images?.length > 1;
});

// Image Handling Functions
const nextImage = () => {
  if (!props.packageData?.images?.length) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % props.packageData.images.length;
};

const prevImage = () => {
  if (!props.packageData?.images?.length) return;
  currentImageIndex.value = (currentImageIndex.value - 1 + props.packageData.images.length) % props.packageData.images.length;
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

const formatPrice = (price) => {
  if (!price && price !== 0) return '0.00';
  return parseFloat(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
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
.travel-card {
  position: relative;
  width: 100%;
  max-width: 380px;
  border-radius: 18px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.travel-card:hover {
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

.travel-card:hover .control-btn {
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

.price-badge {
  background-color: #fff;
  color: #1a1a1a;
}

.currency {
  font-size: 0.8rem;
  margin-right: 1px;
  opacity: 0.8;
}

.featured-badge {
  background-color: #ff6b6b;
  color: #fff;
}

/* Content Styles */
.card-content {
  padding: 24px;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #4a5568;
  font-size: 0.85rem;
  margin-bottom: 8px;
}

.location-info svg {
  color: #5a67d8;
}

.package-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
  margin: 8px 0 12px;
  line-height: 1.3;
}

.package-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #4a5568;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #f59e0b;
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

/* Redesigned Action Buttons */
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
  .travel-card {
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