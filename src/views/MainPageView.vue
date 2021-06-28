<template>
    <div class="main-page">
       <div class="section-list">
          <section-card
             v-for="section in parentSectionsFiltered"
             :section="section"
             :key="section.id"
          />
       </div>
    </div>
</template>

<script>
    import SectionCard from "@/components/content/SectionCard";
    export default {
        name: "MainPageView",
        components: {SectionCard},
        props: {
            parentSections: {
                type: Array,
                default: () => [],
            },
        },
        computed: {
            parentSectionsFiltered() {
                return this.parentSections.filter(el => el.parentCodes.length === 0)
            },
        },
    }
</script>

<style lang="scss">
   .main-page {
      padding: 20px;

      .section-list {
         width: 100%;
         display: flex;
         align-items: center;
         justify-content: flex-start;
         flex-wrap: wrap;
      }
   }
</style>
