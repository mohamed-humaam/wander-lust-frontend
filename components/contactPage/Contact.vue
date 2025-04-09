<template>
  <div class="contact-container">
    <!-- Hero Section -->
    <div class="contact-hero">
      <div class="hero-content">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you! Reach out for inquiries, support, or just to say hello.</p>
      </div>
    </div>


    <div class="rest-of-page">
      <!-- Contact Cards Section -->
      <div class="contact-cards">
        <div class="contact-card">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h3>Call Us</h3>
          <p>(+960) 726-3030</p>
          <p class="small-text">Saturday-Thursday (8 AM - 5 PM)</p>
        </div>

        <div class="contact-card">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <h3>Email Us</h3>
          <p>reservations@wanderlustadventuresmv.com</p>
          <p class="small-text">Web: www.wanderlustadventuresmv.com</p>
        </div>

        <div class="contact-card">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h3>Visit Us</h3>
          <p>Addu City</p>
          <p class="small-text">Mendhurah Folheymaage, S. Hithadhoo</p>
        </div>
      </div>

      <!-- Contact Form and Map Section -->
      <div class="contact-main">
        <div class="contact-form-section">
          <h2>Send Us a Message</h2>
          <form id="contactForm" class="modern-form">
            <div class="form-group dual-inputs">
              <div class="input-group">
                <label for="name">Your Name</label>
                <input type="text" id="name" required placeholder="John Doe">
              </div>
              <div class="input-group">
                <label for="email">Your Email</label>
                <input type="email" id="email" required placeholder="john@example.com">
              </div>
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <input type="text" id="subject" required placeholder="How can we help?">
            </div>

            <div class="form-group">
              <label for="message">Your Message</label>
              <textarea id="message" rows="5" required placeholder="Write your message here..."></textarea>
            </div>

            <button type="submit" class="submit-btn">
              Send Message
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>

        <div class="contact-map">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.594096442738!2d73.08469777551021!3d-0.6074409352620724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x24b5a10028897a43%3A0x85822b2cb614430a!2sWanderlust%20adventures%20pvt%20ltd!5e0!3m2!1sen!2smv!4v1744229017832!5m2!1sen!2smv"
              allowfullscreen=""
              loading="lazy"
              class="map-iframe">
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactPage",
};
</script>

<style scoped>
/* Base Styles */
:root {
  --primary-color: #4361ee;
  --secondary-color: #3f37c9;
  --accent-color: #4cc9f0;
  --text-color: #2b2d42;
  --light-text: #8d99ae;
  --background-light: #f8f9fa;
  --white: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
}

/* Contact Container */
.contact-container {
  margin: 0;
  padding: 0;
}

/* Hero Section */
.contact-hero {
  background: linear-gradient(135deg, #ff7b25, #ff5e00, #000000);
  color: white;
  padding: 5rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contact-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="rgba(255,255,255,0.05)" d="M0,0 L100,0 L100,100 L0,100 Z"></path></svg>');
  background-size: cover;
  opacity: 0.15;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 2rem;
  border-radius: 8px;
  //background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
}

.contact-hero h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3),
  0 4px 8px rgba(0, 0, 0, 0.2),
  0 0 12px rgba(255, 165, 0, 0.4);
  letter-spacing: -0.5px;
}

.contact-hero p {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3),
  0 2px 6px rgba(0, 0, 0, 0.2);
  font-weight: 500;
}

  /* Contact Cards */

  .contact-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
  }

  .contact-card {
    background: var(--white);
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    box-shadow: var(--shadow);
    transition: var(--transition);
  }

  .contact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .card-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 20px;
    background: rgba(67, 97, 238, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-icon svg {
    width: 24px;
    height: 24px;
    color: var(--primary-color);
  }

  .contact-card h3 {
    margin-bottom: 10px;
    font-size: 1.3rem;
  }

  .contact-card p {
    margin-bottom: 5px;
    color: var(--text-color);
  }

  .small-text {
    font-size: 0.9rem;
    color: var(--light-text);
  }

  /* Contact Main Section */

  .contact-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 80px;
  }

  .rest-of-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    .contact-main {
      grid-template-columns: 1fr;
    }
  }

  /* Contact Form */

  .contact-form-section {
    background: var(--white);
    padding: 40px;
    border-radius: 10px;
    box-shadow: var(--shadow);
  }

  .contact-form-section h2 {
    margin-bottom: 30px;
    font-size: 1.8rem;
    color: var(--text-color);
  }

  .modern-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .dual-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 480px) {
    .dual-inputs {
      grid-template-columns: 1fr;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-color);
  }

  input, textarea {
    padding: 12px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 1rem;
    transition: var(--transition);
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  .submit-btn {
    background: var(--primary-color);
    color: var(--white);
    border: none;
    padding: 14px 20px;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: var(--transition);
  }

  .submit-btn:hover {
    background: var(--secondary-color);
    transform: translateY(-2px);
  }

  .submit-btn svg {
    width: 18px;
    height: 18px;
  }

  /* Map Section */

  .contact-map {
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--shadow);
  }

  .map-iframe {
    width: 100%;
    height: 100%;
    min-height: 500px;
    border: none;
  }

  @media (max-width: 768px) {
    .contact-hero {
      padding: 3rem 1rem;
      background: linear-gradient(135deg, #ff7b25, #ff5e00, #222222);
    }

    .contact-hero h1 {
      font-size: 2.2rem;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3),
      0 2px 6px rgba(0, 0, 0, 0.2);
    }

    .contact-hero p {
      font-size: 1.1rem;
    }

    .hero-content {
      padding: 1.5rem;
      backdrop-filter: blur(2px);
    }

    .map-iframe {
      min-height: 300px;
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-content h1 {
    animation: fadeIn 0.8s ease-out forwards;
  }

  .hero-content p {
    animation: fadeIn 0.8s ease-out 0.2s forwards;
    opacity: 0;
  }

  .contact-card {
    animation: fadeIn 0.5s ease forwards;
  }

  .contact-card:nth-child(1) {
    animation-delay: 0.1s;
  }

  .contact-card:nth-child(2) {
    animation-delay: 0.2s;
  }

  .contact-card:nth-child(3) {
    animation-delay: 0.3s;
  }
</style>