import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
   {
      path: '/',
      name: 'HomePage',
      component: () => import('@/layout/CatalogLayout'),
      children: [
         {
            path: '/c/:sectionCode',
            component: () => import('@/views/SectionsView'),
            name: 'Sections',
         },
         {
            path: '/p/:productCode',
            component: () => import('@/views/ProductsView'),
            name: 'Products',
         },
      ]
   },
];

const router = new VueRouter({
   mode: 'history',
   routes,
});

export default router;
