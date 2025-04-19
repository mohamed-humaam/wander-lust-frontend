<template>
  <div class="rooms-page">
    <!-- Header with Background Image Carousel -->
    <div class="header-container">
      <!-- Background Images -->
      <div
          v-for="(image, index) in images"
          :key="index"
          class="header-image"
          :class="{ active: currentImage === index }"
          :style="{ backgroundImage: `url(${image})` }"
      ></div>

      <!-- Image Controls -->
      <div class="image-controls">
        <button @click="prevImage" class="control-btn">❮</button>
        <div class="image-indicators">
          <span
              v-for="(index) in images.length"
              :key="index-1"
              :class="{ active: currentImage === index-1 }"
              @click="setImage(index-1)"
          ></span>
        </div>
        <button @click="nextImage" class="control-btn">❯</button>
      </div>

      <!-- Header Content -->
      <div class="header-content">
        <h1>Our Available Rooms</h1>
      </div>
    </div>

    <!-- Rooms Grid -->
    <ClientOnly>
      <div class="rooms-container">
        <template v-if="status!=='pending' && rooms && rooms.length">
          <RoomCard
              v-for="(pkg, index) in rooms"
              :key="pkg?.id || index"
              :roomData="pkg"
              @view-details="navigateToRoomDetail"
              @book-now="bookRoom"
          />
        </template>
        <div v-else-if="status==='pending'" class="loading">
          Loading rooms...
        </div>
        <div v-else class="no-rooms">
          No rooms available at the moment.
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import RoomCard from "~/components/packages/RoomCard.vue";

const router = useRouter();

// Background image carousel
const images = ref([
  '/assets/images/hero/banner-1.jpg',
  '/assets/images/hero/banner-2.jpg',
  '/assets/images/hero/banner-3.jpg',
  '/assets/images/hero/banner-4.jpg',
  '/assets/images/hero/banner-5.jpg',
  '/assets/images/hero/banner-6.jpg',
  '/assets/images/hero/banner-7.jpg',
  '/assets/images/hero/banner-8.jpg',
  '/assets/images/hero/banner-9.jpg',
  '/assets/images/hero/banner-10.jpg',
]);
const currentImage = ref(0);
let carouselInterval = null;

// Fetch rooms data
const { data: rooms, status, error } = await usePackages();

// Add error handling
if (error.value) {
  console.error('Error fetching rooms:', error.value);
}

// Carousel control methods
function startCarousel() {
  carouselInterval = setInterval(() => {
    nextImage();
  }, 5000);
}

function nextImage() {
  currentImage.value = (currentImage.value + 1) % images.value.length;
}

function prevImage() {
  currentImage.value = (currentImage.value - 1 + images.value.length) % images.value.length;
}

function setImage(index) {
  currentImage.value = index;
  // Reset the interval when manually changing image
  clearInterval(carouselInterval);
  startCarousel();
}

// Handle navigation to room detail page
function navigateToRoomDetail(roomId) {
  if (roomId) {
    router.push(`/rooms/${roomId}`);
  } else {
    console.error('No room ID provided for navigation');
  }
}

// Handle booking room
function bookRoom(roomId) {
  if (roomId) {
    // This could either navigate to a booking page or show a modal
    console.log(`Booking room with ID: ${roomId}`);
    alert(`Thank you for room. Room ID: ${roomId}`);
    // Alternatively, you could navigate to a booking page:
    // router.push(`/booking/${roomId}`);
  }
}

// Lifecycle hooks
onMounted(() => {
  startCarousel();
});

onBeforeUnmount(() => {
  clearInterval(carouselInterval);
});
</script>

<style scoped>
.rooms-page {
  margin: 0 auto;
}

/* Header Styles */
.header-container {
  position: relative;
  width: 100%;
  height: 200px; /* Shorter header height */
  overflow: hidden;
  margin-bottom: 2rem;
}

.header-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: 1;
}

.header-image.active {
  opacity: 1;
}

.header-image.active::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 125, 0, 0.3); /* Orange overlay with 30% transparency */
  z-index: 2;
}

.header-content {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}

.header-content h1 {
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Image Controls */
.image-controls {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 4;
}

.control-btn {
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.5);
}

.image-indicators {
  display: flex;
  gap: 8px;
}

.image-indicators span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.3s;
}

.image-indicators span.active {
  background: white;
}

/* Rooms Container */
.rooms-container {
  padding: 1rem 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.loading {
  text-align: center;
  padding: 2rem;
  grid-column: 1 / -1;
}

.loading, .no-rooms {
  text-align: center;
  padding: 3rem 1rem;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-column: 1 / -1;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .rooms-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .header-content h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .rooms-container {
    grid-template-columns: 1fr;
  }

  .header-content h1 {
    font-size: 1.8rem;
  }
}
</style>