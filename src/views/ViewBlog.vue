<template>
    <div class="post-preview h-full mx-auto font-qs" v-if="currentBlog">
        <div class="container quillWrapper max-w-[1240px] py-[60px] px-[25px]" v-if="currentBlog.length > 0">
            <h2 class="mb-[16px] font-light text-[32px]">{{ this.currentBlog[0].blogTitle }}</h2>
            <h4 class="font-normal text-[12px] pb-[16px]">Posted on: {{ this.currentBlog[0].blogDate }}</h4>
            <img class="w-full mb-[32px]" :src="this.currentBlog[0].blogCoverPhoto" alt="blogCoverPhoto">
            <div class="post-content p-o" v-html="this.currentBlog[0].blogHTML"></div>
        </div>
    </div>

</template>


<script>
export default {
    name: 'viewblog',
    data() {
        return {
            currentBlog: [],
        }
    },
    async mounted() {
        this.currentBlog = await this.$store.state.blogPosts.filter(post => {
            return post.blogID === this.$route.params.blogid
        })
        console.log(this.currentBlog)
    }
}
</script>


<style></style>