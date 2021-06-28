import Vue from 'vue';
import Vuex from 'vuex';
import sections from './sections';
import products from './products';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
       sections,
       products,
    },
});
