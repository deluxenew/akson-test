export default {
   namespaced: true,
   state: {
      sections: [],
   },
   getters: {
      GET_SECTIONS(state) {
         return state.sections;
      },
      GET_SECTION_BY_CODE: state => code => {
         const section = state.sections.find(el => el.code === code)
         return section ? section : undefined
      },
      GET_CHILDREN_SECTIONS_BY_CODE: state => code => {
         const section = state.sections.find(el => el.code === code)
         if (section && section.children) {
            const result = section.children.reduce((acc, it) => {
               const item = state.sections.find(el => el.id === it)
               if (item) acc.push(item)
               return acc
            },[])
            return result
         }
      },
   },
   mutations: {
      SECTIONS_MUTATION(state, sections) {
         state.sections = sections;
      },
   },
   actions: {
      async FETCH_SECTIONS_ACTION({commit}) {
         try {
            let response = await fetch('http://localhost:3000/sections.json');
            let dataFromFile = await response.json();
            commit('SECTIONS_MUTATION', dataFromFile);
         } catch (err) {
            console.log(err);
         }

      },
   },
};
