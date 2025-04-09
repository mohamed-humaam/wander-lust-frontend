<template>
  <div class="booking-card">
    <h3 class="booking-title">Reserve Your Adventure</h3>

    <div class="price-display">
      <span class="currency">$</span>
      <span class="price-value">{{ formatPrice(price) }}</span>
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
        <span>{{ duration }} Days Trip</span>
      </div>

      <div class="booking-detail-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span>{{ locationName }}</span>
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

      <div class="booking-detail-item" v-if="category">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span>{{ category }}</span>
      </div>
    </div>

    <div class="booking-form">
      <div class="form-row">
        <div class="form-group">
          <label for="travel-date">Travel Date</label>
          <input type="date" id="travel-date" class="form-control" v-model="travelDate" />
        </div>
        <div class="form-group">
          <label for="guests">Guests</label>
          <select id="guests" class="form-control" v-model="guestCount">
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5 Guests</option>
            <option value="6">6 Guests</option>
          </select>
        </div>
      </div>

      <button class="reserve-button" @click="handleReserve">
        <span>Reserve Now</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>

      <button class="inquire-button" @click="handleInquire">
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
    <a href="tel:+9603336796" class="assistance-contact">+960 333-6796</a>
    <div class="assistance-email">
      <a href="mailto:reservations@wanderlustadventuresmv.com">reservations@wanderlustadventuresmv.com</a>
    </div>
  </div>

  <!-- Package highlights card -->
  <div class="highlights-card" v-if="highlights?.length > 0">
    <h4>Package Highlights</h4>
    <ul class="highlights-list">
      <li v-for="(highlight, index) in highlights.slice(0, 5)" :key="index">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>{{ highlight }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  price: {
    type: [Number, String],
    required: true
  },
  duration: {
    type: [Number, String],
    required: true
  },
  locationName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: null
  },
  highlights: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['reserve', 'inquire']);

const travelDate = ref('');
const guestCount = ref('2');

const formatPrice = (price) => {
  if (!price && price !== 0) return '0.00';
  return parseFloat(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const handleReserve = () => {
  emit('reserve', {
    date: travelDate.value,
    guests: guestCount.value
  });
};

const handleInquire = () => {
  emit('inquire');
};
</script>

<style scoped>
.booking-card {
  background-color: var(--background-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 1.75rem;
  position: sticky;
  top: 1rem;
  border: 1px solid var(--border-color);
}

.booking-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.price-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.currency {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.price-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-color);
  margin: 0 0.2rem;
  line-height: 1;
}

.price-unit {
  font-size: 1rem;
  color: var(--text-light);
  font-weight: 500;
}

.booking-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--background-light);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.booking-detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
}

.booking-detail-item svg {
  color: var(--primary-color);
  flex-shrink: 0;
}

.booking-form {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.95rem;
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
  padding: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
}

.reserve-button:hover {
  background-color: var(--primary-dark);
}

.inquire-button {
  width: 100%;
  padding: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: transparent;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
}

.inquire-button:hover {
  background-color: var(--background-light);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.booking-info {
  border-top: 1px solid var(--border-color);
  padding-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
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
  padding: 1.75rem;
  margin-top: 1.5rem;
  text-align: center;
  border: 1px solid var(--border-color);
}

.assistance-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.assistance-icon svg {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--primary-color);
}

.assistance-card h4 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.assistance-card p {
  color: var(--text-light);
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.assistance-contact {
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.assistance-email {
  font-size: 0.95rem;
}

.assistance-contact,
.assistance-email a {
  text-decoration: none;
  color: #1F2937;
}

.assistance-contact:hover,
.assistance-email a:hover {
  text-decoration: none;
  color: #FF5E14;
  transition: 0.3s ease;
}

/* Highlights Card */
.highlights-card {
  background-color: var(--background-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 1.75rem;
  margin-top: 1.5rem;
  border: 1px solid var(--border-color);
}

.highlights-card h4 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.highlights-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.highlights-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.95rem;
}

.highlights-list li svg {
  color: var(--primary-color);
  flex-shrink: 0;
  margin-top: 0.15rem;
}
</style>