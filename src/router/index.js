import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import NewInspection from '../pages/Inspeção.vue'
import MyInspections from '../pages/MinhasInspeções.vue'
import ScheduledInspections from '../pages/InspecoesAgendadas.vue'
import FinalizedInspections from '../pages/FinalizedInspections.vue'
import InspectionReport from '../pages/InspeçãoForms.vue'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
        name: 'Login'
    },
    {
        path: '/home',
        component: Home,
        name: 'Home'
    },
    {
        path: '/new-inspection',
        component: NewInspection,
        name: 'NewInspection'
    },
    {
        path: '/my-inspections',
        component: MyInspections,
        name: 'MyInspections'
    },
    {
        path: '/scheduled-inspections',
        component: ScheduledInspections,
        name: 'ScheduledInspections'
    },
    {
        path: '/finalized-inspections',
        component: FinalizedInspections,
        name: 'FinalizedInspections'
    },
    {
        path: '/inspection-report/:id',
        component: InspectionReport,
        name: 'InspectionReport'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router