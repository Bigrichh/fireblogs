<template>
    <div class="modal flex items-center justify-center z-50 absolute w-full h-full top-0 bg-black bg-opacity-70">
        <div class="modal-content flex flex-col justify-center rounded-[8px] w-[300px] py-[40px] px-[30px] bg-white">
            <p class="text-center">{{ this.modalMessage }}</p>
            <button
                class="self-center flex gap-[8px] items-center justify-center mt-[24px] py-[12px] px-[24px] text-white rounded-[20px] border-none bg-[#303030] uppercase focus:outline-none hover:bg-[rgba(48,48,48,0.7)] text-[14px] transition-all duration-500"
                @click="closeModal">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal',
    props: [
        "modalMessage",
    ],
    methods: {
        closeModal() {
            this.$emit("close-modal");
        }
    }
}
</script>