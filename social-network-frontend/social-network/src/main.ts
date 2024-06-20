import { createApp, provide, h } from 'vue';
import { ApolloClients } from '@vue/apollo-composable';
import App from './App.vue';
import router from './router';
import { BootstrapVue3 } from 'bootstrap-vue-3';
import client from './graphql/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: client,
    });
  },
  render: () => h(App),
});

app.use(router);
app.use(BootstrapVue3);
app.mount('#app');
