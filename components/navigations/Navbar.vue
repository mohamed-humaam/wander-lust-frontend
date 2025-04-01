<template>
  <nav class="navbar" :class="{ 'scrolled': hasScrolled }">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="logo-container">
        <div class="logo-widget footer-widget">
          <div class="logo-container">
            <div class="default-logo">
              <img src="/assets/logo/logo.svg" alt="WanderLust" width="auto" height="40">
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Menu -->
      <div class="desktop-menu">
        <ul class="nav-links">
          <li v-for="(item, index) in navItems" :key="index" class="nav-item">
            <!-- Regular menu item without dropdown -->
            <template v-if="!item.hasDropdown">
              <a :href="item.path" :class="{ 'active': isActive(item.path) }" class="nav-link">
                {{ item.label }}
                <span class="nav-indicator" v-if="isActive(item.path)"></span>
              </a>
            </template>

            <!-- Menu item with dropdown -->
            <template v-else>
              <div class="dropdown-container">
                <a :href="item.path" :class="{ 'active': isActive(item.path) }" class="nav-link with-dropdown">
                  {{ item.label }}
                  <span class="nav-indicator" v-if="isActive(item.path)"></span>
                  <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </a>
                <div class="dropdown-menu">
                  <div class="dropdown-content">
                    <div v-for="category in parentCategories" :key="category.id" class="dropdown-item-container">
                      <a
                          :href="`/packages/category/${category.slug}`"
                          class="dropdown-item"
                          @mouseenter="handleParentHover(category.id)"
                      >
                        {{ category.name }}
                        <svg
                            v-if="hasChildren(category.id)"
                            class="dropdown-submenu-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </a>

                      <!-- Child categories dropdown -->
                      <div
                          v-if="hasChildren(category.id)"
                          class="dropdown-submenu"
                          :class="{ 'visible': activeParentId === category.id }"
                      >
                        <a
                            v-for="child in getChildCategories(category.id)"
                            :key="child.id"
                            :href="`/packages/category/${child.slug}`"
                            class="dropdown-subitem"
                        >
                          {{ child.name }}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </li>
        </ul>
      </div>

      <!-- Mobile Menu Toggle -->
      <div class="mobile-toggle">
        <button @click="toggleMobileMenu" class="hamburger" :class="{ 'open': isOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Drawer with Animation -->
    <transition name="slide">
      <div v-if="isOpen" class="mobile-menu">
        <div class="mobile-menu-container">
          <div class="mobile-nav-items">
            <!-- Regular menu items -->
            <template v-for="(item, index) in navItems" :key="index">
              <template v-if="!item.hasDropdown">
                <a
                    :href="item.path"
                    :class="{ 'active': isActive(item.path) }"
                    class="mobile-nav-link"
                    @click="isOpen = false"
                >
                  {{ item.label }}
                </a>
              </template>

              <!-- Dropdown for mobile -->
              <template v-else>
                <div class="mobile-dropdown">
                  <div
                      class="mobile-nav-link with-dropdown"
                      :class="{ 'active': isActive(item.path) }"
                      @click="toggleMobileDropdown(index)"
                  >
                    {{ item.label }}
                    <svg
                        class="dropdown-icon"
                        :class="{ 'rotate': openMobileDropdown === index }"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  <div class="mobile-dropdown-content" v-show="openMobileDropdown === index">
                    <a
                        v-for="category in categories"
                        :key="category.id"
                        :href="`/packages/category/${category.slug}`"
                        class="mobile-dropdown-item"
                        @click="isOpen = false"
                    >
                      {{ category.name }}
                    </a>
                  </div>
                </div>
              </template>
            </template>
          </div>

          <div class="mobile-menu-footer">
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="social-icon">
                  <path d="M22 4.01C21.0424 4.68544 19.9821 5.19755 18.86 5.53C18.2577 4.83755 17.4573 4.34523 16.567 4.12399C15.6767 3.90275 14.7395 3.96428 13.8821 4.29842C13.0247 4.63257 12.2884 5.22447 11.773 5.98979C11.2575 6.75511 10.9877 7.65376 11 8.57V9.57C9.24257 9.61323 7.50127 9.22543 5.93101 8.44863C4.36074 7.67182 3.01032 6.53114 2 5.13C2 5.13 -2 14.13 7 18.13C4.94053 19.5282 2.48716 20.2564 0 20.13C9 25.13 20 20.13 20 8.55C19.9991 8.27638 19.9723 8.00359 19.92 7.74C20.9406 6.73899 21.6608 5.45541 22 4.01Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="social-icon">
                  <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M17.5 6.5H17.51" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="social-icon">
                  <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 1 11.75C0.988687 13.537 1.14266 15.3213 1.46 17.08C1.59096 17.5398 1.83831 17.9581 2.17814 18.2945C2.51798 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 22.9983 13.5103 23 11.75C23.0113 9.96295 22.8573 8.1787 22.54 6.42Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.75 15.02L15.5 11.75L9.75 8.47998V15.02Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Dark Overlay -->
    <transition name="fade">
      <div v-if="isOpen" class="overlay" @click="isOpen = false"></div>
    </transition>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      isOpen: false,
      hasScrolled: false,
      openMobileDropdown: null,
      categories: [],
      navItems: [
        { label: 'Home', path: '/' },
        {
          label: 'Packages',
          path: '/packages',
          hasDropdown: true
        },
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact-us' }
      ]
    };
  },
  methods: {
    /**
     * Toggles the mobile menu open/closed state
     * Also handles body scroll locking when menu is open
     */
    toggleMobileMenu() {
      this.isOpen = !this.isOpen;
      if (typeof window !== 'undefined') {
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
      }
    },

    /**
     * Toggles a specific dropdown menu in mobile view
     * @param {number} index - The index of the dropdown to toggle
     */
    toggleMobileDropdown(index) {
      this.openMobileDropdown = this.openMobileDropdown === index ? null : index;
    },

    /**
     * Checks if the current route matches the given path
     * @param {string} route - The route path to check
     * @returns {boolean} - True if current route matches given path
     */
    isActive(route) {
      return this.$route && this.$route.path === route;
    },

    /**
     * Handles scroll events to add scrolled class to navbar
     */
    handleScroll() {
      if (typeof window !== 'undefined') {
        this.hasScrolled = window.scrollY > 50;
      }
    },

    /**
     * Fetches travel categories from the API
     * Handles error cases gracefully
     */
    async fetchCategories() {
      try {
        const response = await fetch('http://wander-lust.test/api/categories');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const categoriesData = await response.json();
        
        // Check if we received valid data
        if (categoriesData && Array.isArray(categoriesData)) {
          // Filter out only parent categories (where parent_id is null) if needed
          this.categories = categoriesData.filter(category => category.parent_id === null);
          console.log('Categories loaded:', this.categories.length);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        // Initialize with empty array when API fails - no fallbacks needed
        this.categories = [];
      }
    }
  },
  async mounted() {
    // Fetch categories when component mounts
    await this.fetchCategories();

    // Set up event listeners for scroll and escape key
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll);

      // Allow closing mobile menu with Escape key for accessibility
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.isOpen = false;
        }
      });
    }
  },
  beforeUnmount() {
    // Clean up event listeners
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
});
</script>

