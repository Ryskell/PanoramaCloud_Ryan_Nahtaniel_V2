<template>
  <div class="container mt-5">
    <button class="btn btn-secondary mb-3" @click="goBack">
      <i class="fas fa-arrow-left"></i> Retour
    </button>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>
    <div v-else-if="article">
      <h1 class="text-center mb-4 card-title">{{ article.title }}</h1>
      <div class="card mb-4">
        <img v-if="article.imageUrl" :src="article.imageUrl" alt="Image de l'article"
          class="card-img-top article-image" />
        <div class="card-body">
          <p class="card-text" style="font-size: 30px;">{{ article.description }}</p>
          <p class="mt-3"><strong>Auteur:</strong> {{ article.author.name }}</p>
          <div>
            <h3>Commentaires:</h3>
            <div v-for="comment in article.comments" :key="comment.id" class="mb-2">
              <div class="card">
                <div class="card-body">
                  <p class="card-text">{{ comment.content }} - <strong>{{ comment.author.name }}</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <h3>
              <p><i style="color: red;margin-right: 5px" class="fas fa-heart"></i>{{ article.likes.length }}</p>
            </h3>
            <button v-if="isLoggedIn" @click="likeArticle" class="btn btn-primary">
              <i class="fa-regular fa-heart"></i> J'aime
            </button>
          </div>
          <div v-if="isLoggedIn" class="mt-4">
            <h3>Ajouter un commentaire:</h3>
            <form @submit.prevent="addComment">
              <div class="mb-3">
                <textarea v-model="newComment" class="form-control" rows="3" required></textarea>
              </div>
              <button type="submit" class="btn btn-success">Ajouter</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center">Article non trouvé.</p>
    </div>
    <div v-if="alertMessage" :class="['alert', alertClass]" role="alert" style="margin-top: 20px;">
      {{ alertMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, computed } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { GetArticleQuery, CreateCommentMutation, LikeArticleMutation } from '../graphql/types';
import { GET_ARTICLE } from '../graphql/queries';
import { CREATE_COMMENT, LIKE_ARTICLE } from '../graphql/mutations';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const { loading, result, refetch } = useQuery<GetArticleQuery>(GET_ARTICLE, { id: props.id });
    const article = ref<GetArticleQuery['article'] | null>(null);
    const newComment = ref('');
    const alertMessage = ref('');
    const alertClass = ref('');
    const isLoggedIn = computed(() => !!localStorage.getItem('token'));

    watchEffect(() => {
      if (result.value) {
        article.value = result.value.article;
      }
    });

    const { mutate: createCommentMutation } = useMutation<CreateCommentMutation>(CREATE_COMMENT);
    const { mutate: likeArticleMutation } = useMutation<LikeArticleMutation>(LIKE_ARTICLE);

    const addComment = async () => {
      if (newComment.value.length > 100) {
        alertMessage.value = 'Le commentaire ne doit pas dépasser 100 caractères.';
        alertClass.value = 'alert-danger';
        return;
      }

      try {
        const response = await createCommentMutation({
          articleId: props.id,
          content: newComment.value,
        });

        if (response && response.data && response.data.createComment) {
          if (!article.value) {
            throw new Error('Article is not loaded');
          }
          if (!Array.isArray(article.value.comments)) {
            article.value.comments = [];
          }
          const newCommentData = response.data.createComment;
          article.value = {
            ...article.value,
            comments: [...article.value.comments, newCommentData]
          };
          newComment.value = '';
          alertMessage.value = 'Commentaire ajouté!';
          alertClass.value = 'alert-success';
        }
      } catch (error) {
        alertMessage.value = 'Erreur lors de l\'ajout du commentaire.';
        alertClass.value = 'alert-danger';
        console.error('Erreur lors de l\'ajout du commentaire:', error);
      }
    };

    const likeArticle = async () => {
      try {
        const response = await likeArticleMutation({
          articleId: props.id,
        });

        if (response && response.data && response.data.likeArticle) {
          if (!article.value) {
            throw new Error('Article is not loaded');
          }
          if (!Array.isArray(article.value.likes)) {
            article.value.likes = [];
          }

          const newLikeData = response.data.likeArticle;
          article.value = {
            ...article.value,
            likes: [...article.value.likes, newLikeData]
          };
          alertMessage.value = 'Like posé!';
          alertClass.value = 'alert-success';
          console.log("Like added:", newLikeData);
        }
      } catch (error) {
        alertMessage.value = 'Erreur lors de l\'ajout du like. Vous avez déjà like ce post 🤔';
        alertClass.value = 'alert-danger';
        console.error('Erreur lors de l\'ajout du like:', error);
      }
    };

    const goBack = () => {
      router.push('/');
    };

    return {
      loading,
      article,
      newComment,
      addComment,
      likeArticle,
      refetch,
      isLoggedIn,
      goBack,
      alertMessage,
      alertClass,
    };
  },
});
</script>

<style scoped>
.article-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 2rem;
  font-weight: bold;
}

.list-group-item {
  background-color: #f8f9fa;
}

.btn-primary,
.btn-success {
  display: inline-flex;
  align-items: center;
}

.btn-primary i,
.btn-success i {
  margin-right: 5px;
}

.alert {
  margin-top: 20px;
  text-align: center;
}
</style>
