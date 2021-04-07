import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Home from './views/Home.vue'
import Article from './views/Article.vue'
import Hero from './views/Hero.vue'
import Stratey from './views/Strategy'
import Saishi from './views/Saishi'

Vue.use(Router)

export default new Router({
  // linkActiveClass: '',
  // linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        { path: '/', name: 'home', component: Home },
        {
          path:'/stratey',
          name: 'stratey',
          component:Stratey
        },
        {
          path:'/saishi',
          name:'saishi',
          component:Saishi
        },
        { path: '/articles/:id', name: 'article', component: Article, props: true }
      ]
    },
    {path: '/heroes/:id', name: 'hero', component: Hero, props: true},
   
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
