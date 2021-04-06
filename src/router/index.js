import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/entry/:id',
    name: 'Entry',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "entry" */ '../views/Entry.vue'),
    beforeEnter: (to, from, next) => {
      const exists = JSON.parse(localStorage.entries).some(
        (entry) => to.params.id == entry.id,
      );
      if (exists) {
        next();
      } else {
        next({ name: 'notFound' });
      }
    },
  },
  {
    path: '/new-entry',
    name: 'NewEntry',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "new-entry" */ '../views/NewEntry.vue'),
  },
  {
    path: '/entry-success',
    name: 'Success',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "success" */ '../views/Success.vue'),
  },
  {
    path: '/404',
    alias: '*',
    name: 'notFound',
    component: NotFound,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
