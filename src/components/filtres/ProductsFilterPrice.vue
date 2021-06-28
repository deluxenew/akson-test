<template>
    <div class="filter">
       <div class="filter__title">
          Цена (руб)
       </div>
       <div class="filter__param">
          <span>от </span><input class="input" v-model.number="startPrice" :min="minPrice" :max="maxPrice" type="number" placeholder="от">
          <span> до </span><input class="input" v-model.number="endPrice" :min="minPrice" :max="maxPrice" type="number" placeholder="до">
       </div>
    </div>
</template>

<script>
    export default {
        name: "ProductsFilterPrice",
        props: {
            minPrice: {
                type: Number,
                default: 0,
            },
            maxPrice: {
                type: Number,
                default: 0,
            },
        },
        watch: {
            minPrice(val) {
                this.startPrice = val
            },
            maxPrice(val) {
                this.endPrice = val
            },
            startPrice(val) {
                this.$emit('changeStartPrice', val)
            },
            endPrice(val) {
                this.$emit('changeEndPrice', val)
            },
        },
        data() {
            return {
                startPrice: 0,
                endPrice: 0,
            }
        },
        computed:{

        },
        mounted() {
            this.startPrice = this.minPrice
            this.endPrice = this.maxPrice
        },
    }
</script>

<style lang="scss" >
   .filter {
      padding: 10px 0;
      border-bottom: 1px solid $secondary;

      &__param {
         padding: 10px 0;
         width: 100%;

         .input {
            max-width: 80px;
            height: 30px;
         }
      }

      &__title {
         font-weight: bold;
      }
   }

</style>
