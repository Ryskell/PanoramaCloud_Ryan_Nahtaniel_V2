<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h1 class="text-center mb-4">Connexion</h1>
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" v-model="email" class="form-control form-control-lg" id="email" required />
              </div>
              <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input type="password" v-model="password" class="form-control form-control-lg" id="password" required />
              </div>
              <br>
              <button type="submit" class="btn btn-primary btn-lg w-100">
                <i class="fas fa-sign-in-alt"></i> Se connecter
              </button>
              <div class="mt-4 text-center text-sm"><span>Vous n'avez pas de compte?</span> <a class="underline"
                  href="/signup">Inscrivez-vous</a></div>
            </form>
            <div v-if="alertMessage" :class="['alert', alertClass]" role="alert" style="margin-top: 20px;">
              {{ alertMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { LOGIN } from '../graphql/mutations';

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const alertMessage = ref('');
    const alertClass = ref('');
    const { mutate: loginMutation } = useMutation(LOGIN);

    const login = async () => {
      try {
        const response = await loginMutation({
          email: email.value,
          password: password.value,
        });

        const token = response?.data?.login;
        if (token) {
          localStorage.setItem('token', token);
          window.location.href = '/';
        } else {
          alertMessage.value = "Nom d'utilisateur ou mot de passe incorrect ⛔";
          alertClass.value = 'alert-danger';
        }
      } catch (error) {
        alertMessage.value = "Nom d'utilisateur ou mot de passe incorrect ⛔";
        alertClass.value = 'alert-danger';
        console.error('Error logging in:', error);
      }
    };

    return {
      email,
      password,
      login,
      alertMessage,
      alertClass,
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

.alert {
  margin-top: 20px;
  text-align: center;
}
</style>
