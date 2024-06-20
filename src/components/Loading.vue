<template>
    <div class="loading fixed top-0 z-50 h-full w-full bg-black bg-opacity-50 flex justify-center items-center">
        <span
            class="block w-[60px] h-[60px] my-0 mx-auto border-solid border-[3px] border-transparent border-t-white border-b-white rounded-[50%]"></span>
    </div>
</template>

<script>
export default {
    name: "loading",
}
</script>

<style scoped>
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

span {
    animation: spin ease 1000ms infinite;
}
</style>