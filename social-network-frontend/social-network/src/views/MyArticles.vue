<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Mes Articles</h1>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>
    <div v-else>
      <div v-if="articles.length === 0" class="alert alert-info text-center">
        Vous n'avez pas encore créé d'articles.
      </div>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" v-else>
        <div v-for="article in articles" :key="article.id" class="col">
          <div class="card h-100">
            <router-link :to="`/article/${article.id}`">
              <img v-if="article.imageUrl" :src="article.imageUrl" alt="Image de l'article" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">{{ article.title }}</h5>
                <p class="card-text">{{ article.description }}</p>
              </div>
            </router-link>
            <div class="card-footer">
              <button @click="deleteArticle(article.id)" class="btn btn-danger w-100">
                <i class="fas fa-trash-alt"></i> Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_MY_ARTICLES } from '../graphql/queries';
import { DELETE_ARTICLE } from '../graphql/mutations';
import { GetMyArticlesQuery, DeleteArticleMutation, DeleteArticleMutationVariables } from '../graphql/types';

export default defineComponent({
  setup() {
    const { loading, result, refetch } = useQuery<GetMyArticlesQuery>(GET_MY_ARTICLES);
    const articles = ref<GetMyArticlesQuery['myArticles']>([]);

    watchEffect(() => {
      if (result.value) {
        articles.value = result.value.myArticles;
      }
    });

    const { mutate: deleteArticleMutation } = useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DELETE_ARTICLE);

    const deleteArticle = async (id: string) => {
      try {
        await deleteArticleMutation({ id });
        refetch();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'article:', error);
      }
    };

    return {
      loading,
      articles,
      deleteArticle,
      refetch,
    };
  },
});
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-img-top {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
}

.card-footer {
  padding: 0.75rem 1.25rem;
}

.btn-danger {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-danger i {
  margin-right: 0.5rem;
}
</style>
