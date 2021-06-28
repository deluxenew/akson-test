<template>

   <div class="sections">
      <transition name="expand" mode="out-in">
      <sidebar-component
         v-if="section && section.isLast"
         :minPrice="filterParams ? filterParams.minPrice : 0"
         :maxPrice="filterParams ? filterParams.maxPrice : 0"
         :brands="filterParams ? filterParams.brands : []"
         @changeStartPrice="startPrice = $event"
         @changeEndPrice="endPrice = $event"
         @changeFilterBrand="filterBrand = $event"
      />
      </transition>
      <div class="section__content" ref="products">
         <sections-breadcrumbs
            :sectionCode="sectionCode"
            :sectionsList="sectionsList"
         />

         <transition-group tag="div" name="section" class="section-list">
            <section-card
               v-for="section in childrenSections"
               :section="section"
               :key="section.id"
            />
         </transition-group>


         <transition-group tag="div" name="fade" class="product-list">
            <product-card
               v-for="product in productsPerPage"
               :product="product"
               :key="product.id"
            />
            </transition-group>
      </div>
   </div>
</template>

<script>
    import SidebarComponent from "@/components/layout-components/SidebarComponent";
    import {
        GET_CHILDREN_SECTIONS_BY_CODE,
        GET_FILTER_PARAM_BY_CODE,
        GET_SECTION_BY_CODE, GET_SECTIONS
    } from "@/constants/getters-names";
    import SectionCard from "@/components/content/SectionCard";
    import SectionsBreadcrumbs from "@/components/navigations/SectionsBreadcrumbs";
    import ProductCard from "@/components/content/ProductCard";
    import {GET_PRODUCTS} from "@/constants/getters-names";
    import {FETCH_PRODUCTS_ACTION} from "@/constants/actions-names";

    export default {
        name: "SectionsView",
        components: {ProductCard, SectionsBreadcrumbs, SectionCard, SidebarComponent},
        data() {
            return {
                page: 2,
                startPrice: 0,
                endPrice: 0,
                filterBrand: [],
                productsListHeight: 0,
                productsListOffset: 0,
                scroll: 0,
                screenHeight: 0,
            }
        },
        watch: {
            async sectionCode() {
                await this.getProductsBySectionCode()
            },
            async section(val) {
                if (val && val.isLast) {
                    await this.getProductsBySectionCode()
                }
            },
            scroll(val) {
                if (this.productsListOffset + this.productsListHeight - this.screenHeight <= val && this.page < this.maxPage) {
                    this.page++
                }
            },
            startPrice() {
                this.page = 1
            },
            endPrice() {
                this.page = 1
            },
            filterBrand() {
                this.page = 1
            }
        },
        computed: {
            sectionsList() {
                return this.$store.getters[GET_SECTIONS]
            },
            maxPage() {
                return this.productsFiltered.length / 5 + (this.productsFiltered.length % 5 ? 1 : 0)
            },
            sectionCode() {
                return this.$route.params.sectionCode
            },
            section() {
                return this.$store.getters[GET_SECTION_BY_CODE](this.sectionCode)
            },
            childrenSections() {
                return this.$store.getters[GET_CHILDREN_SECTIONS_BY_CODE](this.sectionCode)
            },
            filterParams() {
                return this.$store.getters[GET_FILTER_PARAM_BY_CODE](this.sectionCode)
            },
            products() {
                return this.$store.getters[GET_PRODUCTS](this.sectionCode)
            },
            productsFiltered() {
                return this.products ? this.products.filter(el =>
                    this.endPrice >= el.price
                    && this.startPrice <= el.price
                    && (this.filterBrand.length === 0 || this.filterBrand.includes(el.brand)))
                    : []
            },
            productsPerPage() {
                return this.productsFiltered.filter((el, index) => index < this.page * 5)
            },
        },
        methods: {
            setFilterPrice(val) {
                this.startPrice = val.minPrice
                this.endPrice = val.maxPrice
                this.filterBrand = val.brands
                this.page = 1
            },
            async getProductsBySectionCode() {
                if (this.section && this.section.isLast) {
                    await this.$store.dispatch(FETCH_PRODUCTS_ACTION, {code: this.sectionCode})
                    this.setFilterPrice(this.filterParams)
                }
            },
            setProductsListHeight() {
                this.productsListHeight = this.$refs.products.clientHeight
            },
            scrolling() {
                this.scroll = window.pageYOffset
                this.productsListHeight = this.$refs.products.clientHeight
            },
        },
        async mounted() {
            await this.getProductsBySectionCode()
            this.productsListHeight = this.$refs.products.clientHeight
            this.productsListOffset = this.$refs.products.offsetTop
            this.screenHeight = window.innerHeight
            window.addEventListener('scroll', this.scrolling)
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.scrolling)
        }
    }
</script>

<style lang="scss">
   .sections {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: $background;

      .section__content {
         width: 100%;
         max-width: 980px;
      }

      .section-list {
         padding: 0 20px;
         width: 100%;
         display: flex;
         align-items: center;
         justify-content: flex-start;
         flex-wrap: wrap;
      }

      .product-list {
         padding: 0 20px;
         width: 100%;
         display: flex;
         align-items: stretch;
         justify-content: flex-start;
         flex-wrap: wrap;
      }
   }
   .section-enter-active{
      animation: showSection 0.3s linear;
      transition: width 0.3s ease-in-out;
      overflow: hidden;
   }

   .section-leave-active {
      animation: showSection 0.3s linear reverse;
      transition: width 0.3s ease-in-out;
      overflow: hidden;
   }

   .section-enter {
      width: 300px;
   }

   .section-leave-to {
      width: 0;
   }

   @keyframes showSection {
      from {
         width: 0;
      }
      to {
         width: 33%;
      }
   }

   .expand-enter-active{
      animation: showTranslate 0.3s linear;
      transition: width 0.3s ease-in-out;
      overflow: hidden;
   }

   .expand-leave-active {
      animation: showTranslate 0.3s linear reverse;
      transition: width 0.3s ease-in-out;
      overflow: hidden;
   }

   .expand-enter {
      opacity: 1;
      width: 250px;
   }

   .expand-leave-to {
      opacity: 0;
      width: 0;
   }

   @keyframes showTranslate {
      from {
         width: 0;
         opacity: 0;
      }
      50% {
         width: 250px;
         opacity: 0;
      }
      to {
         width: 250px;
         opacity: 1;
      }
   }
</style>
