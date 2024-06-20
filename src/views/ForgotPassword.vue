<template>
    <div class="reset-password">
        <Modal v-if="modalActive" :modalMessage="modalMessage" @close-modal="closeModal"></Modal>
        <Loading v-if="loading"></Loading>
        <div class="font-qs form-wrap overflow-hidden flex h-screen items-center justify-center my-0 mx-auto w-full">
            <form class="reset py-0 px-[50px] relative flex flex-col items-center justify-center flex-[1]">
                <p class="login-register mb-[32px]">
                    Back to
                    <router-link class="text-black" :to="{ name: 'login' }">Login</router-link>
                </p>

                <h2 class="text-center text-[40px] text-[#303030] mb-[8px]">Reset Password</h2>
                <p class="login-register mb-[32px] text-center">
                    Forgot your password? Enter your email to reset it
                </p>
                <div class="inputs max-w-[350px] w-full">
                    <div class="input relative flex items-center justify-center mb-[8px]">
                        <input class="w-full border-none bg-[#f2f7f6] pt-[4px] pr-[4px] pl-[30px] h-[50px]" type="email"
                            placeholder="Email" v-model="email">
                        <Icon icon="ic:outline-email" class="absolute left-[6px] w-[12px] h-[12px] text-black" />
                    </div>
                </div>
                <button @click.prevent="resetPassword"
                    class="flex gap-[8px] items-center justify-center mt-[24px] py-[12px] px-[24px] text-white rounded-[20px] border-none bg-[#303030] uppercase focus:outline-none hover:bg-[rgba(48,48,48,0.7)] text-[14px] transition-all duration-500">Reset</button>
                <div class="angle"></div>
            </form>
            <div class="background flex-[2] bg-cover w-full h-full"></div>
        </div>
    </div>

</template>

<script>
import Modal from '@/components/Modal.vue';
import Loading from '@/components/Loading.vue';
import { Icon } from '@iconify/vue';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig.js'; // Correct import path

export default {
    name: "forgotpassword",
    components: {
        Icon,
        Modal,
        Loading,
    },
    data() {
        return {
            email: null,
            modalActive: false,
            modalMessage: "",
            loading: false,
        }
    },
    methods: {
        closeModal() {
            this.modalActive = !this.modalActive;
            this.email = "";
        },
        async resetPassword() {
            this.loading = true;
            try {
                await sendPasswordResetEmail(auth, this.email);
                this.modalMessage = "Password reset email sent! Please check your inbox.";
                this.loading = false;
                this.modalActive = true;
            } catch (error) {
                console.error("Error sending password reset email:", error);
                this.modalMessage = "Error sending password reset email: " + error.message;
                this.modalActive = true;
            } finally {
                this.loading = false;
            }
        }
    },
}
</script>
