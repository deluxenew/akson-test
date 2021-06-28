<template>
   <aside class="sidebar">
      <products-filter-price
         :minPrice="minPrice"
         :maxPrice="maxPrice"
         @changeStartPrice="$emit('changeStartPrice', $event)"
         @changeEndPrice="$emit('changeEndPrice', $event)"
      />
      <products-filter-brand
         :brands="brands"
         @changeItems="$emit('changeFilterBrand', $event)"
      />
   </aside>
</template>

<script>
    import ProductsFilterPrice from "@/components/filtres/ProductsFilterPrice";
    import ProductsFilterBrand from "@/components/filtres/ProductsFilterBrand";

    export default {
        name: "SidebarComponent",
        components: {ProductsFilterBrand, ProductsFilterPrice},
        props: {
            section: {
                type: Object,
                default: () => {
                },
            },
            minPrice: {
                type: Number,
                default: 0,
            },
            maxPrice: {
                type: Number,
                default: 0,
            },
            brands: {
                type: Array,
                default: () => [],
            }
        },
        watch: {
            filterPrice(val) {
                this.$emit('changeFilter', val)
            }
        },
        data() {
            return {
                filterPrice: {startPrice: 0, endPrice: 0, brands: []},
            }
        },
        computed: {
            sectionCode() {
                return this.$route.params.sectionCode
            },
        },
        methods: {
            changeFilterBrand(val) {
                this.filterPrice.brands = val
            },
            changeFilterPrice(val) {
                this.filterPrice.startPrice = val.startPrice
                this.filterPrice.endPrice = val.endPrice
            },
        },
    }
</script>

<style lang="scss">
   .sidebar {
      width: 250px;
      padding: 20px 20px 0;
      border-right: 1px solid $primary;
   }
</style>
