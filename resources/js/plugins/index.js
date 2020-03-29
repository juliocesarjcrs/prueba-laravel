import './axios'
import './fontawesome'
import 'bootstrap'

// mis import
import './veevalidate'
import Global from '~/mixins/Global'
import Vue from 'vue'
import VueNumeric from 'vue-numeric'
Vue.use(VueNumeric)
Vue.mixin(Global)
import VueCurrencyFilter from 'vue-currency-filter'
Vue.use(VueCurrencyFilter, {
    symbol : '$',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
})

import Helper  from '~/Funciones';
Vue.prototype.$Helper = Helper;
