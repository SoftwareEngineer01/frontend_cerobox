import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'

// Diseño para las tablas
import VueGoodTablePlugin from 'vue-good-table'

// Bootstrap-Vue
import BootstrapVue from 'bootstrap-vue'

Vue.component(FeatherIcon.name, FeatherIcon)

// Diseño para las tablas
Vue.use(VueGoodTablePlugin)

// Bootstrap-Vue
Vue.use(BootstrapVue)