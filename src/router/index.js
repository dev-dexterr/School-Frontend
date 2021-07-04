import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import Lecture from '../components/Lecture.vue'
import Room from '../components/Room.vue'
import Student from '../components/Student.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/room',
        name: 'Room',
        component: Room
    },
    {
        path: '/lecture',
        name: 'lecture',
        component: Lecture
    },
    {
        path: '/student',
        name: Student,
        component: Student
    }
]

const router = new VueRouter({
    routes
})

export default router