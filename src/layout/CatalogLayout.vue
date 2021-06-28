<template>
   <div class="wrapper">
      <header-component/>
      <transition name="layout" mode="out-in">
         <main-page-view
            v-if="!$route.params.productCode && !$route.params.sectionCode"
            :parentSections="parentSections"
         />
         <router-view v-else/>
      </transition>
      <footer-component/>
   </div>
</template>

<script>

    import MainPageView from "@/views/MainPageView";
    import HeaderComponent from "@/components/layout-components/HeaderComponent";
    import FooterComponent from "@/components/layout-components/FooterComponent";
    import {GET_SECTIONS} from "@/constants/getters-names";

    export default {
        name: 'Layout',
        components: {FooterComponent, HeaderComponent, MainPageView},
        data: () => ({}),
        computed: {
            parentSections() {
                return this.$store.getters[GET_SECTIONS]
            },
        },
        async mounted() {

        },
        methods: {},
    };
</script>

<style lang="scss">
   .wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 100vh;
      min-width: 100vw;
      background-color: $background;
   }
</style>
