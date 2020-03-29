// import Vue from 'vue'
// import Card from './Card'
// import Child from './Child'
import Button from './Button'
import Checkbox from './Checkbox'
// import { HasError, AlertError, AlertSuccess } from 'vform'

// // Components that are registered globaly.
// [
//   Card,
//   Child,
//   Button,
//   Checkbox,
//   HasError,
//   AlertError,
//   AlertSuccess
// ].forEach(Component => {
//   Vue.component(Component.name, Component)
// })

import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import { HasError, AlertError, AlertSuccess } from 'vform'

[
  Button,
  Checkbox,
  HasError,
  AlertError,
  AlertSuccess
].forEach(Component => {
  Vue.component(Component.name, Component)
})

const requireComponent = require.context(
  '~/components', true, /\.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})
