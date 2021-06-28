<template>
   <router-link class="product" :to="`/p/${product.code}`">
      <div class="product__title">
         {{product.name}}
      </div>
      <div class="product__image" :style="`background-image: url(${product.imagePath})`">

      </div>
      <div class="product__price">
         Цена: {{product.price}} р.
      </div>
   </router-link>
</template>

<script>
    export default {
        name: "ProductCard",
        props: {
            product: {
                type: Object,
                default: () => {
                }
            }
        },
    }
</script>

<style lang="scss">
   .product {
      position: relative;
      display: flex;
      flex-direction: column;
      width: calc((100% - 40px) / 3);
      margin-bottom: 20px;
      color: $white !important;
      text-decoration: none;
      background-color: $white;
      transition: $trs;

      &:nth-child(3n-1) {
         margin-left: 20px;
         margin-right: 20px;
      }

      .product__title {
         padding: 20px;
         margin-top: auto;
         line-height: 22px;
         font-size: 16px;
         font-weight: bold;
         margin-bottom: 10px;
         color: $primary;
      }

      .product__image {
         padding-top: 300px;
         width: 100%;
         height: 0;
         background-size: cover;
         background-repeat: no-repeat;
      }

      .product__price {
         margin-top: auto;
         padding: 20px;
         color: $main-color;
      }

      &:hover {
         box-shadow: $shadowBlocks;
      }
   }
</style>
