import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main.vue'
import Login from '../views/login/index.vue'
import Artists from '../views/artists/index.vue'
import Business from '../views/business/index.vue'

import Test from '../views/test.vue'


Vue.use(VueRouter)

const router = new VueRouter({
    mode : 'history',
    routes : [
        {
            path : '/login',
            component : Login
        },
        {
            path : '/',
            component : Main,
            children : [
                {
                    path : '/artists',
                    component : Artists
                },
                {
                    path : '/business',
                    component : Business
                }
            ]
        },
        {
            path : '/test',
            component : Test
        } 
        
    ]
})

export default router