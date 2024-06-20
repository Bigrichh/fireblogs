<template>
    <div class="font-qs">
        <Blogpost v-if="!user" :post="welcomeScreen"></Blogpost>
        <Blogpost :post="post" v-for="(post, index) in blogPostsFeed" :key="index"></Blogpost>
        <div class="blog-card-wrap bg-[#f1f1f1] relative py-[100px] px-[16px]">
            <div class="container">
                <h3 class="font-light text-[28px] mb-[32px]">View More Recent Blogs</h3>
                <div class="blog-cards grid gap-[32px] grid-cols-4">
                    <Blogcard :post="post" v-for="(post, index) in blogPostsCards" :key="index"></Blogcard>
                </div>
            </div>
        </div>
        <div class="updates" v-if="!user">
            <div class="container flex py-[125px] px-[50px] items-center">
                <h2 class="font-light text-[40px] max-w-[425px] w-full text-initia uppercase">
                    Never miss a post. Resgister for your free account today!
                </h2>
                <router-link
                    class="flex gap-[8px] items-center justify-center mt-[24px] py-[12px] px-[24px] text-white rounded-[20px] border-none bg-[#303030] uppercase focus:outline-none hover:bg-[rgba(48,48,48,0.7)] text-[14px] ml-auto transition-all duration-500"
                    to="#">Register for FireBlogs <span>
                        <Icon class="text-white w-[18px] h-[18px]" icon="formkit:arrowright" />
                    </span> </router-link>
            </div>
        </div>
    </div>
</template>


<script>
import Blogpost from '@/components/Blogpost.vue';
import Blogcard from '@/components/Blogcard.vue';
import { Icon } from '@iconify/vue';

export default {
    name: 'Home',
    components: {
        Blogpost,
        Blogcard,
        Icon,
    },
    data() {
        return {
            welcomeScreen: {
                title: "Welcome!",
                blogPost: "Weekly blog articles with all thing programming including HTML, CSS, Javascript and more. Register today to never miss a post",
                welcomeScreen: true,
                photo: "coding"
            },
     

        }
    },
    computed: {
        blogPostsCards(){
            return this.$store.getters.blogPostsCards
        },
        blogPostsFeed(){
            return this.$store.getters.blogPostsFeed
        },
        user(){
            return this.$store.state.user
        }
    },
}
</script>
