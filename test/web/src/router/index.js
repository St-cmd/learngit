import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import login from '@/views/login.vue'
import register from '@/views/register.vue'
import Me from '../views/view/Me.vue'
import Exercise from '../views/view/Exercise.vue'
import ChoiceQuestion from '../views/view/ChoiceQuestion.vue'
import JudgedQuestion from '../views/view/JudgedQuestion.vue'
import MultiplechoiceQuestion from '../views/view/MultiplechoiceQuestion.vue'
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
    path: '/ChoiceQuestion',
    name: 'ChoiceQuestion',
    component: ChoiceQuestion
  },
  {
    path: '/ChoiceQuestion/:id',
    name: 'ChoiceQuestion',
    component: ChoiceQuestion,
    props: true
  },
  {
    // 错题
    path: '/ChoiceQuestion/:wid',
    name: 'ChoiceQuestion',
    component: ChoiceQuestion,
    props: true
  },
  {
    // 错题
    path: '/ChoiceQuestion/:item',
    name: 'ChoiceQuestion',
    component: ChoiceQuestion,
    props: true
  },
  {
    path: '/JudgedQuestion',
    name: 'JudgedQuestion',
    component: JudgedQuestion
  },
  {
    path: '/JudgedQuestion/:id',
    name: 'JudgedQuestion',
    component: JudgedQuestion,
    props: true
  },
  {
    // 错题
    path: '/JudgedQuestion/:wid',
    name: 'JudgedQuestion',
    component: JudgedQuestion,
    props: true
  },
  {
    // 错题
    path: '/JudgedQuestion/:item',
    name: 'JudgedQuestion',
    component: JudgedQuestion,
    props: true
  },
  {
    path: '/MultiplechoiceQuestion',
    name: 'MultiplechoiceQuestion',
    component: MultiplechoiceQuestion
  },
  {
    path: '/MultiplechoiceQuestion/:id',
    name: 'MultiplechoiceQuestion',
    component: MultiplechoiceQuestion,
    props: true
  },
  {
    // 错题
    path: '/MultiplechoiceQuestion/:wid',
    name: 'MultiplechoiceQuestion',
    component: MultiplechoiceQuestion,
    props: true
  },
  {
    // 错题
    path: '/MultiplechoiceQuestion/:item',
    name: 'MultiplechoiceQuestion',
    component: MultiplechoiceQuestion,
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
