<template>
  <div class="flex flex-col min-h-screen" v-if="this.$store.state.postLoaded">
    <Navigation v-show="navigation" :isDark="false" :isLight="true"></Navigation>
    <RouterView />
    <Footercomp></Footercomp>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import Footercomp from './components/Footercomp.vue';
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import { auth } from "./firebase/firebaseConfig.js"; // Correct import path


export default {
  name: 'App',
  components: {
    Navigation,
    Footercomp,
  },
  data() {
    return {
      navigation: null,
    }
  },
  methods: {
    checkRoute() {
      if (this.$route.name === "login" || this.$route.name === "register" || this.$route.name === "forgotpassword") {
        this.navigation = false;
        return;
      }
      this.navigation = true;
    },
  },
  created() {
    this.checkRoute();
    this.$store.dispatch("getPost")

    // onAuthStateChanged listens for changes in the authentication state.
    // Use onAuthStateChanged to get the current user and current user details from the database and store it in state
    onAuthStateChanged(auth, async (user) => {
      // If a user is logged in (if (user)), it commits the user to the Vuex store using updateUser.
      // It then dispatches getCurrentUser to fetch the user's profile information from Firestore and update the state accordingly.
      if (user) {
        this.$store.commit("updateUser", user);
        this.$store.dispatch("getCurrentUser", user);
      }
    });
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
