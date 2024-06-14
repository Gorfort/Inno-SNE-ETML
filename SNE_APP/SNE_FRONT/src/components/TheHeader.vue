<template>
  <div>
    <header>
      <div class="logo" @click="goToHome">
        <span>ESN</span>
      </div>
      <nav class="links">
        <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
        <RouterLink :to="{ name: 'add-post-view' }" class="nav-link">Post</RouterLink>
        <RouterLink :to="{ name: 'login' }" class="nav-link">Login</RouterLink>
        <RouterLink :to="{ name: 'profil' }" class="nav-link">Profil</RouterLink>
        <RouterLink :to="{ name: 'admin' }" class="nav-link">Admin</RouterLink>
      </nav>
    </header>
    <div class="content">
      <!-- Your main content here -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
  router.push({ name: 'home' });
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh; /* Ensure header spans the full viewport height */
  width: 6rem; /* Fixed width for the left-side navigation */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem;
  background-color: #3c009c;
  color: #fff;
  z-index: 1000;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer; /* Add cursor pointer to indicate clickable */
  margin-bottom: 1rem; /* Add margin to the bottom of the logo */
}

.links {
  display: flex;
  flex-direction: column;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.nav-link.router-link-exact-active {
  font-weight: bold;
}
</style>
