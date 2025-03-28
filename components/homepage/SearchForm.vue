<template>
  <div class="search-container">
    <div class="search-header">
      <h2>Find Your Perfect Stay</h2>
      <p>Discover luxury accommodations tailored for you</p>
    </div>

    <form @submit.prevent="performSearch" class="search-form">
      <!-- Location Search -->
      <div class="form-group location-group" :class="{ 'has-suggestions': locationSuggestions.length }">
        <div class="input-wrapper">
          <label for="location">
            <i class="icon icon-location"></i>
            <span>Destination</span>
          </label>
          <input
              ref="locationInput"
              type="text"
              id="location"
              v-model="searchData.location"
              @input="searchLocations"
              @focus="showLocationSuggestions = true"
              @blur="handleLocationBlur"
              @keydown.esc="showLocationSuggestions = false"
              placeholder="City, Hotels and Resorts"
              required
              autocomplete="off"
          >
          <div
              v-if="showLocationSuggestions && locationSuggestions.length"
              class="location-suggestions"
              @mousedown.prevent
          >
            <div
                v-for="(suggestion, index) in locationSuggestions"
                :key="index"
                @click="selectLocation(suggestion)"
                class="suggestion-item"
            >
              <i class="icon icon-location"></i>
              <div class="suggestion-details">
                <div class="suggestion-title">{{ suggestion }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Date Range Picker -->
      <div class="form-group date-group">
        <div class="date-range-wrapper">
          <div class="date-input check-in">
            <label for="checkIn">
              <i class="icon icon-calendar"></i>
              <span>Check-in</span>
            </label>
            <input
                type="date"
                id="checkIn"
                v-model="searchData.checkIn"
                :min="minCheckInDate"
                required
            >
          </div>
          <div class="date-separator mobile-hidden">
            <i class="icon icon-arrow-right"></i>
          </div>
          <div class="date-input check-out">
            <label for="checkOut">
              <i class="icon icon-calendar"></i>
              <span>Check-out</span>
            </label>
            <input
                type="date"
                id="checkOut"
                v-model="searchData.checkOut"
                :min="minCheckOutDate"
                required
            >
          </div>
        </div>
      </div>

      <!-- Travelers Selector -->
      <div class="form-group travelers-group">
        <div class="travelers-input-wrapper">
          <label @click="toggleTravelersDropdown">
            <i class="icon icon-guests"></i>
            <span>Guests & Rooms</span>
          </label>
          <div
              class="travelers-input"
              @click="toggleTravelersDropdown"
              tabindex="0"
              @keydown.space.prevent="toggleTravelersDropdown"
              @keydown.enter.prevent="toggleTravelersDropdown"
              :class="{ 'active': showTravelersDropdown }"
          >
            <span>{{ travellerSummary }}</span>
            <i class="icon icon-chevron-down"></i>
          </div>

          <transition name="fade-slide">
            <div v-if="showTravelersDropdown" class="travelers-dropdown" @click.stop>
              <div class="dropdown-header">
                <h4>Guest Configuration</h4>
                <button
                    type="button"
                    class="close-button"
                    @click.stop="showTravelersDropdown = false"
                    aria-label="Close"
                >
                  <i class="icon icon-close"></i>
                </button>
              </div>

              <div class="dropdown-content">
                <div class="dropdown-item">
                  <div class="counter-info">
                    <div class="counter-title">Adults</div>
                    <div class="counter-subtitle">Age 18+</div>
                  </div>
                  <div class="counter">
                    <button
                        type="button"
                        @click.stop="decrementAdults"
                        :disabled="searchData.adults <= 1"
                        class="counter-button"
                        aria-label="Decrease adults"
                    >
                      <i class="icon icon-minus"></i>
                    </button>
                    <span class="counter-value">{{ searchData.adults }}</span>
                    <button
                        type="button"
                        @click.stop="incrementAdults"
                        :disabled="searchData.adults >= 10"
                        class="counter-button"
                        aria-label="Increase adults"
                    >
                      <i class="icon icon-plus"></i>
                    </button>
                  </div>
                </div>

                <div class="dropdown-item">
                  <div class="counter-info">
                    <div class="counter-title">Children</div>
                    <div class="counter-subtitle">Ages 0-17</div>
                  </div>
                  <div class="counter">
                    <button
                        type="button"
                        @click.stop="decrementChildren"
                        :disabled="searchData.children <= 0"
                        class="counter-button"
                        aria-label="Decrease children"
                    >
                      <i class="icon icon-minus"></i>
                    </button>
                    <span class="counter-value">{{ searchData.children }}</span>
                    <button
                        type="button"
                        @click.stop="incrementChildren"
                        :disabled="searchData.children >= 6"
                        class="counter-button"
                        aria-label="Increase children"
                    >
                      <i class="icon icon-plus"></i>
                    </button>
                  </div>
                </div>

                <div class="dropdown-item">
                  <div class="counter-info">
                    <div class="counter-title">Rooms</div>
                    <div class="counter-subtitle">Maximum comfort</div>
                  </div>
                  <div class="counter">
                    <button
                        type="button"
                        @click.stop="decrementRooms"
                        :disabled="searchData.rooms <= 1"
                        class="counter-button"
                        aria-label="Decrease rooms"
                    >
                      <i class="icon icon-minus"></i>
                    </button>
                    <span class="counter-value">{{ searchData.rooms }}</span>
                    <button
                        type="button"
                        @click.stop="incrementRooms"
                        :disabled="searchData.rooms >= 5"
                        class="counter-button"
                        aria-label="Increase rooms"
                    >
                      <i class="icon icon-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="dropdown-footer">
                <button
                    type="button"
                    class="apply-button"
                    @click.stop="showTravelersDropdown = false"
                >
                  Apply
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Search Button -->
      <div class="form-group search-group">
        <button type="submit" class="search-btn">
          <span>Search</span>
          <i class="icon icon-search"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted, watch} from 'vue'
