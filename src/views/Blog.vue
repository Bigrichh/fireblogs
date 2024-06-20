<template>
    <div class="blog-card-wrap relative bg-[#f1f1f1] py-[100px] px-[16px] font-qs">
        <div class="blog-cards container relative grid gap-[32px] grid-cols-4">
            <div class="toggle-edit flex items-center absolute top-[-70px] right-0">
                <span class="mr-[16px]">Toggle Editing Post</span>
                <input type="checkbox" v-model="editPost">
            </div>
            <Blogcard :post="post" v-for="(post, index) in blogPosts" :key="index"></Blogcard>
        </div>
    </div>
</template>

<script>
import Blogcard from '@/components/Blogcard.vue';

export default {
    name: 'Blog',
    components: {
        Blogcard
    },
    computed: {
        blogPosts() {
            return this.$store.state.blogPosts
        },
        editPost: { 
            get() {
                return this.$store.state.editPost;
            },
            set(payload) {
                this.$store.commit("toggleEditPost", payload)
            }

        }
    },
    beforeUnmount() {
        console.log('component is about to be destroyed')
        this.$store.commit("toggleEditPost", false);
    },
}
</script>

<style scoped>
input[type="checkbox"] {
    position: relative;
    border: none;
    -webkit-appearance: none;
    appearance: none;
    background: #fff;
    outline: none;
    width: 80px;
    height: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
}

input[type="checkbox"]:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #303030;
    width: 30px;
    height: 30px;
    transform: scale(1.1);
    transition: 750ms ease all;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

input:checked[type="checkbox"]:before {
    background: #fff;
    left: 52px;
}
</style>