<template>
  <section class="amenities-section" v-if="amenities?.length">
    <h2 class="section-title">Travel Amenities</h2>
    <div class="amenities-grid">
      <div
          v-for="amenity in amenities"
          :key="amenity.id"
          class="amenity-card"
      >
        <div class="amenity-image-wrapper">
          <div class="amenity-icon">
            <img
                :src="getImageUrl(amenity.icon)"
                :alt="amenity.name"
                @error="handleIconError"
            />
          </div>
        </div>
        <div class="amenity-content">
          <h3 class="amenity-title">{{ amenity.name }}</h3>
          <div class="amenity-description" v-html="amenity.description"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  amenities: {
    type: Array,
    default: () => []
  }
});

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/assets/images/placeholder/img.png';
  if (imagePath.startsWith('http')) return imagePath;
  const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || 'https://admin.wanderlustadventuresmv.com';
  return `${apiBaseUrl}/${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`;
};

const handleIconError = (event) => {
  event.target.src = '/assets/images/placeholder/img.png';
};
</script>

<style scoped>
.amenities-section {
  background-color: var(--background-white, #ffffff);
  border-radius: var(--radius-lg, 12px);
  box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1));
  padding: 1.5rem;
  height: auto;
  min-height: 0;
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
  background: linear-gradient(90deg, #9333ea, #c084fc);
  border-radius: 4px;
}

.amenities-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .amenities-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .amenities-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;
  }
}

.amenity-card {
  display: flex;
  flex-direction: column;
  background-color: var(--background-light, #f8fafc);
  border-radius: var(--radius-lg, 12px);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.amenity-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05));
  border-color: rgba(147, 51, 234, 0.3);
}

.amenity-image-wrapper {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.15), rgba(192, 132, 252, 0.1));
  padding: 1.5rem;
  display: flex;
  justify-content: center;
}

.amenity-icon {
  width: 3.5rem;
  height: 3.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(147, 51, 234, 0.2);
}

.amenity-icon img {
  width: 1.8rem;
  height: 1.8rem;
  object-fit: contain;
}

.amenity-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.amenity-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-color, #2d3748);
  position: relative;
  display: inline-block;
}

.amenity-description {
  font-size: 0.95rem;
  color: var(--text-light, #4a5568);
  line-height: 1.7;
}
</style>