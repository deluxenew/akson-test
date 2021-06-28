<template>
   <div class="brand-filter">
      <div class="brand-filter__title">
         Бренд
      </div>

      <div class="brand-list">
         <div class="brand-item" v-for="(item, index) in brands" :key="index">
            <input class="checkbox" :value="item" v-model="selectItems" :id="'brand' + index" type="checkbox">
            <label :for="'brand' + index" class="label">{{item}}</label>
         </div>
      </div>
   </div>
</template>

<script>
    export default {
        name: "ProductsFilterBrand",
        props: {
            brands: {
                type: Array,
                default: () => [],
            },
            value: {
                type: Array,
                default: () => [],
            }
        },
        watch: {
            selectItems(val) {
                this.$emit('changeItems', val)
            }
        },
        data() {
            return {
                selectItems: [],
            }
        },
    }
</script>

<style lang="scss">
   .brand-filter {
      padding: 10px 0;

      &__title {
         font-weight: bold;
         padding-top: 10px;
      }

      .brand-list {
         padding: 10px 0;

         .brand-item + .brand-item {
            padding-top: 5px;

         }

         .brand-item {

            input {
               display: none;
            }

            input:checked + .label {
               color: $main-color;

               &::before {
                  opacity: 0;
                  transition: $trs;
               }

               &::after {
                  opacity: 1;
                  transition: $trs;
               }
            }

            .label {
               color: $primary;
               padding-left: 30px;
               cursor: pointer;
               position: relative;
               transition: $trs;

               &:before {
                  content: "";
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 18px;
                  height: 18px;
                  box-shadow: 0 6px 10px hsla(0, 0%, 74.5%, .1);
                  border-radius: 2px;
                  transition: opacity .3s ease;
                  border: 1px solid $primary;
                  opacity: 1;

               }

               &:after {
                  content: "";
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 18px;
                  height: 18px;
                  box-shadow: 0 6px 10px hsla(0, 0%, 74.5%, .1);
                  border-radius: 2px;
                  transition: opacity .3s ease;
                  border: 1px solid $accent-color;
                  background-image: url("data:image/svg+xml;utf8,<svg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13 9'><path fill='transparent' stroke='red' stroke-width='2' d='M1 4L5 7.5L11.5 1'></path></svg>");
                  background-repeat: no-repeat;
                  background-position: center;

                  opacity: 0;
               }
            }
         }
      }
   }
</style>
