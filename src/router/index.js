import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import edit from '@/components/edit/index'

Vue.use(Router)

export default new Router({
    routes: [
        // {
        //       path: '/',
        //       name: 'login',
        //       component: login
        //   },
        {
            path: '/',
            name: 'edit',
            component: edit
        },
    ]
})