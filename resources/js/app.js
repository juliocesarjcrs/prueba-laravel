import Vue from 'vue'
import store from '~/store'
import router from '~/router'
import i18n from '~/plugins/i18n'
import '~/filters'
import App from '~/App.vue'

import '~/plugins'
import '~/components'

// mis importaciones:
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from "element-ui/lib/locale/lang/es";
import locale from "element-ui/lib/locale";
import VueNumeric from 'vue-numeric'

import $ from 'jquery'
// import axios from 'axios'
import pdf from 'vue-pdf'
import moment from 'moment';
require('moment/locale/es');
// locale.use(lang)
window.$ = window.jQuery = $
Vue.use(ElementUI, { locale: lang })
// Vue.use(ElementUI)
Vue.use(VueNumeric)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    i18n,
    store,
    router,
    ...App
})
