import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'
import CreatePost from '../views/CreatePost.vue'
import BlogPreview from '../views/BlogPreview.vue'
import ViewBlog from '../views/ViewBlog.vue'
import EditBlog from '../views/EditBlog.vue'
import { auth, db } from "../firebase/firebaseConfig.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: "Home",
        requiresAuth: false,
      }
    },

    {
      path: '/blog',
      name: 'blog',
      component: Blog,
      meta: {
        title: "Blogs",
        requiresAuth: false,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: "Login",
        requiresAuth: false,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: "Register",
        requiresAuth: false,
      }
    },
    {
      path: '/forgot-password',
      name: 'forgotpassword',
      component: ForgotPassword,
      meta: {
        title: "Forgot Password",
        requiresAuth: false,
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        title: "Profile",
        requiresAuth: true,
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        title: "Admin",
        requiresAuth: true,
        requiresAdmin: true,
      }
    },
    {
      path: '/createpost',
      name: 'createpost',
      component: CreatePost,
      meta: {
        title: "Create Post",
        requiresAuth: true,
        requiresAdmin: true,
      }
    },
    {
      path: '/blogpreview',
      name: 'blogpreview',
      component: BlogPreview,
      meta: {
        title: "Preview Blog Post",
        requiresAuth: true,
        requiresAdmin: true,
      }
    },
    {
      path: '/viewblog/:blogid',
      name: 'viewblog',
      component: ViewBlog,
      meta: {
        title: "View Blog Post",
        requiresAuth: false,
      }
    },
    {
      path: '/editblog-:blogid',
      name: 'editblog',
      component: EditBlog,
      meta: {
        title: "Edit Blog Post",
        requiresAuth: true,
        requiresAdmin: true,
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`;
  next();
});


// Route guard to check authentication and admin privileges
router.beforeEach(async (to, from, next) => {
  const currentUser = auth.currentUser; // Get the current user
  if (to.matched.some(record => record.meta.requiresAuth)) { // Check if the route requires authentication
    if (!currentUser) {
      return next({ name: 'login' }); // Redirect to login if not authenticated
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin)) { // Check if the route requires admin privileges
        const token = await currentUser.getIdTokenResult(); // Get the ID token
        if (token.claims.admin) {
          return next(); // Continue if the user is an admin
        } else {
          return next({ name: 'home' }); // Redirect to home if not an admin
        }
      }
      return next(); // Continue if no admin privileges are required
    }
  } else {
    return next(); // Continue if no authentication is required
  }
});



export default router
