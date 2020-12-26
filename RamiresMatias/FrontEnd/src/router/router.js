import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home.vue"
import Pessoa from "../components/Pessoa.vue"
import Animal from "../components/Animal.vue"
import Lote from "../components/Lote.vue"
import LoteAnimal from "../components/LoteAnimal.vue"



Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/pessoa', component: Pessoa },
    { path: '/animal', component: Animal },
    { path: '/lote', component: Lote },
    { path: '/alocarxanimal', component: LoteAnimal },



  ]
})

