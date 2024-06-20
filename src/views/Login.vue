<template>
    <div class="font-qs form-wrap overflow-hidden flex h-screen items-center justify-center my-0 mx-auto w-full">
        <form class="login py-0 px-[50px] relative flex flex-col items-center justify-center flex-[1]">
            <p class="login-register mb-[32px]">
                Don't have an account?
                <router-link class="text-black" :to="{ name: 'register' }">Register</router-link>
            </p>
            <h2 class="text-center text-[40px] text-[#303030] mb-[40px]">Login to FireBlogs</h2>
            <div class="inputs max-w-[350px] w-full">
                <div class="input relative flex items-center justify-center mb-[8px]">
                    <input class="w-full border-none bg-[#f2f7f6] pt-[4px] pr-[4px] pl-[30px] h-[50px]" type="email"
                        placeholder="Email" v-model="email">
                    <Icon icon="ic:outline-email" class="absolute left-[6px] w-[12px] h-[12px] text-black" />
                </div>
                <div class="input relative flex items-center justify-center mb-[8px]">
                    <input class="w-full border-none bg-[#f2f7f6] pt-[4px] pr-[4px] pl-[30px] h-[50px]" type="password"
                        placeholder="Password" v-model="password">
                    <Icon icon="ic:outline-lock" class="absolute left-[6px] w-[12px] h-[12px] text-black" />
                </div>
                <div v-show="error" class="error text-center text-[12px] text-red-600">{{ this.errorMsg }}</div>
            </div>
            <router-link
                class="no-underline text-black text-[14px] mt-[16px] mb-[32px] border-solid border-transparent border-[1px] transition duration-500 hover:border-b-[#303030]"
                :to="{ name: 'forgotpassword' }">Forgot your password?</router-link>
            <button @click.prevent="signIn"
                class="flex gap-[8px] items-center justify-center mt-[24px] py-[12px] px-[24px] text-white rounded-[20px] border-none bg-[#303030] uppercase focus:outline-none hover:bg-[rgba(48,48,48,0.7)] text-[14px] transition-all duration-500">Sign
                In</button>
            <div class="angle"></div>
        </form>
        <div class="background flex-[2] bg-cover w-full h-full"></div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/firebaseConfig.js"; // Correct import path


export default {
    name: "login",
    components: {
        Icon,
    },
    data() {
        return {
            email: null,
            password: null,
            error: false,
            errorMsg: "",
        }
    },
    methods: {
        signIn() {
            // Check if all required fields are filled
            if (this.email && this.password) {
                try {
                    // Clear previous error state
                    this.error = false;
                    this.errorMsg = '';

                    // Sign in user with email and password
                    signInWithEmailAndPassword(auth, this.email, this.password)
                        .then((userCredential) => {
                            // Get the user object
                            const user = userCredential.user;

                            // Log the user ID to the console
                            console.log("User ID:", user.uid);

                            // Navigate user to the home page assuming you're using Vue Router
                            this.$router.push({ name: "home" });
                        })
                        .catch((error) => {
                            // Handle errors during sign-in
                            console.error("Error signing in user:", error.message);
                            this.errorMsg = "Error signing in user: " + error.message;
                            this.error = true;
                        });
                } catch (error) {
                    // Handle unexpected errors
                    console.error("Error signing in user:", error.message);
                    this.errorMsg = "Error signing in user: " + error.message;
                    this.error = true;
                }
            } else {
                // Handle form validation errors
                this.error = true;
                this.errorMsg = "Please fill out all the fields!";
            }
        }


    },
}
</script>

<style>
.background {
    background-image: url("../assets/background.png");
}

.angle {
    display: initial;
    position: absolute;
    background-color: white;
    transform: rotateZ(3deg);
    width: 60px;
    right: -30px;
    height: 120vh;
}
</style>