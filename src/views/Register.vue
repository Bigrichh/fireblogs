<template>
    <div class="font-qs form-wrap overflow-hidden flex h-screen items-center justify-center my-0 mx-auto w-full">
        <form class="login py-0 px-[50px] relative flex flex-col items-center justify-center flex-[1]">
            <p class="login-register mb-[32px]">
                Already have an account?
                <router-link class="text-black" :to="{ name: 'login' }">Log in</router-link>
            </p>
            <h2 class="text-center text-[40px] text-[#303030] mb-[40px]">Create Your FireBlog Account</h2>
            <div class="inputs max-w-[350px] w-full">
                <div class="input relative flex items-center justify-center mb-[8px]">
                    <input class="w-full border-none bg-[#f2f7f6] pt-[4px] pr-[4px] pl-[30px] h-[50px]" type="text"
                        placeholder="First Name" v-model="firstName">
                    <Icon icon="ic:outline-person" class="absolute left-[6px] w-[12px] h-[12px] text-black" />
                </div>
                <div class="input relative flex items-center justify-center mb-[8px]">
                    <input class="w-full border-none bg-[#f2f7f6] pt-[4px] pr-[4px] pl-[30px] h-[50px]" type="text"
                        placeholder="Last Name" v-model="lastName">
                    <Icon icon="ic:outline-person" class="absolute left-[6px] w-[12px] h-[12px] text-black" />
                </div>
                <div class="input relative flex items-center justify-center mb-[8px]">
                    <input class="w-full border-none bg-[#f2f7f6] pt-[4px] pr-[4px] pl-[30px] h-[50px]" type="text"
                        placeholder="Username" v-model="userName">
                    <Icon icon="ic:outline-email" class="absolute left-[6px] w-[12px] h-[12px] text-black" />
                </div>
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
                <div class="input relative flex items-center justify-center mb-[8px]">
                    <input class="w-full border-none bg-[#f2f7f6] pt-[4px] pr-[4px] pl-[30px] h-[50px]" type="password"
                        placeholder="Confirm password" v-model="confirmPassword">
                    <Icon icon="ic:outline-lock" class="absolute left-[6px] w-[12px] h-[12px] text-black" />
                </div>
                <div v-show="error" class="error text-center text-[12px] text-red-600">{{ this.errorMsg }}</div>
            </div>
            <button @click.prevent="register"
                class="flex gap-[8px] items-center justify-center mt-[24px] py-[12px] px-[24px] text-white rounded-[20px] border-none bg-[#303030] uppercase focus:outline-none hover:bg-[rgba(48,48,48,0.7)] text-[14px] transition-all duration-500">Sign
                Up</button>
            <div class="angle"></div>
        </form>
        <div class="background flex-[2] bg-cover w-full h-full"></div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';

// Import necessary functions from Firebase SDK
// import { collection, addDoc } from "firebase/firestore" - use this if you're using the addDoc function;
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../firebase/firebaseConfig.js"; // Correct import path
import { doc, setDoc } from 'firebase/firestore';


export default {
    name: 'register',
    components: {
        Icon,
    },
    data() {
        return {
            // Reactive data properties for user input and error state
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            error: false,
            errorMsg: "",
        }
    },
    methods: {
        // Method to handle user registration | Sign Up 
        async register() {
            // Check if all required fields are filled and passwords match
            if (
                this.firstName !== '' &&
                this.lastName !== '' &&
                this.userName !== '' &&
                this.email !== '' &&
                this.password !== '' &&
                this.confirmPassword !== '' &&
                this.password === this.confirmPassword
            ) {
                try {
                    // Clear previous error state
                    this.error = false;
                    this.errorMsg = '';

                    // Create user with email and password
                    const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
                    const user = userCredential.user;


                    // we're storing the users data in a collection called users and we're storing users by thier unique id(uid) generated by firebase on account creation
                    await setDoc(doc(db, 'users', user.uid), {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        userName: this.userName,
                        email: this.email
                    })

                    // //you can also Save additional user data to Firestore this way but instead of importing setDoc above you import addDoc but firebase will generate it's own unique doc id 
                    // await addDoc(collection(db, "users"), {
                    //     firstName: this.firstName,
                    //     lastName: this.lastName,
                    //     userName: this.userName,
                    //     email: this.email
                    // });

                    // Navigate user to the home page assuming you're using Vue Router
                    this.$router.push({ name: "home" });
                    return;
                } catch (error) {
                    // Handle errors during user registration
                    console.error("Error creating user:", error.message);
                    if (error.code === "auth/email-already-in-use") {
                        this.errorMsg = "Email is already in use. Please log in or use a different email.";
                    } else {
                        this.errorMsg = "An error occurred. Please try again later.";
                    }
                    this.error = true;
                    return;
                }
            } else if (
                // Handle form validation errors
                this.firstName !== '' &&
                this.lastName !== '' &&
                this.userName !== '' &&
                this.email !== '' &&
                this.password !== '' &&
                this.password !== this.confirmPassword
            ) {
                this.error = true;
                this.errorMsg = "Please make sure your passwords match";
                return;
            } else {
                // Handle form validation errors
                this.error = true;
                this.errorMsg = "Please fill out all the fields!";
                return;
            }
        }
    },
}
</script>