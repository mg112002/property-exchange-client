import Router from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import ListView from '@/components/ListView.vue'
import DetailedView from '@/components/DetailedView.vue'
import LoginPage from '@/components/Login.vue'
import RegisterPage from '@/components/Register.vue'
import StepperForm from '@/components/StepperForm.vue'
import PageNotFound from '@/components/PageNotFound.vue'
import store from '@/store'
import { setPremium, getPropertyById } from '@/services/propertyServices'
import { Message } from 'element-ui'

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'home',
            path: '/',
            component: HomePage
        },
        {
            name: 'success',
            path: '/success',
            beforeEnter: async (to, from, next) => {
                const id = store.getters.rera
                try {
                    const res = await setPremium(id)
                    if (res.status === 'success') {
                        Message({
                            type: 'success',
                            message: 'Property posted successfully as premium',
                            duration: 2500
                        })
                    }
                    next('/')
                } catch (error) {
                    Message({
                        type: 'warning',
                        message: 'Property posted without premium. Money will be refunded if deducted!',
                        duration: 3000
                    })
                    next('/')
                } finally {
                    next('/')
                }
            },
            redirect: '/'
        },
        {
            name: 'errorPage',
            path: '/errorPage',
            beforeEnter: (to, from, next) => {
                Message({
                    type: 'warning',
                    message: 'Property posted without premium',
                    duration: 2000
                })
                next('/')
            },
            redirect: '/'
        },
        {
            name: 'login',
            path: '/login',
            component: LoginPage
        },
        {
            name: 'register',
            path: '/register',
            component: RegisterPage
        },
        {
            name: 'post-property',
            path: '/postprop',
            component: StepperForm,
            beforeEnter: (to, from, next) => {
                if (!store.getters.isAuthenticated) {
                    Message({
                        type: 'warning',
                        message: 'Login to post a property!!',
                        duration: 2000
                    })
                    next('/login')
                } else {
                    next()
                }
            },
            props: true
        },
        {
            name: 'detailed-view',
            path: '/props/:id',
            props: true,
            beforeEnter: async (to, from, next) => {
                store.commit('setLoading')
                const { id } = to.params
                try {
                    const res = await getPropertyById(id)
                    const property = res.data
                    store.commit('setProperty', property)
                    next()
                } catch (err) {
                    window.location.reload()
                }
            },
            component: DetailedView,
        },
        {
            name: 'list-property',
            path: '/properties',
            props: true,
            beforeEnter: (to, from, next) => {
                const properties = store.getters.properties
                if (typeof properties === 'string') {
                    next('/')
                } else {
                    next()
                }
            },
            component: ListView
        },
        {
            name: 'not-found',
            path: '*',
            component: PageNotFound
        },
    ]
})

export default router