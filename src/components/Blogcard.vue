<template>
    <div class="blog-card">
        <div v-show="editPost" class="icons flex gap-[8px] absolute top-[10px] right-[10px] z-50">
            <div class="icon-div edit">
                <Icon class="icon" icon="bx:edit" @click="editBlogPost" />
            </div>
            <div class="icon-div delete" @click="deletePost">
                <Icon class="icon" icon="ic:outline-delete" />
            </div>
        </div>
        <img class="block rounded-[8px_8px_0_0] min-h-[200px] object-cover" :src="post.blogCoverPhoto"
            alt="blog card photos">
        <div class="info flex flex-col h-full z-10 py-[32px] px-[16px] text-black">
            <h4 class="pb-[8px] text-[20px] font-semibold">{{ post.blogTitle }}</h4>
            <h6 class="font-normal text-[12px] pb-[16px]">Posted on: {{ post.blogDate }}</h6>
            <router-link
                class="inline-flex items-center mt-auto font-medium text-[12px] pt-[20px] pb-[4px] border-solid border-transparent border-b-[1px] transition-colors hover:border-b-[#303030] uppercase"
                :to="{ name: 'viewblog', params: { blogid: this.post.blogID } }">View The Post</router-link>

        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    name: 'blogCard',
    components: {
        Icon,
    },
    props: ["post"],

    computed: {
        editPost() {
            return this.$store.state.editPost
        }
    },
    methods: {
        deletePost() {
            this.$store.dispatch("deletePost", this.post.blogID)
        },
        editBlogPost(){
            this.$router.push({ name: 'editblog', params: { blogid: this.post.blogID } })
        }
    },
}
</script>

<style scoped>
.blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    min-height: 420px;
    transition: .5s ease all;
}

.blog-card:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.icon-div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    transition: 0.5s ease all;
}

.icon-div:hover {
    background-color: #303030;
}

.icon {
    width: 100%;
    height: 100%;
    color: black;
    padding: 8px;
}

.icon:hover {
    color: white;
}
</style>