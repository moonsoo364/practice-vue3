import { createRouter, createWebHistory, type RouteRecordRaw, type RouteLocationNormalizedLoaded, onBeforeRouteLeave } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PizzasView from '@/views/PizzasView.vue'
import ContactView from '@/views/ContactView.vue'
import LoginView from '@/views/LoginView.vue'
import ContactFormView from '@/views/ContactFormView.vue'
import ContactFaqView from '@/views/ContactFaqView.vue'

const routes:RouteRecordRaw[] =[
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/pizzas',
    name: 'pizzas',
    component: PizzasView,
    props: (route: RouteLocationNormalizedLoaded) => ({
      searchTerm: route.query?.search || "",
    }),
    beforeEnter: async ( to, form, next) =>{
      to.params.searchTerm = (to.query.search || "") as string;
      console.log(to.params.searchTerm);
      
      next();
      // 쿼리 스트링 처리
      // if (to.params.searchTerm && to.query.search !== to.params.searchTerm) {
      //   next({
      //     path: to.path,
      //     query: { ...to.query, search: to.params.searchTerm },
      //     params: { ...to.params, searchTerm: undefined }
      //   });
      // } else {
      //   next();
      // }
    },
  },
  {
    path: "/contact",
    // name: "contact",
    // component: ContactView,
    children: [
      {
        path: "faq",
        name: "contact-faq",
        component: ContactFaqView,
      },
      {
        path: "form",
        name: "contact-form",
        component: ContactFormView,
      },
      {
        path: "",
        name: "contact",
        component: ContactView,
      }
    ],
  },
    {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]



export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL)
  ,routes
})
