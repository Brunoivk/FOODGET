import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import jwt from 'jsonwebtoken';

import store from '@/store'


Vue.use(VueRouter)

  const routes = [
  /* {
    path: '/',
    name: 'Home',
    component: Home
  }, */
  {
    path: '/',
    name: 'naslovnica',
    beforeEnter: shared,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/naslovnica.vue')
  },
  {
    path: '/recepti',
    name: 'recepti',
    beforeEnter: guard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/recepti.vue')
  },
  {
    path: '/recept/:id',
    name: 'receptPodaci',
    beforeEnter: shared,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/receptPodaci.vue')
  },
  {
    path: '/dodavanjerecepata',
    name: 'dodavanjerecepata',
    beforeEnter: guard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dodavanjerecepata.vue')
  },
  {
    path: '/forum',
    name: 'forum',
    beforeEnter: shared,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/forum.vue')
  },
  {
    path: '/mojeobjave',
    name: 'mojeObjave',
    beforeEnter: guard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/mojeObjave.vue')
  },
  {
    path: '/forum/objava/:id',
    name: 'objavaPodaci',
    beforeEnter: shared,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/objava.vue')
  },
  {
    path: '/onama',
    name: 'onama',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/onama.vue')
  },
  {
    path: '/prijava',
    name: 'prijava',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/prijava.vue')
  },
  
  {
    path: '/registriranje',
    name: 'registriranje',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/registriranje.vue')
  },
  {
    path: '/prijavljivanje',
    name: 'prijavljivanje',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/prijavljivanje.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    beforeEnter: guard,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/profil.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


function guard(to, from, next)
{
    store.token = localStorage.getItem('token')
    console.log(store.token);
    if(store.token === null || store.token === undefined) next('/')  
  	let decoded = jwt.verify(store.token, 'foodnjam')
    if(decoded){
      store.user = decoded._id
        next()
    }else {
        localStorage.clear()
        next('/');
    }  
}

async function shared(to, from, next){
  store.token = localStorage.getItem('token')

    if(store.token === null || store.token === undefined){
      console.log("ako je null");
      next()
    }else{
      console.log("ako nije null");
      next()
      let decoded = await jwt.verify(store.token, 'foodnjam')
      if(decoded){
        store.user = decoded._id
          next()
      }else {
          next();
      }  
    }
}

export default router
