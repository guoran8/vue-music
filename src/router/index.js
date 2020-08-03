import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: () => import('@/layout/index'),
            children: [
                {
                    path: "recommend",
                    component: () => import('@/views/recommend')
                },
                {
                    path: 'singer',
                    component: () => import('@/views/singer')
                }
            ]
        },
    ]
})