<template>
    <nav
        :class="[isDark ? 'dark-text' : '', isLight ? 'relative w-[100%] h-fit flex justify-between py-[25px] px-[150px] font-qs' : '']">

        <!-- Content and styling for the Logo 'Fire Blogs' -->
        <div class="logo flex flex-col items-center text-black font-semibold text-[24px]">
            Fireblogs
        </div>

        <div class="flex gap-[40px]">
            <!-- Navigation link items "Home,Blog,Store,Contact" -->
            <ul v-show="!mobile" class="flex gap-[40px] items-center list-none text-[18px] text-black">

                <router-link
                    class="text-black py-[3px] border-solid border-transparent hover:font-bold hover:border-solid hover:border-transparent hover:border-b-[3.5px] hover:border-b-black"
                    to="/">
                    Home
                </router-link>

                <router-link
                    class="text-black py-[3px] border-solid border-transparent hover:font-bold hover:border-solid hover:border-transparent hover:border-b-[3.5px] hover:border-b-black"
                    :to="{ name: 'blog' }">
                    Blog
                </router-link>

                <router-link v-if="admin"
                    class="text-black py-[3px] border-solid border-transparent hover:font-bold hover:border-solid hover:border-transparent hover:border-b-[3.5px] hover:border-b-black"
                    to="createpost">
                    Create Post
                </router-link>

                <router-link v-if="!user"
                    class="text-black py-[3px] border-solid border-transparent hover:font-bold hover:border-solid hover:border-transparent hover:border-b-[3.5px] hover:border-b-black"
                    :to="{ name: 'login' }">
                    Login | Register
                </router-link>

            </ul>

            <div v-if="user" @click="toggleProfileMenu"
                class="profile font-qs relative cursor-pointer flex items-center justify-center w-[40px] h-[40px] rounded-full text-white bg-[#303030]"
                ref="profile">
                <span class="pointer-events-none">{{ this.$store.state.profileInitials }}</span>
                <div v-show="profileMenu" class="profile-menu absolute top-[60px] right-0 w-[250px] bg-[#303030]">
                    <div
                        class="info flex items-center p-[15px] border-solid border-transparent border-b-[1px] border-b-white">
                        <p
                            class="initials w-[40px] h-[40px] bg-white text-[#303030] flex items-center justify-center rounded-full">
                            {{ this.$store.state.profileInitials }}</p>
                        <div class="right flex-1 ml-[24px]">
                            <p class="text-[14px]">{{ this.$store.state.profileFirstName }} {{
                                this.$store.state.profileLastName }}</p>
                            <p class="text-[12px]">{{ this.$store.state.profileUserName }}</p>
                            <p class="text-[12px]">{{ this.$store.state.profileEmail }}</p>
                        </div>
                    </div>
                    <div class="options p-[15px]">
                        <div class="option no-underline text-white flex items-center mb-[12px]">
                            <router-link :to="{ name: 'profile' }"
                                class="option no-underline text-white flex items-center mb-[12px]">
                                <Icon icon="prime:user" width="18" height="18" style="color: white" />
                                <p class="text-[14px] ml-[12px]">Profile</p>
                            </router-link>
                        </div>
                        <div v-if="admin" class="option no-underline text-white flex items-center mb-[12px]">
                            <router-link :to="{ name: 'admin' }"
                                class="option no-underline text-white flex items-center mb-[12px]">
                                <Icon icon="mdi:administrator" width="18" height="18" style="color: white" />
                                <p class="text-[14px] ml-[12px]">Admin</p>
                            </router-link>
                        </div>
                        <div @click="signOut" class="option no-underline text-white flex items-center">
                            <Icon icon="uil:signout" width="18" height="18" style="color: white" />
                            <p class="text-[14px] ml-[12px]">Sign Out</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Hamburger menu icon. Becomes visible when the screen reduces to tablet/mobile size - When clicked, it toggles a side navigation panel that slides in from the left-->
        <div class="flex items-center absolute top-0 right-[25px] h-[100%]">
            <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{ 'icon-active': mobileNav }"></i>
        </div>


        <!-- Side navigation panel which appears when Hamburger menu is toggled -->
        <transition name="mobile-nav">
            <ul v-show="mobileNav"
                class="flex flex-col items-center justify-center z-40 fixed top-0 left-0 h-full w-1/3 bg-black bg-opacity-90 gap-[40px] list-none font-tw text-[18px] text-white font-medium">

                <router-link
                    class="text-white py-[3px] border-solid border-transparent hover:font-bold hover:border-solid hover:border-transparent hover:border-b-[3.5px] hover:border-b-white"
                    to="/">
                    Home
                </router-link>

                <router-link
                    class="text-white py-[3px] border-solid border-transparent hover:font-bold hover:border-solid hover:border-transparent hover:border-b-[3.5px] hover:border-b-white"
                    :to="{ name: 'blog' }">
                    Blog
                </router-link>

                <router-link v-if="admin"
                    class="text-white py-[3px] border-solid border-transparent hover:font-bold hover:border-solid hover:border-transparent hover:border-b-[3.5px] hover:border-b-white"
                    :to="{ name: 'createpost' }">
                    Create Post
                </router-link>

                <router-link v-if="!user"
                    class="text-white py-[3px] border-solid border-transparent hover:font-bold hover:border-solid hover:border-transparent hover:border-b-[3.5px] hover:border-b-white"
                    :to="{ name: 'login' }">
                    Login | Register
                </router-link>

            </ul>
        </transition>
    </nav>
</template>



<script>
import { Icon } from '@iconify/vue';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";

export default {
    name: 'Navigation',
    components: {
        Icon,
    },

    props: {
        isDark: null,
        isLight: null,
    },


    data() {
        return {
            mobile: null,
            mobileNav: null,
            windowWidth: null,
            profileMenu: null,
        }
    },


    created() {
        window.addEventListener("resize", this.ckeckScreen);
        this.ckeckScreen();
    },

    computed: {
        user() {
            return this.$store.state.user;
        },
        admin() {
            return this.$store.state.profileAdmin;
        },
    },

    methods: {
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav
        },

        ckeckScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 1023) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },

        toggleProfileMenu(e) {
            if (e.target === this.$refs.profile) {
                this.profileMenu = !this.profileMenu
            }
        },

        async signOut() {
            try {
                await signOut(auth);
                console.log("User signed out successfully");
                window.location.reload();
            } catch (error) {
                console.error("Error signing out: ", error);
            }
        }

    },

    watch: {
        $route() {
            this.profileMenu = false;
        }
    }
}
</script>



<style scoped>
nav,
.profile-menu {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.router-link-active {
    border-bottom: 3.5px solid #000;
    opacity: 1;
    font-weight: bold;
}

a {
    text-decoration: none;
}

.icon-active {
    transform: rotate(180deg);
}

i {
    color: black;
    cursor: pointer;
    font-size: 32px;
    transition: 0.8s ease all;
}



.mobile-nav-enter-active,
.mobile-nav-leave-active {
    transition: 1s ease all;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
    transform: translateX(-250px);
}

.mobile-nav-enter-to {
    transform: translateX(0);
}
</style>