import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import '@vuepic/vue-datepicker/dist/main.css';

library.add(faTrashCan)
createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
