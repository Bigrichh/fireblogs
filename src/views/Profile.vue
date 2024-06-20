<template>
    <div class="profile relative cursor-pointer flex items-center justify-center font-qs">
        <Modal v-if="modalActive" :modalMessage="modalMessage" @close-modal="closeModal"></Modal>
        <div class="container max-w-[1000px] py-[60px] px-[25px]">
            <h2 class="text-center mb-[16px] font-light text-[32px]">Account Settings</h2>
            <div class="profile-info rounded-[8px] p-[32px] bg-[#f1f1f1] flex flex-col max-w-[600px] my-[32px] mx-auto">
                <div
                    class="initials w-[80px] h-[80px] text-[32px] bg-[#303030] text-white flex items-center justify-center rounded-full">
                    {{ $store.state.profileInitials }}</div>
                <div v-show="admin"
                    class="admin-badge flex gap-[8px] self-center text-white text-[14px] py-[8px] px-[24px] rounded-[8px] bg-[#303030] my-[16px] mx-0 text-center uppercase">
                    <Icon icon="mdi:administrator" width="14" height="14" style="color: white" />
                    <span>admin</span>
                </div>
                <div class="input my-[16px] mx-0">
                    <label class="text-[14px] block pb-[6px]" for="firstName">First Name:</label>
                    <input class="w-full border-none bg-[#f2f7f6] p-[8px] h-[50px] focus:outline-none" type="text"
                        id="firstName" v-model="firstName">
                </div>
                <div class="input my-[16px] mx-0">
                    <label class="text-[14px] block pb-[6px]" for="lastName">Last Name:</label>
                    <input class="w-full border-none bg-[#f2f7f6] p-[8px] h-[50px] focus:outline-none" type="text"
                        id="lastName" v-model="lastName">
                </div>
                <div class="input my-[16px] mx-0">
                    <label class="text-[14px] block pb-[6px]" for="userName">Username:</label>
                    <input class="w-full border-none bg-[#f2f7f6] p-[8px] h-[50px] focus:outline-none" type="text"
                        id="userName" v-model="userName">
                </div>
                <div class="input my-[16px] mx-0">
                    <label class="text-[14px] block pb-[6px]" for="email">Email:</label>
                    <input class="w-full border-none bg-[#f2f7f6] p-[8px] h-[50px] focus:outline-none" disabled
                        type="text" id="email" v-model="email">
                </div>
                <button @click="updateProfile"
                    class="flex gap-[8px] items-center justify-center mt-[24px] mx-auto py-[12px] px-[24px] text-white rounded-[20px] border-none bg-[#303030] uppercase focus:outline-none hover:bg-[rgba(48,48,48,0.7)] text-[14px] ml-auto transition-all duration-500">Save
                    Changes</button>
            </div>
        </div>
    </div>
</template>


<script>
import Modal from '@/components/Modal.vue';
import { Icon } from '@iconify/vue';
import { updateProfile } from 'firebase/auth';

export default {
    name: 'profile',
    components: {
        Modal, Icon
    },
    data() {
        return {
            modalMessage: "changes were saved",
            modalActive: null,
        }
    },
    computed: {
        firstName: {
            get() {
                return this.$store.state.profileFirstName;
            },
            set(payload) {
                this.$store.commit("changeFirstName", payload)
            }
        },
        lastName: {
            get() {
                return this.$store.state.profileLastName;
            },
            set(payload) {
                this.$store.commit("changeLastName", payload)
            }
        },
        userName: {
            get() {
                return this.$store.state.profileUserName;
            },
            set(payload) {
                this.$store.commit("changeUserName", payload)
            }
        },
        email() {
            return this.$store.state.profileEmail;
        },

        user() {
            return this.$store.state.user;
        },
        admin() {
            return this.$store.state.profileAdmin;
        },

    },
    methods: {
        closeModal() {
            this.modalActive = !this.modalActive;
        },
        updateProfile() {
            this.$store.dispatch("updateUserSettings");
            this.modalActive = !this.modalActive
        }
    }
}
</script>


<style></style>