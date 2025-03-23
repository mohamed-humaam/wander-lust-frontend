<template>
  <div class="layout">
    <!-- Navbar at the top -->
    <Navbar>
      <template #logo>
        <span class="logo">WanderLust</span>
      </template>
    </Navbar>

    <!-- Main content area -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footer at the bottom -->
    <footer class="page-footer">
      <div class="footer-content">
        <p class="copyright">&copy; {{ new Date().getFullYear() }} WanderLust. All Rights Reserved.</p>
        <ul class="footer-links">
          <li>
            <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/terms">Terms of Service</NuxtLink>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
/* Base layout */
.layout {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
}

.main-content {
  padding-top: 80px;
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
}

/* Logo styling */
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #12b488;
  text-decoration: none;
}

/* Footer styling */
.page-footer {
  background: #f8f8f8;
  padding: 15px;
  text-align: center;
  border-top: 1px solid #ddd;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.copyright {
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 15px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.footer-links li {
  display: inline-block;
}

.footer-links a {
  color: #12b488;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

/* Media query to match navbar.vue responsive breakpoint */
@media (min-width: 768px) {
  .main-content {
    padding-top: 100px;
  }

  .footer-content {
    flex-direction: row;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 0 20px;
  }
}
</style>