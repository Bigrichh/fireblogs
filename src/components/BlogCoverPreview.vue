<template>
    <div ref="modal"
        class="modal flex items-center justify-center z-50 fixed w-full h-full top-0 bg-black bg-opacity-50">
        <div class="modal-content flex flex-col justify-center rounded-[12px] p-[50px] h-[400px] w-[600px] bg-white">
            <div class="self-end">
                <Icon @click="closePreview" icon="material-symbols:close"
                    class="border-solid border-black border-[2px] text-black hover:opacity-100 opacity-50 hover:cursor-pointer rounded-full"
                    width="24" height="24" />
            </div>
            <div class="mt-[16px] w-full h-full">
                <img class="w-full h-full object-cover" :src="this.blogCoverPhoto" alt="blogcoverphoto">
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
export default {
    name: 'blogcoverpreview',
    components: {
        Icon
    },
    methods: {
        closePreview() {
            this.$store.commit("openPhotoPreview");
        },
    },
    computed: {
        blogCoverPhoto() {
            return this.$store.state.blogPhotoFileURL;
        }
    },

}
</script>