<template>
    <div class="admin relative cursor-pointer flex items-center justify-center font-qs">
        <div class="container max-w-[1000px] py-[60px] px-[25px]">
            <h2 class="text-center mb-[16px] font-light text-[32px]">Administrator</h2>
            <div class="admin-info rounded-[8px] p-[32px] bg-[#f1f1f1] flex flex-col max-w-[600px] my-[32px] mx-auto">
                <h2 class="text-[14px] block pb-[6px]">Add Admin</h2>
                <div class="input my-[16px] mx-0">
                    <input class="w-full border-none bg-[#f2f7f6] p-[8px] h-[50px] focus:outline-none"
                        placeholder="Enter Email to make them an admin" id="addAdmins" v-model="adminEmail" type="text">
                </div>
                <span class="text-black w-full h-fit">{{functionMsg }}</span>
                <button @click="addAdmin"
                    class="flex gap-[8px] items-center justify-center mt-[24px] mx-auto py-[12px] px-[24px] text-white rounded-[20px] border-none bg-[#303030] uppercase focus:outline-none hover:bg-[rgba(48,48,48,0.7)] text-[14px] ml-auto transition-all duration-500">Submit</button>
            </div>
        </div>
    </div>
</template>


<script>
import { functions } from "../firebase/firebaseConfig.js"; // Adjust the path accordingly
import { httpsCallable } from 'firebase/functions'; // Ensure you're importing httpsCallable

export default {
    name: 'admin',
    data() {
        return {
            adminEmail: "",
            functionMsg: null,
        }
    },

    methods: {
        // Method to call the Firebase function
        async addAdmin() {
            try {
                // Call the Firebase function with the admin email
                const addAdminRole = httpsCallable(functions, 'addAdminRole');
                const result = await addAdminRole({ email: this.adminEmail });

                // Update the message to display function result
                this.functionMsg = result.data.message;
            } catch (error) {
                console.error(error);
                // Handle error and update the message
                this.functionMsg = "Error occurred while adding admin.";
            }
        }
    },
}
</script>


<style></style>