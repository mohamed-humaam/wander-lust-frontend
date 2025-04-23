<template>
  <div>
    <ClientOnly>
      <div v-if="pending" class="loading-state">
        <p>Loading room category...</p>
      </div>
      <div v-else-if="error" class="error-state">
        <p>Error loading rooms: {{ error.message }}</p>
      </div>
      <div v-else-if="category" class="category-page">
        <!-- Category Header with Background Image -->
        <div
            class="category-header"
            :style="categoryBackgroundStyle"
        >
          <div class="category-overlay">
            <h1>{{ category.name }}</h1>
            <!-- <p class="category-description" v-html="category.description"></p> -->
          </div>
        </div>

        <!-- Rooms Section -->
        <div class="rooms-section">
          <div v-if="filteredRooms.length" class="rooms-container">
            <LocationCard
                v-for="room in filteredRooms"
                :key="room.id"
                :locationData="room"
                @view-details="navigateToRoom"
                @book-now="navigateToBooking"
            />
          </div>
          <div v-else class="no-rooms">
            <p>No rooms available in this category.</p>
            <NuxtLink to="/rooms" class="back-link">Browse all rooms</NuxtLink>
          </div>
        </div>
      </div>
      <div v-else class="not-found">
        <p>Category not found</p>
        <NuxtLink to="/rooms" class="back-link">Return to all rooms</NuxtLink>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import LocationCard from '~/components/packages/LocationCard.vue';

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

// Fetch rooms data with error handling
const { data: roomsData, error, pending } = await useAsyncData(
    `room-category-${slug}`,
    async () => {
      try {
        const { data, error: fetchError } = await useFetch(
            'https://admin.wanderlustadventuresmv.com/api/rooms?with=roomLinks.category'
        );

        if (fetchError.value) {
          throw fetchError.value;
        }

        if (data.value) {
          // Find the category from room links
          const matchingRoom = data.value.find(
              room => room.room_links?.some(link => link.category?.slug === slug)
          );

          if (matchingRoom) {
            const category = matchingRoom.room_links.find(link => link.category?.slug === slug)?.category;
            const filteredRooms = data.value.filter(
                room => room.room_links?.some(link => link.category?.slug === slug)
            );

            return { category, filteredRooms };
          }
        }

        return { category: null, filteredRooms: [] };
      } catch (err) {
        if (isMounted.value) {
          console.error('Error fetching rooms:', err);
        }
        return { category: null, filteredRooms: [], error: err };
      }
    }
);

// Use the category from rooms data
const category = computed(() => {
  if (!isMounted.value) return null;
  return roomsData.value?.category || null;
});

const filteredRooms = computed(() => {
  if (!isMounted.value) return [];
  return roomsData.value?.filteredRooms || [];
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
    // Make sure the path doesn't already have "storage/" at the beginning
    if (!cleanPath.startsWith('storage/')) {
      cleanPath = `storage/${cleanPath}`;
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

const navigateToRoom = (roomId) => {
  router.push(`/rooms/product/${roomId}`);
};

const navigateToBooking = (roomId) => {
  router.push(`/booking?room_id=${roomId}`);
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

.rooms-container {
  padding: 1rem 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.loading-state, .error-state, .not-found, .no-rooms {
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

  .rooms-container {
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

  .rooms-container {
    grid-template-columns: 1fr;
  }

  .category-header h1 {
    font-size: 1.8rem;
  }
}
</style>