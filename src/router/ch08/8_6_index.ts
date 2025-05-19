import { createRouter, createWebHistory, type RouteRecordRaw, type RouteLocationNormalizedLoaded, onBeforeRouteLeave } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PizzasView from '@/views/PizzaView.vue'
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
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
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
      // {
      //   path: "",
      //   name: "contact",
      //   component: ContactView,
      // }
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
