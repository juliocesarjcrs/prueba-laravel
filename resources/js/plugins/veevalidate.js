import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'

import * as rules from 'vee-validate/dist/rules'
import es from 'vee-validate/dist/locale/es'
// Add a rule.

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

localize({
  es
})
// loop over all rules
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: es.messages[rule] // add its message
  })
}
