<template>
  <section class="activities-section" v-if="activities?.length">
    <h2 class="section-title">Included Activities</h2>
    <div class="activities-grid">
      <div
          v-for="activity in activities"
          :key="activity.id"
          class="activity-card"
      >
        <div class="activity-image-wrapper">
          <div class="activity-icon">
            <img
                :src="getImageUrl(activity.icon.startsWith('0') ? `icons/${activity.icon}` : activity.icon)"
                :alt="activity.name"
                @error="handleIconError"
            />
          </div>
        </div>
        <div class="activity-content">
          <h3 class="activity-title">{{ activity.name }}</h3>
          <div class="activity-description" v-html="activity.description"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  activities: {
    type: Array,
    default: () => []
  }
});

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/assets/images/placeholder/img.png';
  if (imagePath.startsWith('http')) return imagePath;
  const apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || 'http://wander-lust.test';
  return `${apiBaseUrl}/${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`;
};

const handleIconError = (event) => {
  event.target.src = '/assets/images/placeholder/img.png';
};
</script>

<style scoped>
.activities-section {
  background-color: var(--background-white, #ffffff);
  border-radius: var(--radius-lg, 12px);
  box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1));
  padding: 2rem;
  margin-bottom: 2rem;
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
  background: linear-gradient(90deg, var(--primary-color, #ff7d00), #32CD32);
  border-radius: 4px;
}

.activities-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .activities-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .activities-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;
  }
}

.activity-card {
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

.activity-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05));
  border-color: rgba(50, 205, 50, 0.3);
}

.activity-image-wrapper {
  background: linear-gradient(135deg, rgba(50, 205, 50, 0.15), rgba(0, 150, 0, 0.1));
  padding: 1.5rem;
  display: flex;
  justify-content: center;
}

.activity-icon {
  width: 3.5rem;
  height: 3.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(50, 205, 50, 0.2);
}

.activity-icon img {
  width: 1.8rem;
  height: 1.8rem;
  object-fit: contain;
}

.activity-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.activity-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-color, #2d3748);
  position: relative;
  display: inline-block;
}

.activity-description {
  font-size: 0.95rem;
  color: var(--text-light, #4a5568);
  line-height: 1.7;
}
</style>