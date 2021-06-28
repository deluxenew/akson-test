<template>
   <div id="app">
      <router-view/>
   </div>
</template>

<script>

    import {FETCH_SECTIONS_ACTION} from "@/constants/actions-names";
    import {GET_SECTIONS} from "@/constants/getters-names";

    export default {
        name: 'App',
        components: {},
        data() {
            return {}
        },
        computed: {
            sections() {
                return this.$store.getters[GET_SECTIONS]
            },
        },
        methods: {
            async getData() {
                await this.$store.dispatch(FETCH_SECTIONS_ACTION)
            },
        },
        async created() {
            await this.getData()
        }
    }
</script>

<style lang="scss">
   * {
      font-family: $font;
      box-sizing: border-box;
   }

   .fade-enter-active, .fade-leave-active {
      transition: all 3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
   }

   .fade-enter, .fade-leave-to {
      opacity: 0;
   }

   .layout-enter-active,
   .layout-leave-active {
      transition: opacity 0.3s ease-in-out;
   }

   .layout-enter,
   .layout-leave-to {
      opacity: 0;
   }
</style>
