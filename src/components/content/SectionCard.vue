<template>
   <router-link class="link" :to="`/c/${section.code}`">
      <div class="section-card" :style="`background-image: url(${section.imagePath})`">
         <div class="section__title">
            {{section.name}}
         </div>
      </div>
   </router-link>
</template>

<script>
    export default {
        name: "SectionCard",
        props: {
            section: {
                type: Object,
                default: () => {
                }
            }
        },
    }
</script>

<style lang="scss">
   .link {
      width: calc((100% - 40px) / 3);
      height: 200px;
      margin-bottom: 20px;
      color: $white !important;
      text-decoration: none;

      &:nth-child(3n-1) {
         margin-left: 20px;
         margin-right: 20px;
      }

      .section-card {
         display: flex;
         flex-direction: column;
         padding: 20px;
         width: 100%;
         height: 100%;
         background-size: cover;
      }

      .section__title {
         margin-top: auto;
         line-height: 22px;
         font-size: 20px;
         font-weight: bold;
         color: #fff;
      }

      .section__count {

      }
   }
</style>
