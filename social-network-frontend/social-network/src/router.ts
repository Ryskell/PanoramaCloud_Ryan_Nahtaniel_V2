import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import LoginView from './views/LoginView.vue';
import SignupView from './views/SignupView.vue';
import ArticleView from './views/ArticleView.vue';
import CreateArticleView from './views/CreateArticleView.vue';
import ArticlesView from './views/ArticlesView.vue';
import MyArticles from './views/MyArticles.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignupView },
  { path: '/article/:id', component: ArticleView, props: true },
  { path: '/create-article', component: CreateArticleView },
  { path: '/articles', component: ArticlesView },
  { path: '/my-articles', component: MyArticles },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
