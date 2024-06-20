<template>
    <div class="post-preview h-full mx-auto font-qs">
        <div class="container quillWrapper max-w-[1240px] py-[60px] px-[25px]">
            <h2 class="mb-[16px] font-light text-[32px]">{{ this.blogTitle }}</h2>
            <img class="w-full mb-[32px]" :src="blogCoverPhoto" alt="blogCoverPhoto">
            <div class="post-content p-o" v-html="blogHTML"></div>
        </div>
    </div>

</template>
<script>
export default {
    name: "blogPreview",
    computed: {
        blogTitle() {
            return this.$store.state.blogTitle
        },
        blogHTML() {
            return this.$store.state.blogHTML
        },
        blogCoverPhoto() {
            return this.$store.state.blogPhotoFileURL;
        },
    },
}
</script>
<style>
img{
    width: 100%;
}
</style>