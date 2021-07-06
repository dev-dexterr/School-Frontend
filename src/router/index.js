import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import Lecture from '../components/Lecture.vue'
import Room from '../components/Room.vue'
import Student from '../components/Student.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '',
        component: Login
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
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

router.beforeEach((to, from, next)=>{
    const publicPages = ['/login', '/register', 'dashboard', 'room', 'lecture', 'student'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if(authRequired && !loggedIn){
        next('/login');
    }else{
        next();
    }
})

export default router