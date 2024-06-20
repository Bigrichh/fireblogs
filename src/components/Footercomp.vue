<template>
    <footer class="font-qs py-[100px] px-[25px] bg-[#303030] mt-auto">
        <div class="flex flex-col gap-[32px]">
            <div class="text-white flex flex-col gap-[32px] items-center">
                <div class="col-1 flex flex-col gap-[32px]">
                    <h2 class="text-[24px] text-white font-semibold text-center">FireBlogs</h2>
                    <ul class="flex gap-[16px] list-none mt-auto">
                        <li>Youtube</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                        <li>LinkedIn</li>
                    </ul>
                </div>
                <div class="col-2 flex gap-[32px]">
                    <ul class="flex gap-[16px] list-none h-full justify-center text-[16px] font-medium">
                        <li>Home</li>
                        <li>Blogs</li>
                        <li v-if="admin">Create Post</li>
                        <li v-if="!user">Login | Register</li>
                    </ul>
                </div>

            </div>
            <div class="flex text-white items-center mt-0 mx-auto">
                <p>Copyright 2024 All Rights Reserved</p>
            </div>
        </div>
    </footer>
</template>


<script>
export default {
    name: 'footercomp',
    computed: {
        user() {
            return this.$store.state.user;
        },
        admin() {
            return this.$store.state.profileAdmin;
        },
    },

}
</script>