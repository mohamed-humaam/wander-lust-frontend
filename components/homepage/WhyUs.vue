<template>
  <div class="why-us-section">
    <h2 class="section-title">WHY BOOK WITH WANDERLUST ADVENTURES</h2>

    <div class="benefits-container">
      <!-- Local Travel Counselor -->
      <div class="benefit-item">
        <div class="icon-container">
          <img src="/assets/icons/local.webp" alt="Local Icon" class="benefit-icon">
        </div>
        <h3 class="benefit-title">WE ARE LOCAL</h3>
        <p class="benefit-description">
          Your Maldives Travel Counsellor is your local travel agent and personal concierge. Easily Reachable at your service. We are on the ground just where you need us, based on stunning island of the Maldives
        </p>
      </div>

      <!-- Hand-picked Collection -->
      <div class="benefit-item">
        <div class="icon-container">
          <img src="/assets/icons/hand-shake.webp" alt="Handpicked Icon" class="benefit-icon">
        </div>
        <h3 class="benefit-title">HAND-PICKED COLLECTION</h3>
        <p class="benefit-description">
          Every luxury resort is hand-picked and is a preferred partner of WANDERLUST ADVENTURES Maldives. We are the contracted travel agent of the many luxury resorts, chosen personally for the experienced team of travel counsellors.
        </p>
      </div>

      <!-- Experience -->
      <div class="benefit-item">
        <div class="icon-container">
          <img src="/assets/icons/person-star.webp" alt="Experience Icon" class="benefit-icon">
        </div>
        <h3 class="benefit-title">WE SPEAK FROM EXPERIENCE</h3>
        <p class="benefit-description">
          We have visited every single resort featured on our website, dined at every restaurant, enjoyed the excursions and snorkelled around the house reefs. You can talk to us about just anything!
        </p>
      </div>

      <!-- Best Rates -->
      <div class="benefit-item">
        <div class="icon-container">
          <img src="/assets/icons/diamond.webp" alt="Rates Icon" class="benefit-icon">
        </div>
        <h3 class="benefit-title">BEST RATES & SPECIAL OFFERS</h3>
        <p class="benefit-description">
          Our competitive offers include some Exclusive Benefits or Added Values for our clients. We are experts in negotiating the best promotions, offering you the best value for money.
        </p>
      </div>

      <!-- Flight Tickets -->
      <div class="benefit-item">
        <div class="icon-container">
          <img src="/assets/icons/flight.webp" alt="Flight Icon" class="benefit-icon">
        </div>
        <h3 class="benefit-title">INTERNATIONAL FLIGHT TICKETS</h3>
        <p class="benefit-description">
          We work with more than 15 airlines to book your international flights to and from the Maldives. We find you the most suitable flight connection with just a few clicks and provide you with an interactive travel plan.
        </p>
      </div>

      <!-- Insurance -->
      <div class="benefit-item">
        <div class="icon-container">
          <img src="/assets/icons/insurance.webp" alt="Insurance Icon" class="benefit-icon">
        </div>
        <h3 class="benefit-title">WORLDWIDE TRAVEL INSURANCE</h3>
        <p class="benefit-description">
          The medical assistance covers up to 160,000 USD of healthcare worldwide and secure against other incidents like missing luggage, forced trip extension, loss of documents and many more...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhyUs'
}
</script>

<style scoped>
.why-us-section {
  font-family: Arial, sans-serif;
  background-color: #0d1420;
  color: white;
  padding: 4rem 2rem 2rem;
  text-align: center;
}

.section-title {
  font-family: Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 3rem;
  letter-spacing: 1px;
}

.benefits-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  font-family: Arial, sans-serif;
}

.icon-container {
  margin-bottom: 1rem;
}

.benefit-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 0.5rem;
}

.benefit-title {
  font-family: Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.benefit-description {
  font-family: Arial, sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .benefits-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .benefits-container {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>