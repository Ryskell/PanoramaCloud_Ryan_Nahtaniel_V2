<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h1 class="text-center mb-4">Inscription</h1>
            <form @submit.prevent="signup">
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" v-model="email" class="form-control form-control-lg" id="email" required />
              </div>
              <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input type="password" v-model="password" class="form-control form-control-lg" id="password" required />
              </div>
              <div class="form-group">
                <label for="name">Nom:</label>
                <input type="text" v-model="name" class="form-control form-control-lg" id="name" required />
              </div>
              <br>
              <button type="submit" class="btn btn-primary btn-lg w-100 mb-3">
                <i class="fas fa-user-plus"></i> S'inscrire
              </button>
            </form>
            <button @click="goToLogin" class="btn btn-secondary btn-lg w-100">
              <i class="fas fa-sign-in-alt"></i> Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { SIGNUP } from '../graphql/mutations';
import { SignupMutation, SignupMutationVariables } from '../graphql/types';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const email = ref<string>('');
    const password = ref<string>('');
    const name = ref<string>('');
    const router = useRouter();
    const { mutate: signupMutation } = useMutation<SignupMutation, SignupMutationVariables>(SIGNUP);

    const signup = async () => {
      try {
        const response = await signupMutation({
          email: email.value,
          password: password.value,
          name: name.value,
        });
        if (response && response.data) {
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
      }
    };

    const goToLogin = () => {
      router.push('/login');
    };

    return {
      email,
      password,
      name,
      signup,
      goToLogin,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 700px;
}

.card {
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 3rem;
}

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary i {
  margin-right: 0.5rem;
}

.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-secondary i {
  margin-right: 0.5rem;
}
</style>