import {useGetLocations} from "~/composables/api-fetch.js";

const emit = defineEmits(['search'])

const showTravelersDropdown = ref(false)
const showLocationSuggestions = ref(false)
const locationSuggestions = ref([])

const searchData = ref({
  location: '',
  checkIn: '',
  checkOut: '',
  adults: 2,
  children: 0,
  rooms: 1
})

const searchedLocations = useGetLocations({search: computed(() => searchData.value.location)})

// Computed properties
const travellerSummary = computed(() => {
  const {adults, children, rooms} = searchData.value
  return `${adults} Adult${adults !== 1 ? 's' : ''}${children > 0 ? ` • ${children} Child${children !== 1 ? 'ren' : ''}` : ''} • ${rooms} Room${rooms !== 1 ? 's' : ''}`
})

const minCheckInDate = computed(() => new Date().toISOString().split('T')[0])

const minCheckOutDate = computed(() => {
  if (!searchData.value.checkIn) return minCheckInDate.value
  const nextDay = new Date(searchData.value.checkIn)
  nextDay.setDate(nextDay.getDate() + 1)
  return nextDay.toISOString().split('T')[0]
})

// Watchers
watch(() => searchData.value.checkIn, (newVal) => {
  if (new Date(searchData.value.checkOut) <= new Date(newVal)) {
    const nextDay = new Date(newVal)
    nextDay.setDate(nextDay.getDate() + 1)
    searchData.value.checkOut = nextDay.toISOString().split('T')[0]
  }
})

// Methods
const toggleTravelersDropdown = () => {
  showTravelersDropdown.value = !showTravelersDropdown.value
  showLocationSuggestions.value = false
}

const incrementAdults = () => searchData.value.adults < 10 && searchData.value.adults++
const decrementAdults = () => searchData.value.adults > 1 && searchData.value.adults--
const incrementChildren = () => searchData.value.children < 6 && searchData.value.children++
const decrementChildren = () => searchData.value.children > 0 && searchData.value.children--
const incrementRooms = () => searchData.value.rooms < 5 && searchData.value.rooms++
const decrementRooms = () => searchData.value.rooms > 1 && searchData.value.rooms--

const searchLocations = () => {
  locationSuggestions.value = searchedLocations.value?.data
      ?.map(location => location.name)
      ?.filter(name => name.toLowerCase().includes(searchData.value.location.toLowerCase()))
      ?.slice(0, 5) || []
}

const selectLocation = (location) => {
  searchData.value.location = location
  showLocationSuggestions.value = false
}

const performSearch = () => {
  if (!searchData.value.location) return
  if (new Date(searchData.value.checkOut) <= new Date(searchData.value.checkIn)) return

  emit('search', {...searchData.value})
}

//Remove Focus
const locationInput = ref(null)

const handleLocationBlur = () => {
  // Use setTimeout to allow click events to process before closing
  setTimeout(() => {
    showLocationSuggestions.value = false
  }, 200)
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.location-group') && !event.target.closest('.travelers-dropdown')) {
    showTravelersDropdown.value = false
    showLocationSuggestions.value = false
  }
}

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    showLocationSuggestions.value = false
    // Optionally focus back on the input
    locationInput.value?.focus()
  }
}

// Lifecycle hooks
onMounted(() => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  searchData.value.checkIn = today.toISOString().split('T')[0]
  searchData.value.checkOut = tomorrow.toISOString().split('T')[0]

  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* Base Styles */
.search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.search-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.search-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.75rem;
  line-height: 1.2;
  font-family: Arial, sans-serif;
}

