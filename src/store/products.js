const SERVER = process.env.VUE_APP_SERVER

export default {
   namespaced: true,
   state: {
      products: [],
   },
   getters: {
      GET_PRODUCTS: state => code => {
         const codeIdx = state.products.findIndex(el => el.code === code)
         if (codeIdx > -1) {
            return state.products[codeIdx].products;
         }
      },
      GET_FILTER_PARAM_BY_CODE: state => code => {
         const codeIdx = state.products.findIndex(el => el.code === code)
         if (codeIdx > -1) {
            const products = state.products[codeIdx].products
            const minPrice = Math.min(...products.map(el => el.price))
            const maxPrice = Math.max(...products.map(el => el.price))
            const brands = [...new Set(products.map(el => el.brand))]
            return {minPrice, maxPrice, brands}
         }
      }
   },
   mutations: {
      PRODUCTS_MUTATION(state, {products, code}) {
         const codeIdx = state.products.findIndex(el => el.code === code)
         if (codeIdx > -1) {
            state.products[codeIdx].products = products
         } else state.products.push({products, code})
      },
   },
   actions: {
      async FETCH_PRODUCTS_ACTION({commit}, {code}) {
         try {
            let response = await fetch(SERVER + `/${code}`);
            let dataFromFile = await response.json();

            commit('PRODUCTS_MUTATION', {code: code, products: dataFromFile});
         } catch (err) {
            console.log(err);
         }

      },
   },
};
