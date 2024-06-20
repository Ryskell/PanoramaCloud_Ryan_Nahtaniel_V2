<template>
  <div class="container mt-4">
    <form @submit.prevent="createArticle">
      <div class="mb-3">
        <label for="title" class="form-label">Titre :</label>
        <input type="text" class="form-control" v-model="title" required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description :</label>
        <textarea class="form-control" v-model="description" rows="3" required></textarea>
      </div>
      <div class="mb-3">
        <label for="imageUrl" class="form-label">URL de l'image :</label>
        <input type="text" class="form-control" v-model="imageUrl" />
      </div>

      <button type="submit" class="btn btn-primary" style="margin-left: 40%;">
        <i class="fas fa-check"></i> Post
      </button>
    </form>
    <div v-if="alertMessage" :class="['alert', alertClass]" role="alert" style="margin-top: 20px;">
      {{ alertMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { CREATE_ARTICLE } from '../graphql/mutations';

export default defineComponent({
  setup() {
    const title = ref('');
    const description = ref('');
    const imageUrl = ref('');
    const alertMessage = ref('');
    const alertClass = ref('');
    const { mutate: createArticleMutation } = useMutation(CREATE_ARTICLE);

    const createArticle = async () => {
      if (description.value.length > 100) {
        alertMessage.value = 'La description ne doit pas dépasser 100 caractères.';
        alertClass.value = 'alert-danger';
        return;
      }
      if (title.value.length > 25) {
        alertMessage.value = 'Le titre ne doit pas dépasser 25 caractères.';
        alertClass.value = 'alert-danger';
        return;
      }
      try {
        const response = await createArticleMutation({
          title: title.value,
          description: description.value,
          imageUrl: imageUrl.value,
        });
        if (response && response.data && response.data.createArticle) {
          alertMessage.value = 'Post Créé avec succès !';
          alertClass.value = 'alert-success';
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        }
      } catch (error) {
        alertMessage.value = `Erreur lors de la création de l'article: ${error}`;
        alertClass.value = 'alert-danger';
        console.error('Erreur lors de la création de l\'article:', error);
      }
    };

    return {
      title,
      description,
      imageUrl,
      createArticle,
      alertMessage,
      alertClass,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
