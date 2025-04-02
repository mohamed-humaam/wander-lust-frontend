<!--TOTO: Refining needed-->

<template>
  <div class="google-reviews-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner-circle"></div>
        <div class="spinner-circle-inner"></div>
      </div>
      <div class="loading-message">Loading Google Reviews</div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon">!</div>
      <div class="error-content">
        <h3 class="error-title">Oops! Something went wrong</h3>
        <div class="error-message">{{ error }}</div>
        <button class="retry-button" @click="fetchReviews">Try Again</button>
      </div>
    </div>

    <template v-else>
      <!-- Header Section -->
      <div class="reviews-header">
        <div class="reviews-title">
          <div class="google-branding">
            <span class="google-g">G</span>
            <span class="google-o1">o</span>
            <span class="google-o2">o</span>
            <span class="google-g2">g</span>
            <span class="google-l">l</span>
            <span class="google-e">e</span>
            <span class="reviews-label">Reviews</span>
          </div>
          <div class="stats-container" v-if="averageRating">
            <div class="average-rating">{{ averageRating.toFixed(1) }}</div>
            <div class="star-rating">
              <div class="star-background">
                <span v-for="i in 5" :key="`bg-${i}`" class="star">★</span>
              </div>
              <div class="star-foreground" :style="{ width: `${(averageRating / 5) * 100}%` }">
                <span v-for="i in 5" :key="`fg-${i}`" class="star">★</span>
              </div>
            </div>
            <div class="total-reviews">{{ reviews.length }} reviews</div>
          </div>
        </div>
        <div class="filter-sort">
          <div class="filter-pills">
            <button
                v-for="rating in [5, 4, 3, 2, 1]"
                :key="rating"
                class="filter-pill"
                :class="{ active: activeFilter === rating }"
                @click="filterReviews(rating)"
            >
              {{ rating }} <span class="star-icon">★</span>
            </button>
            <button
                class="filter-pill"
                :class="{ active: activeFilter === 0 }"
                @click="filterReviews(0)"
            >
              All
            </button>
          </div>
        </div>
      </div>

      <!-- Carousel Container -->
      <div class="carousel-wrapper">
        <div
            class="carousel-container"
            ref="carousel"
            @mousedown="startDrag"
            @touchstart="startDrag"
            @mousemove="onDrag"
            @touchmove="onDrag"
            @mouseup="endDrag"
            @touchend="endDrag"
            @mouseleave="endDrag"
        >
          <div
              class="carousel-track"
              :style="{ transform: `translateX(${translateX}px)` }"
          >
            <transition-group name="review-card">
              <div
                  v-for="(review, index) in filteredReviews"
                  :key="review.time"
                  class="review-card"
                  :class="{
                  'active': index === activeIndex,
                  'prev': index === activeIndex - 1,
                  'next': index === activeIndex + 1,
                  'far-prev': index < activeIndex - 1,
                  'far-next': index > activeIndex + 1
                }"
              >
                <div class="review-content">
                  <div class="reviewer-profile">
                    <div class="avatar">
                      {{ getInitials(review.author_name) }}
                    </div>
                    <div class="reviewer-info">
                      <h3 class="reviewer-name">{{ review.author_name }}</h3>
                      <div class="review-date">{{ formatDate(review.time) }}</div>
                    </div>
                  </div>

                  <div class="star-display" :data-rating="review.rating">
                    <div class="star-rating-display">
                      <div class="star-background">
                        <span v-for="i in 5" :key="`bg-${i}`" class="star">★</span>
                      </div>
                      <div class="star-foreground" :style="{ width: `${(review.rating / 5) * 100}%` }">
                        <span v-for="i in 5" :key="`fg-${i}`" class="star">★</span>
                      </div>
                    </div>
                  </div>

                  <div class="review-text-container">
                    <p class="review-text" :class="{ 'expanded': expanded[review.time] }">
                      {{ review.text }}
                    </p>
                    <button
                        v-if="review.text.length > 150 && !expanded[review.time]"
                        @click="toggleExpand(review.time)"
                        class="read-more"
                    >
                      Read more
                    </button>
                    <button
                        v-if="expanded[review.time]"
                        @click="toggleExpand(review.time)"
                        class="read-less"
                    >
                      Show less
                    </button>
                  </div>

                  <div class="review-actions">
                    <button class="action-button" :class="{ 'active': liked[review.time] }" @click="toggleLike(review.time)">
                      <span class="action-icon">👍</span>
                      <span class="action-label">Helpful</span>
                    </button>
                    <button class="action-button share" @click="shareReview(review)">
                      <span class="action-icon">💬</span>
                      <span class="action-label">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!-- Navigation Controls -->
        <div class="carousel-controls">
          <button
              @click="prevReview"
              class="nav-button prev"
              :disabled="activeIndex === 0 || filteredReviews.length === 0"
              aria-label="Previous review"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <!-- Pagination Indicators -->
          <div class="pagination">
            <button
                v-for="(_, index) in filteredReviews.slice(0, 5)"
                :key="index"
                @click="goToReview(index)"
                :class="['page-indicator', index === activeIndex ? 'active' : '']"
                :aria-label="`Go to review ${index + 1}`"
            ></button>
            <div v-if="filteredReviews.length > 5" class="more-indicator">...</div>
          </div>

          <button
              @click="nextReview"
              class="nav-button next"
              :disabled="activeIndex >= filteredReviews.length - 1 || filteredReviews.length === 0"
              aria-label="Next review"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <!-- View All Reviews Link -->
      <div class="view-all">
        <a :href="googleMapsLink" target="_blank" class="view-all-link">
          View all {{ reviews.length }} reviews on Google Maps
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="external-link-icon">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const reviews = ref([]);
const loading = ref(true);
const error = ref(null);
const activeIndex = ref(0);
const expanded = ref({});
const liked = ref({});
const placeId = "ChIJQ3qJKAChtSQRCkMUtiwrgoU";
const activeFilter = ref(0); // 0 means all reviews, 1-5 for specific star ratings

