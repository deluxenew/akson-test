<template>
    <div class="products">
       Без контента.
    </div>
</template>

<script>

    export default {
        name: "ProductsView",
        data() {
            return {

            }
        },
        computed: {
            productCode() {
                return this.$route.params.productCode
            },
        },
    }
</script>

<style lang="scss">
   .products {
      padding: 20px;
   }
</style>
