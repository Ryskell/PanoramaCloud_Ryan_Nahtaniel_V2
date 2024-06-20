<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Articles</h1>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div v-for="article in articles" :key="article.id" class="col-md-4 mb-4">
          <div class="card h-100">
            <router-link :to="`/article/${article.id}`" class="text-decoration-none text-dark">
              <img v-if="article.imageUrl" :src="article.imageUrl" alt="Image de l'article"
                class="card-img-top article-image" />
              <div class="card-body">
                <h5 class="card-title">{{ article.title }}</h5>
                <p class="card-text">{{ article.description }}</p>
                <p class="card-text"><i class="fas fa-heart"></i> {{ article.likes.length }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_ARTICLES } from '../graphql/queries';
import { GetArticlesQuery } from '../graphql/types';

export default defineComponent({
  setup() {
    const { loading, result, refetch } = useQuery<GetArticlesQuery>(GET_ARTICLES);
    const articles = ref<GetArticlesQuery['articles']>([]);

    watchEffect(() => {
      if (result.value) {
        articles.value = result.value.articles;
      }
    });

    onMounted(() => {
      refetch();
    });

    return {
      loading,
      articles,
      refetch,
    };
  },
});
</script>

<style scoped>
.article-image {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
}

.card {
  border: 1px solid #e3e3e3;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.02);
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  color: #555;
}
</style>
