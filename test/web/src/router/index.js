import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import login from '@/views/login.vue'
import register from '@/views/register.vue'
import Me from '../views/view/Me.vue'
import Exercise from '../views/view/Exercise.vue'
import Reprint from '../views/view/Reprint.vue'
import Wrong from '../views/view/Wrong.vue'
import Chapter from '../views/view/Chapter.vue'
import Recomand from '../views/view/same/Recomand.vue'
import print from '../views/view/print.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/user',
    name: 'Index',
    component: Index,
    meta: { allowBack: false },
    children: [
      {
        path: '',
        name: 'Exercise',
        component: Exercise
      },
      {
        path: 'Exercise',
        name: 'Exercise',
        component: Exercise
      },
      {
        path: 'Me',
        name: 'Me',
        component: Me
      }
    ]
  },
  {
    path: '/print',
    name: 'print',
    component: print
  },
  {
    path: '/Reprint',
    name: 'Reprint',
    component: Reprint
  },
  {
    path: '/Reprint/:id',
    name: 'Reprint',
    component: Reprint,
    props: true
  },
  {
    // 错题
    path: '/Reprint/:wid',
    name: 'Reprint',
    component: Reprint,
    props: true
  },
  {
    // 错题
    path: '/Reprint/:item',
    name: 'Reprint',
    component: Reprint,
    props: true
  },
  {
    path: '/Wrong',
    name: 'Wrong',
    component: Wrong
  },
  {
    path: '/Chapter',
    name: 'Chapter',
    component: Chapter
  },
  {
    path: '/Recomand/:id',
    name: 'Recomand',
    component: Recomand
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  }
]

const router = new VueRouter({
  routes
})

export default router
