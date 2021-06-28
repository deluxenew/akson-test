<template>
   <div class="breadcrumbs">
      <div class="breadcrumbs__item" v-for="item in breadcrumbsItems" :key="item.id">
         <router-link :to="item.code ? '/c/' +item.code : '/'">
            {{item.name}}
         </router-link>
      </div>
   </div>
</template>

<script>
    export default {
        name: "SectionsBreadcrumbs",
        props: {
            sectionCode: {
                type: String,
                default: '',
            },
            sectionsList: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            breadcrumbsItems() {
                let result = []
                const vm = this
                const setItem = function(arr, code) {
                    const findItem = arr.find(el => el.code === code)
                    if (findItem) {
                        const findParent = arr.find(el => el.code === findItem.parentCode)
                        if (vm.sectionCode !== findItem.code) {
                            result.push(findItem)
                        }
                        if (findParent) {
                            setItem(arr, findParent.code)
                        }
                    }
                }

                setItem(this.sectionsList, this.sectionCode)
                result.push({code: '', name: 'Главная'})
                return result.filter(el => !el.isLast).reverse()
            }
        }
    }
</script>

<style lang="scss">
   .breadcrumbs {
      padding: 20px;

      display: flex;
   }
   .breadcrumbs__item {
      position: relative;
      padding-right: 20px;
      margin-right: 10px;
      a {
         color: $secondary!important;
         transition: $trs;
      }
      &:hover {
         a {
            color: $main-color!important;
         }
      }
      &:before {
         content: '>';
         position: absolute;
         top: 0;
         right: 0;
         color: $secondary
      }
      &:last-child {
         &:before {
            display: none;
         }
      }
   }
</style>
