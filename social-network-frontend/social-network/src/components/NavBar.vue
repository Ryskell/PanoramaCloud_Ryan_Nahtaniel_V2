<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">InstaQL</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Accueil</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link class="nav-link" to="/login">Connexion</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link class="nav-link" to="/my-articles">Mes Articles</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <button class="nav-link btn btn-link" @click="logout">Déconnexion</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
// import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    // const router = useRouter();

    const isLoggedIn = computed(() => {
      return !!localStorage.getItem('token');
    });

    const logout = () => {
      localStorage.removeItem('token');
      window.location.href = '/'; // Refresh the page to ensure the state is updated
    };

    return {
      isLoggedIn,
      logout,
    };
  },
});
</script>

<style scoped>
.navbar {
  margin-bottom: 1rem;
}

.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  font-size: 1.1rem;
}

.btn-link {
  color: white;
}

.btn-link:hover {
  text-decoration: underline;
  color: #ccc;
}
</style>