.search-header p {
  font-size: 1.25rem;
  color: #ffffff;
  font-weight: 400;
  font-family: Arial, sans-serif;
}

/* Form Layout */
.search-form {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(0.5rem);
}

.form-group {
  position: relative;
}

/* Input Styles */
.input-wrapper {
  position: relative;
  height: 100%;
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  background: transparent;
  transition: all 0.2s ease;
  color: #1f2937;
  height: 48px;
}

input::placeholder {
  color: #1f2937;
  font-family: Arial, sans-serif;
  font-size: 16px;
}

input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

/* Icon Styles */
.icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-location {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E");
}

.icon-calendar {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z'/%3E%3C/svg%3E");
}

.icon-arrow-right {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M10 17l5-5-5-5v10z'/%3E%3C/svg%3E");
}

.icon-guests {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/%3E%3C/svg%3E");
}

.icon-chevron-down {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z'/%3E%3C/svg%3E");
}

.icon-close {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E");
}

.icon-plus {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/%3E%3C/svg%3E");
}

.icon-minus {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M19 13H5v-2h14v2z'/%3E%3C/svg%3E");
}

.icon-search {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E");
}

/* Location Suggestions */
.location-suggestions {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 50;
  backdrop-filter: blur(10px);
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.suggestion-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.suggestion-details {
  //flex: 1;
  //flex: 1;
}

.suggestion-title {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

/* Date Range Picker */
.date-range-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
}

.date-input {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.date-separator {
  display: flex;
  margin-top: 2rem;
  align-items: center;
  padding: 0 0.25rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Travelers Selector */
.travelers-input-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.travelers-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 48px;
  color: #1f2937;
  background: transparent;
}

.travelers-input:hover {
  background: rgba(255, 255, 255, 0.1);
}

.travelers-input.active {
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.travelers-input .icon-chevron-down {
  transition: transform 0.2s;
}

.travelers-input.active .icon-chevron-down {
  transform: rotate(180deg);
}

/* Travelers Dropdown */
.travelers-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 40;
  padding: 1rem;
  backdrop-filter: blur(10px);
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.dropdown-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.close-button {
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
}

.close-button:hover {
  color: #1f2937;
}

.dropdown-content {
  margin-bottom: 0.75rem;
}

.dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.counter-info {
  flex: 1;
}

.counter-title {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

.counter-subtitle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
}

.counter {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.counter-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.counter-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.counter-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.counter-value {
  color: rgba(255, 255, 255, 0.8);
  min-width: 1.5rem;
  text-align: center;
  font-weight: 500;
}

.dropdown-footer {
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.apply-button {
  width: 100%;
  padding: 0.625rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.apply-button:hover {
  background: #1d4ed8;
}

/* Search Button */
.search-group {
  display: flex;
  align-items: flex-end;
}

.search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 48px;
}

.search-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Animations */
.fade-slide-enter-active {
  transition: all 0.2s ease-out;
}

.fade-slide-leave-active {
  transition: all 0.15s ease-in;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .search-form {
    grid-template-columns: repeat(2, 1fr);
  }

  .location-group {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .search-form {
    grid-template-columns: 1fr;
  }

  .search-header h2 {
    font-size: 2rem;
  }

  .search-header p {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .search-container {
    padding: 1.5rem 1rem;
  }

  .date-range-wrapper {
    flex-direction: column;
    gap: 1rem;
  }

  .date-separator {
    transform: rotate(90deg);
    padding: 0.5rem 0;
  }
}

/* Date input styling */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 0.7;
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .search-form {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .form-group {
    flex: 1 1 calc(50% - 0.5rem);
    min-width: 250px;
  }

  .location-group {
    flex: 1 1 100%;
  }

  .date-group {
    flex: 1 1 calc(50% - 0.5rem);
  }

  .travelers-group {
    flex: 1 1 calc(50% - 0.5rem);
  }

  .search-group {
    flex: 1 1 100%;
  }

  .date-range-wrapper {
    flex-direction: column;
  }

  .date-input {
    width: 100%;
  }

  .date-separator {
    display: none;
  }

  .check-in, .check-out {
    margin-bottom: 1rem;
  }
}

@media (max-width: 600px) {
  .search-form {
    flex-direction: column;
  }

  .form-group {
    flex: 1 1 100%;
    min-width: auto;
  }

  .search-header h2 {
    font-size: 1.75rem;
  }

  .search-header p {
    font-size: 1rem;
  }

  .travelers-dropdown {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 100;
  }
}

/* Mobile-specific input styles */
@media (max-width: 480px) {
  input, .travelers-input {
    font-size: 16px;
  }
}

.mobile-hidden {
  display: block;
}

@media (max-width: 1024px) {
  .mobile-hidden {
    display: none;
  }
}
</style>