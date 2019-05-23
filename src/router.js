import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

// Components:
import Home from '@/components/Home.vue';
import Settings from '@/components/Settings.vue';

// Render-All:
import AllUsers from '@/components/render-all/AllUsers.vue';
import AllProducts from '@/components/render-all/AllProducts.vue';
import AllClients from '@/components/render-all/AllClients.vue';

// Create-New:
import NewUserForm from '@/components/create-new/NewUserForm.vue';
import NewClientForm from '@/components/create-new/NewClientForm.vue';
import NewProductForm from '@/components/create-new/NewProductForm.vue';

// Render-Single :
import SingleUser from '@/components/render-single/SingleUser.vue';
import SingleProduct from '@/components/render-single/SingleProduct.vue';
import SingleClient from '@/components/render-single/SingleClient.vue';

// Auth Components:
import LogIn from '@/components/auth/LogIn.vue';
import SignUp from '@/components/auth/SignUp.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true,
      },
    },
    // Render-All:
    {
      path: '/users',
      name: 'AllUsers',
      component: AllUsers,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/products',
      name: 'AllProducts',
      component: AllProducts,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/clients',
      name: 'AllClients',
      component: AllClients,
      meta: {
        requiresAuth: true,
      },
    },
    // Create-New:
    {
      path: '/add-user',
      name: 'NewUserForm',
      component: NewUserForm,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/add-client',
      name: 'NewClientForm',
      component: NewClientForm,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/add-product',
      name: 'NewProductForm',
      component: NewProductForm,
      meta: {
        requiresAuth: true,
      },
    },
    // Render-Single :
    {
      path: '/user/:user_id',
      name: 'SingleUser',
      component: SingleUser,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/client/:client_id',
      name: 'SingleClient',
      component: SingleClient,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/product/:product_id',
      name: 'SingleProduct',
      component: SingleProduct,
      meta: {
        requiresAuth: true,
      },
    },
    // Auth :
    {
      path: '/log-in',
      name: 'LogIn',
      component: LogIn,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },
  ],
});

// router guards:

// router guards
router.beforeEach((to, from, next) => {
  // check to see if route has auth guard
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      // User is signed in. Proceed to route
      next();
    } else {
      // No user is signed in. Redirect to login
      next({
        name: 'LogIn',
      });
    }
  } else {
    // if route is not guarded by auth, proceed
    next();
  }
});

export default router;
