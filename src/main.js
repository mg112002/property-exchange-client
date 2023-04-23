import '@/init'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDumbbell, faSquareParking, faDroplet, faBolt, faDice, faPersonSwimming, faChildren, faElevator } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { StripeCheckout } from '@vue-stripe/vue-stripe';

Vue.use(StripeCheckout, {
  pk: 'pk_test_51MygxuSCuSinckWQMAw9Ig81En7GCnRHQnvB8HuXLUfujlne3pTtX2UvcxRY7iWQKu4A5eTOJOLzmXQQyj6wLR4k00JHmgAyNM',
});
// key: 'pk_test_51MygxuSCuSinckWQMAw9Ig81En7GCnRHQnvB8HuXLUfujlne3pTtX2UvcxRY7iWQKu4A5eTOJOLzmXQQyj6wLR4k00JHmgAyNM',

library.add(faDumbbell, faSquareParking, faDroplet, faBolt, faDice, faPersonSwimming, faChildren, faElevator, faInstagram, faFacebook, faTwitter)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
