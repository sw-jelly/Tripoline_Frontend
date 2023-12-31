import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { MotionPlugin } from '@vueuse/motion'

import {
  DatePicker,
  RangePicker,
  Card,
  Timeline,
  PageHeader,
  Descriptions,
  Button,
  Select,
  Form,
  Checkbox,
  FloatButton,
  Input,
  List,
  Avatar
} from 'ant-design-vue'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(MotionPlugin)

app.use(DatePicker)
app.use(RangePicker)
app.use(Card)
app.use(Timeline)
app.use(PageHeader)
app.use(Descriptions)
app.use(Button)
app.use(Select)
app.use(Form)
app.use(Checkbox)
app.use(FloatButton)
app.use(Input)
app.use(List)
app.use(Avatar)

app.mount('#app')