<style>
/* Base styles and reset */
:root {
  --primary-color: #ff5e14;
  --primary-hover: #4338ca;
  --text-color: #1f2937;
  --text-muted: #6b7280;
  --bg-color: #ffffff;
  --bg-accent: #f9fafb;
  --border-color: #e5e7eb;
  --nav-height: 80px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --transition: all 0.3s ease;
  --border-radius: 8px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text-color);
  background-color: var(--bg-color);
  transition: var(--transition);
}

/* Navbar styles */
.navbar {
  position: fixed;
  width: 100%;
  z-index: 50;
  padding: 0 24px;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  transition: var(--transition);
  top: 0;
}

.navbar.scrolled {
  box-shadow: var(--shadow-sm);
  height: 70px;
  background-color: var(--bg-color);
  backdrop-filter: blur(10px);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}

/* Logo styles */
.logo-widget {
  position: relative;
}

.logo-container {
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.default-logo {
  margin-top: 15px;
  font-weight: 700;
  font-size: 1.5rem;
  background: linear-gradient(to right, var(--primary-color), #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.default-logo img {
  max-height: 40px;
  width: auto;
  vertical-align: middle;
}

/* Desktop menu */
.desktop-menu {
  display: none;
}

@media (min-width: 768px) {
  .desktop-menu {
    display: flex;
    align-items: center;
  }
}

.nav-links {
  display: flex;
  list-style: none;
  margin-right: 16px;
}

.nav-item {
  position: relative;
}

/* Nav link with animated indicator */
.nav-link {
  position: relative;
  display: inline-block;
  padding: 8px 16px;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: var(--transition);
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link.active {
  color: var(--primary-color);
}

/* Dropdown styles */
.nav-link.with-dropdown {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dropdown-icon {
  transition: var(--transition);
}

.dropdown-icon.rotate {
  transform: rotate(180deg);
}

.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.2s ease;
  z-index: 40;
  overflow: hidden;
}

.dropdown-container:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-content {
  padding: 8px 0;
}

.dropdown-item {
  display: block;
  padding: 10px 16px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.9rem;
  transition: var(--transition);
}

.dropdown-item:hover {
  background-color: var(--bg-accent);
  color: var(--primary-color);
}

/* New animated indicator */
.nav-indicator {
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 4px;
  /* Animation on entry */
  animation: indicator-enter 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

@keyframes indicator-enter {
  0% {
    transform: translateX(-50%) scaleX(0);
    opacity: 0;
  }
  100% {
    transform: translateX(-50%) scaleX(1);
    opacity: 1;
  }
}

/* Mobile menu toggle */
.mobile-toggle {
  z-index: 60;
}

@media (min-width: 768px) {
  .mobile-toggle {
    display: none;
  }
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--text-color);
  transition: var(--transition);
  border-radius: 4px;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Mobile menu */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: var(--bg-color);
  z-index: 40;
  box-shadow: var(--shadow-md);
  overflow-y: auto;
}

.mobile-menu-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 100px 32px 32px;
  height: 100%;
}

.mobile-nav-items {
  display: flex;
  flex-direction: column;
}

.mobile-nav-link {
  position: relative;
  font-size: 1.25rem;
  color: var(--text-color);
  text-decoration: none;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);
  font-weight: 500;
  transition: var(--transition);
}

.mobile-nav-link.with-dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.mobile-dropdown-content {
  padding-left: 16px;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
}

.mobile-dropdown-item {
  color: var(--text-muted);
  text-decoration: none;
  padding: 12px 0;
  font-size: 1.1rem;
  border-bottom: 1px solid var(--border-color);
  transition: var(--transition);
}

.mobile-dropdown-item:last-child {
  border-bottom: none;
  padding-bottom: 16px;
}

.mobile-dropdown-item:hover {
  color: var(--primary-color);
}

.mobile-nav-link:last-child {
  border-bottom: none;
}

.mobile-nav-link.active {
  color: var(--primary-color);
}

.mobile-nav-link:hover {
  color: var(--primary-color);
}

.mobile-menu-footer {
  margin-top: 32px;
}

.social-links {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: var(--bg-accent);
  color: var(--text-color);
  transition: var(--transition);
}

.social-link:hover {
  background-color: var(--primary-color);
  color: white;
}

.social-icon {
  width: 20px;
  height: 20px;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
  backdrop-filter: blur(2px);
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>