// Carousel state
const translateX = ref(0);
const startPos = ref(0);
const currentTranslate = ref(0);
const isDragging = ref(false);
const animationId = ref(null);
const carousel = ref(null);

// Computed properties
const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0;
  const total = reviews.value.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.value.length;
});

const filteredReviews = computed(() => {
  if (activeFilter.value === 0) return reviews.value;
  return reviews.value.filter(review => review.rating === activeFilter.value);
});

const googleMapsLink = computed(() => {
  return `https://maps.google.com/?cid=${placeId.replace('ChIJ', '')}`;
});

// Watch for changes in filtered reviews
watch(filteredReviews, () => {
  activeIndex.value = 0;
  updateCarouselPosition();
}, { deep: true });

// Methods
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diff = (now - date) / (1000 * 60 * 60 * 24);

  if (diff < 1) return 'Today';
  if (diff < 2) return 'Yesterday';
  if (diff < 7) return `${Math.floor(diff)} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
  if (diff < 365) return `${Math.floor(diff / 30)} months ago`;
  return `${Math.floor(diff / 365)} years ago`;
};

const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
};

const toggleExpand = (id) => {
  expanded.value[id] = !expanded.value[id];
};

const toggleLike = (id) => {
  liked.value[id] = !liked.value[id];
};

const shareReview = (review) => {
  // This would handle the sharing functionality
  const text = `Check out this review: "${review.text}" - ${review.author_name}`;
  if (navigator.share) {
    navigator.share({
      title: 'Google Review',
      text: text,
      url: googleMapsLink.value
    }).catch(err => {
      console.error('Error sharing:', err);
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    alert('Share: ' + text);
  }
};

const filterReviews = (rating) => {
  activeFilter.value = rating;
};

const nextReview = () => {
  if (activeIndex.value < filteredReviews.value.length - 1) {
    activeIndex.value++;
    updateCarouselPosition();
  }
};

const prevReview = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
    updateCarouselPosition();
  }
};

const goToReview = (index) => {
  activeIndex.value = index;
  updateCarouselPosition();
};

const updateCarouselPosition = () => {
  if (!carousel.value || filteredReviews.value.length === 0) return;

  const cardWidth = carousel.value.offsetWidth;
  const newPosition = -activeIndex.value * cardWidth;

  // Smooth transition
  cancelAnimationFrame(animationId.value);

  const animate = () => {
    const diff = newPosition - currentTranslate.value;
    currentTranslate.value += diff * 0.15; // Slightly faster animation
    translateX.value = currentTranslate.value;

    if (Math.abs(diff) > 0.5) {
      animationId.value = requestAnimationFrame(animate);
    } else {
      // Snap exactly to the position once we're close enough
      translateX.value = newPosition;
      currentTranslate.value = newPosition;
    }
  };

  animate();
};

// Drag functionality
const startDrag = (e) => {
  if (filteredReviews.value.length <= 1) return;

  if (e.type === 'touchstart') {
    startPos.value = e.touches[0].clientX;
  } else {
    startPos.value = e.clientX;
    e.preventDefault();
  }

  isDragging.value = true;
  currentTranslate.value = translateX.value;
  cancelAnimationFrame(animationId.value);
};

const onDrag = (e) => {
  if (!isDragging.value) return;

  const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  const diff = currentPosition - startPos.value;

  // Apply resistance when dragging beyond boundaries
  let resistance = 1;
  const maxDrag = carousel.value ? carousel.value.offsetWidth * 0.2 : 0;

  if (
      (activeIndex.value === 0 && diff > 0) ||
      (activeIndex.value === filteredReviews.value.length - 1 && diff < 0)
  ) {
    resistance = 0.2;
  }

  translateX.value = currentTranslate.value + (diff * resistance);
};

const endDrag = (e) => {
  if (!isDragging.value) return;
  isDragging.value = false;

  const endPos = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
  const diff = endPos - startPos.value;

  // Only change slide if drag distance is significant
  if (Math.abs(diff) > 80 && carousel.value) {
    if (diff > 0 && activeIndex.value > 0) {
      prevReview();
    } else if (diff < 0 && activeIndex.value < filteredReviews.value.length - 1) {
      nextReview();
    } else {
      // Snap back to current position
      updateCarouselPosition();
    }
  } else {
    // Snap back to current position
    updateCarouselPosition();
  }
};

const fetchReviews = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await fetch(`/api/googleReviews?placeId=${placeId}`);
    const data = await response.json();

    if (data.error) {
      error.value = data.error;
    } else {
      reviews.value = data.reviews || [];
    }
  } catch (err) {
    error.value = 'Failed to fetch reviews. Please check your connection and try again.';
    console.error(err);
  } finally {
    loading.value = false;

    // Initialize carousel position after reviews are loaded
    setTimeout(() => {
      updateCarouselPosition();
    }, 100);
  }
};

onMounted(() => {
  fetchReviews();
});
</script>

<style scoped>
/* Google-inspired colors */
:root {
  --google-blue: #4285F4;
  --google-red: #EA4335;
  --google-yellow: #FBBC05;
  --google-green: #34A853;
  --text-primary: #202124;
  --text-secondary: #5F6368;
  --surface-light: #F8F9FA;
  --surface-variant: #F1F3F4;
  --error-color: #D93025;
  --border-color: #DADCE0;
  --shadow-color: rgba(60, 64, 67, 0.3);
  --star-color: #FBBC05;
  --active-blue: #1A73E8;
}

/* Main Container */
.google-reviews-container {
  max-width: 64rem;
  margin: 0 auto;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  font-family: 'Google Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Loading State with animated spinner */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20rem;
  background-color: var(--surface-light);
}

.loading-spinner {
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
}

.spinner-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: var(--google-blue);
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}

.spinner-circle-inner {
  position: absolute;
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
  border: 4px solid transparent;
  border-top-color: var(--google-red);
  border-radius: 50%;
  animation: spin 0.8s linear infinite reverse;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-message {
  font-size: 1.25rem;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Error State */
.error-container {
  display: flex;
  align-items: center;
  padding: 2rem;
  background-color: #FDECEA;
  border-left: 4px solid var(--error-color);
}

.error-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--error-color);
  color: white;
  font-weight: bold;
  border-radius: 50%;
  margin-right: 1rem;
  font-size: 1.5rem;
}

.error-content {
  flex: 1;
}

.error-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--error-color);
  font-weight: 500;
}

.error-message {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.retry-button {
  background-color: white;
  color: var(--google-blue);
  border: 1px solid var(--google-blue);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-button:hover {
  background-color: rgba(66, 133, 244, 0.04);
}

/* Header Section */
.reviews-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.reviews-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.google-branding {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.5rem;
}

.google-g { color: var(--google-blue); }
.google-o1 { color: var(--google-red); }
.google-o2 { color: var(--google-yellow); }
.google-g2 { color: var(--google-blue); }
.google-l { color: var(--google-green); }
.google-e { color: var(--google-red); }

.reviews-label {
  margin-left: 0.5rem;
  color: var(--text-primary);
}

.stats-container {
  display: flex;
  align-items: center;
}

.average-rating {
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-primary);
  margin-right: 0.5rem;
}

.total-reviews {
  margin-left: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.filter-sort {
  margin-top: 1rem;
}

.filter-pills {
  display: flex;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  -webkit-overflow-scrolling: touch;
}

.filter-pill {
  flex: 0 0 auto;
  margin-right: 0.5rem;
  padding: 0.4rem 0.75rem;
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.filter-pill .star-icon {
  margin-left: 0.25rem;
  color: var(--star-color);
}

.filter-pill:hover {
  background-color: var(--surface-variant);
}

.filter-pill.active {
  background-color: var(--active-blue);
  color: white;
  border-color: var(--active-blue);
}

.filter-pill.active .star-icon {
  color: white;
}

/* Carousel Wrapper */
.carousel-wrapper {
  position: relative;
  padding: 1.5rem;
  background-color: white;
}

.carousel-container {
  width: 100%;
  overflow: hidden;
  cursor: grab;
  user-select: none;
}

.carousel-container:active {
  cursor: grabbing;
}

.carousel-track {
  display: flex;
  will-change: transform;
}

/* Review Card Animations */
.review-card-enter-active,
.review-card-leave-active {
  transition: all 0.3s ease;
}

.review-card-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.review-card-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Review Card */
.review-card {
  flex: 0 0 100%;
  min-height: 18rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.review-card.active {
  z-index: 2;
  transform: scale(1);
}

.review-card.prev,
.review-card.next {
  opacity: 0.7;
  filter: blur(1px);
  transform: scale(0.95);
}

.review-card.far-prev,
.review-card.far-next {
  opacity: 0.4;
  filter: blur(2px);
  transform: scale(0.9);
}

.review-content {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin: 0 0.75rem;
  height: 100%;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.review-card.active .review-content {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.reviewer-profile {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--google-blue), var(--google-green));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 1.25rem;
  margin-right: 1rem;
}

.reviewer-info {
  flex: 1;
}

.reviewer-name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-primary);
}

.review-date {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Star Display */
.star-rating, .star-rating-display {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 20px;
  margin-bottom: 0.75rem;
}

.star-background, .star-foreground {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
}

.star-background {
  color: #E0E0E0;
}

.star-foreground {
  color: var(--star-color);
  z-index: 1;
}

.star {
  display: inline-block;
  width: 20px;
  text-align: center;
}

/* Review Text */
.review-text-container {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.review-text {
  color: var(--text-primary);
  line-height: 1.5;
  margin: 0;
  max-height: 4.5rem;
  overflow: hidden;
  position: relative;
  transition: max-height 0.3s ease;
}

.review-text.expanded {
  max-height: 300px;
}

.review-text:not(.expanded)::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 1.5rem;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}

.read-more, .read-less {
  background: none;
  border: none;
  color: var(--active-blue);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem 0;
  display: block;
  transition: color 0.2s;
}

.read-more:hover, .read-less:hover {
  color: var(--google-blue);
  text-decoration: underline;
}

/* Review Actions */
.review-actions {
  display: flex;
  justify-content: flex-end;
}

.action-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-left: 0.75rem;
  transition: all 0.2s ease;
}

.action-button:hover {
  background-color: var(--surface-variant);
}

.action-button.active {
  color: var(--active-blue);
}

.action-icon {
  margin-right: 0.25rem;
}

/* Navigation Controls */
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
}

.nav-button {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: white;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-primary);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-button svg {
  width: 1.25rem;
  height: 1.25rem;
}

.nav-button:hover {
  background-color: var(--surface-variant);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.pagination {
  display: flex;
  align-items: center;
  margin: 0 1.5rem;
}

.page-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  margin: 0 0.375rem;
  padding: 0;
  background-color: var(--border-color);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-indicator.active {
  background-color: var(--active-blue);
  transform: scale(1.2);
}

.page-indicator:hover:not(.active) {
  background-color: var(--text-secondary);
  transform: scale(1.1);
}

.more-indicator {
  color: var(--text-secondary);
  margin: 0 0.375rem;
  font-weight: bold;
}

/* View All Section */
.view-all {
  padding: 1rem 1.5rem 1.5rem;
  text-align: center;
  border-top: 1px solid var(--border-color);
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  color: var(--active-blue);
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.view-all-link:hover {
  background-color: rgba(26, 115, 232, 0.08);
  text-decoration: underline;
}

.external-link-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.375rem;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .reviews-title {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats-container {
    margin-top: 1rem;
  }

  .filter-pills {
    overflow-x: auto;
    padding-bottom: 0.75rem;
    margin-bottom: -0.5rem;
  }

  .avatar {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }

  .review-card {
    min-height: 15rem;
  }
}

@media (max-width: 480px) {
  .reviews-header {
    padding: 1rem;
  }

  .carousel-wrapper {
    padding: 1rem;
  }

  .action-button .action-label {
    display: none;
  }

  .action-button {
    padding: 0.5rem;
  }

  .action-icon {
    margin-right: 0;
  }

  .nav-button {
    width: 2.5rem;
    height: 2.5rem;
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.google-reviews-container {
  animation: fadeIn 0.5s ease-out;
}

.review-card {
  animation: slideIn 0.4s ease-out;
  animation-fill-mode: both;
}

.filter-pill.active {
  animation: pulse 1s ease infinite;
}

/* Hover Animation for Review Cards */
.review-card.active .review-content:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* Loading Shimmer Effect */
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.loading-container .loading-message::after {
  content: '...';
  display: inline-block;
  animation: ellipsis 1.5s infinite;
}

@keyframes ellipsis {
  0% { content: '.'; }
  33% { content: '..'; }
  66% { content: '...'; }
}
</style>