<template>
  <section class="destination-section" v-if="location">
    <h2 class="section-title">Destination</h2>
    <div class="location-card">
      <div class="location-images">
        <div class="main-image-container">
          <img
              :src="getImageUrl(location.images?.[0])"
              :alt="location.name"
              class="main-location-image"
              @error="handleImageError"
          />
        </div>
        <div class="location-gallery" v-if="location.gallery?.length">
          <div
              v-for="(img, idx) in location.gallery.slice(0, 3)"
              :key="idx"
              class="gallery-thumb-container"
          >
            <img
                :src="getImageUrl(img)"
                :alt="`${location.name} - Gallery ${idx + 1}`"
                class="gallery-thumb"
                @error="handleImageError"
            />
          </div>
          <div class="more-photos" v-if="location.gallery.length > 3">
            <span>+{{ location.gallery.length - 3 }} more</span>
          </div>
        </div>
      </div>
      <div class="location-content">
        <div class="location-header">
          <h3 class="location-title">{{ location.name }}</h3>
          <a
              v-if="location.google_location"
              :href="location.google_location"
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
        </div>
        <div class="location-description" v-html="location.description"></div>
        <div v-if="coordinates" class="location-coordinates">
          <p><strong>Coordinates:</strong> {{ coordinates.latitude }}, {{ coordinates.longitude }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  location: {
    type: Object,
    default: null
  }
});

const coordinates = computed(() => {
  if (!props.location?.location) return null;
  return parseLocationCoordinates(props.location.location);
});

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

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/assets/images/placeholder/img.png';
  if (imagePath.startsWith('http')) return imagePath;
  const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || 'http://wander-lust.test';
  return `${apiBaseUrl}/${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`;
};

const handleImageError = (event) => {
  event.target.src = '/assets/images/placeholder/img.png';
};
</script>

<style scoped>
.destination-section {
  background-color: var(--background-white, #ffffff);
  border-radius: var(--radius-lg, 12px);
  box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1));
  padding: 1.5rem;
  height: auto;
  min-height: 0;
  overflow: hidden;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 1.75rem;
  color: var(--text-color, #2d3748);
  position: relative;
  padding-bottom: 0.75rem;
  text-align: center;
}

.section-title:after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #f43f5e, #fb7185);
  border-radius: 4px;
}

.location-card {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: var(--radius-lg, 12px);
  overflow: hidden;
}

@media (min-width: 768px) {
  .location-card {
    flex-direction: row;
  }
}

.location-images {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.main-image-container {
  position: relative;
  border-radius: var(--radius-lg, 12px);
  overflow: hidden;
  box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
  height: 280px;
}

.main-location-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.main-image-container:hover .main-location-image {
  transform: scale(1.05);
}

.location-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  height: 85px;
}

.gallery-thumb-container {
  border-radius: var(--radius-md, 8px);
  overflow: hidden;
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1));
  height: 100%;
}

.gallery-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-thumb-container:hover .gallery-thumb {
  transform: scale(1.1);
}

.more-photos {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.more-photos:hover {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8));
}

.location-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.location-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

@media (min-width: 640px) {
  .location-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.location-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-color, #2d3748);
  position: relative;
  padding-bottom: 0.5rem;
}

.location-title:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 3px;
  background-color: #f43f5e;
  border-radius: 2px;
}

.location-description {
  color: var(--text-light, #4a5568);
  line-height: 1.7;
  margin-bottom: 1rem;
  font-size: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.map-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  background-color: #f43f5e;
  color: white;
  border-radius: var(--radius-full, 9999px);
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(244, 63, 94, 0.25);
  white-space: nowrap;
}

.map-link:hover {
  background-color: #e11d48;
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(244, 63, 94, 0.3);
  text-decoration: none;
}

.location-coordinates {
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: var(--radius-md, 8px);
  font-size: 0.95rem;
  color: var(--text-light, #4a5568);
  border-left: 3px solid #f43f5e;
}
</style>