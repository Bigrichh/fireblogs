<template>
    <div class="blog-wrapper flex shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
        :class="{ 'no-user': !user }">
        <div class="blog-content flex flex-col items-center justify-center flex-[3] order-1">
            <div class="max-w-[375px] py-[72px] px-[24px]">
                <h2 class="text-[32px] font-light uppercase mb-[24px]" v-if="post.welcomeScreen">{{ post.title }}</h2>
                <h2 class="text-[32px] font-light uppercase mb-[24px]" v-else>{{ post.blogTitle }}</h2>
                <p class="text-[15px] font-light" v-if="post.welcomeScreen">{{ post.blogPost }}</p>
                <p class="text-[13px] max-h-[24px] w-[250px] whitespace-nowrap overflow-hidden text-ellipsis font-light"
                    v-else v-html="post.blogHTML"></p>
                <router-link
                    class="inline-flex items-center mt-[32px] pb-[4px] border-solid border-transparent border-b-[1px] transition-colors hover:border-b-[#fff] uppercase link-light"
                    v-if="post.welcomeScreen" to="#">Login | Register</router-link>
                <router-link
                    class="inline-flex items-center mt-[32px] pb-[4px] border-solid border-transparent border-b-[1px] transition-colors hover:border-b-[#303030] uppercase"
                    v-else :to="{name:'viewblog', params:{blogid: this.post.blogID}}">View The Post</router-link>
            </div>
        </div>
        <div
            class="blog-photo shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] flex-[4] order-2">
            <img class="block w-full h-full object-cover" v-if="post.welcomeScreen" :src="getImageUrl(post.photo)"
                alt="coding image">
            <img class="block w-full h-full object-cover" v-else :src="post.blogCoverPhoto"
                alt="blog post cover">
        </div>
    </div>
</template>

<script>
export default {
    name: 'blogPost',
    props: ["post"],
    methods: {
        getImageUrl(name) {
            return new URL(`../assets/blogPhotos/${name}.jpg`, import.meta.url).href
        },
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
}
</script>

<style scoped>
.blog-wrapper:nth-child(even) .blog-content {
    order: 2;
}

.blog-wrapper:nth-child(even) .blog-photo {
    order: 1;
}

.no-user:first-child {
    background: #303030;
    color: white;
}
</style>