import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import ProductsView from "../views/ProductsView.vue";
import EditProductView from "../views/EditProductView.vue";
import CategorysView from "../views/CategorysView.vue";
import BrandsView from "../views/BrandsView.vue";
import DiscountsView from "../views/DiscountsView.vue";
import RegisterView from "../views/RegisterView.vue";
import UsersView from "../views/UsersView.vue";
import SearchView from "../views/SearchView.vue";
import BrandSortView from "../views/BrandSortView.vue";
import DiscountSortView from "../views/DiscountSortView.vue";
import CategorysSortView from "../views/CategorysSortView.vue";
import NotFoundView from "../views/EditProductView.vue";
import EditCategoryView from "../views/EditCategoryView.vue";
import EditBrandView from "../views/EditBrandView.vue";
import EditDiscountView from "../views/EditDiscountView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // route for root / admin
      path: "/",
      name: "admin",
      component: AdminView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // route for login
      path: "/login",
      name: "login",
      component: LoginView,
      // check for token and direct to page if any or login of none
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      // route for register user
      path: "/register",
      name: "register",
      component: RegisterView,
      // check for token and direct to page if any or login of none
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      // route for showing products
      path: "/products",
      name: "products",
      component: ProductsView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // routes for editing product with product id
      path: "/editproduct/:id",
      name: "editproduct",
      component: EditProductView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // routes for showing categorys
      path: "/categorys",
      name: "categorys",
      component: CategorysView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // routes for editing category with category id
      path: "/editcategory/:id",
      name: "editcategory",
      component: EditCategoryView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // routes for showing brands
      path: "/brands",
      name: "brands",
      component: BrandsView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // routes for editing brand with brand id
      path: "/editbrand/:id",
      name: "editbrand",
      component: EditBrandView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // route for showing discounts
      path: "/discounts",
      name: "discounts",
      component: DiscountsView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // routes for editing discount with discount id
      path: "/editdiscount/:id",
      name: "editdiscount",
      component: EditDiscountView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // route for showing users
      path: "/users",
      name: "users",
      component: UsersView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // route for searching with searchword
      path: "/search/:str",
      name: "search",
      component: SearchView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // route for sorting on brands with brand id
      path: "/brand/sort/:id",
      name: "brandsort",
      component: BrandSortView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // route for sorting on discounts with discount id
      path: "/discount/sort/:id",
      name: "discountsort",
      component: DiscountSortView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // route for sorting on categorys with category id
      path: "/categorys/sort/:id",
      name: "categorysort",
      component: CategorysSortView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      // route for 404 not found
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login0");
        }
      },
    },
  ],
});

export default router;
