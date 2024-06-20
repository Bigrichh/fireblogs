<template>
    <div class="createpost relative h-full font-qs">
        <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview"></BlogCoverPreview>
        <Loading v-if="loading"></Loading>
        <div class="container  mx-auto relative h-full pt-[10px] px-[150px] pb-[60px]">
            <div :class="{ 'invisible': !error }"
                class="err-message w-full p-[12px] rounded-[8px] text-white mb-[10px] bg-[#303030] opacity-100 transition-all">
                <p class="text-[14px]"><span class="font-semibold">Error:{{ this.errorMsg }}</span></p>
            </div>
            <div class="blog-info flex mb-[32px]">
                <input
                    class="min-w-[300px] h-fit py-[10px] px-[4px] border-solid border-transparent border-b-[#303030] border-b-[1px]"
                    type="text" placeholder="Enter Blog Title" v-model="blogTitle">
                <div class="upload-file ml-[16px] relative flex items-center justify-center">
                    <label
                        class="w-fit flex gap-[8px] items-center justify-center py-[12px] px-[24px] text-white rounded-[20px] border-none bg-[#303030]  focus:outline-none hover:bg-[rgba(48,48,48,0.7)] text-[14px] transition-all duration-500 hover:cursor-pointer"
                        for="blog-photo">Upload Cover Photo</label>
                    <input type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg" @change="fileChange"
                        class="hidden py-[10px] px-[4px] border-solid border-transparent border-b-[#303030] border-b-[1px]">
                    <button @click="openPreview"
                        class="preview ml-[16px] w-fit no-underline flex items-center justify-center py-[12px] px-[24px] text-white rounded-[20px] border-none bg-[#303030] focus:outline-none hover:bg-[rgba(48,48,48,0.7)] text-[14px] transition-all duration-500 hover:cursor-pointer"
                        :class="{ 'button-inactive': !$store.state.blogPhotoFileURL }">Preview
                        Photo</button>
                    <span class="ml-[16px] text-[12px] font-semibold">File Chosen : {{ $store.state.blogPhotoName }}
                    </span>
                </div>
            </div>
            <div class="editor">
                <QuillEditor :options="options" :modules="modules" contentType="html" v-model:content="blogHTML"
                    toolbar="full" theme="snow" />
            </div>
            <div class="blog-actions flex mt-[32px]">
                <button @click="uploadBlog"
                    class="w-fit mr-[16px] no-underline flex items-center justify-center py-[12px] px-[24px] text-white rounded-[20px] border-none bg-[#303030] uppercase focus:outline-none hover:bg-[rgba(48,48,48,0.7)] text-[14px] transition-all duration-500 hover:cursor-pointer">Publish
                    Blog</button>
                <router-link :to="{ name: 'blogpreview' }"
                    class="router-button w-fit no-underline flex items-center justify-center py-[12px] px-[24px] text-white rounded-[20px] border-none bg-[#303030] uppercase focus:outline-none hover:bg-[rgba(48,48,48,0.7)] text-[14px] transition-all duration-500">Post
                    Preview</router-link>
            </div>

        </div>
    </div>


</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
// import BlotFormatter from 'quill-blot-formatter'
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import BlogCoverPreview from '../components/BlogCoverPreview.vue';

import { db, storage } from "../firebase/firebaseConfig.js"; // Correct import path
import { doc, collection, setDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";


import Loading from '@/components/Loading.vue';

export default {
    components: {
        QuillEditor,
        BlogCoverPreview,
        Loading,
    },
    setup() {
        const modules = {
            name: 'blotFormatter',
            module: BlotFormatter,
            options: {/* options */ }
        }
        return { modules }
    },
    data() {
        return {
            loading: false,
            error: null,
            errorMsg: null,
            options: {
                // debug: 'info',
                placeholder: 'Type your blog here...',
                readOnly: false,
            }

        }
    },
    computed: {
        profileId() {
            return this.$store.state.profileId;
        },
        blogCoverPhotoName() {
            return this.$store.state.blogPhotoName;
        },
        blogTitle: {
            get() {
                return this.$store.state.blogTitle;
            },
            set(payload) {
                this.$store.commit("updateBlogTitle", payload)

            }
        },
        blogHTML: {
            get() {
                return this.$store.state.blogHTML;
            },
            set(payload) {
                this.$store.commit("newBlogPost", payload)

            }
        },
        blogPhotoFile() {
            return this.$store.state.blogPhotoFile;
        },
    },
    methods: {
        fileChange() {
            const file = this.$refs.blogPhoto.files[0];
            const fileName = file.name;
            this.$store.commit("fileNameChange", fileName);
            this.$store.commit("createFileURL", URL.createObjectURL(file));
            this.$store.commit("setBlogPhotoFile", file); // Commit the file to the store
            console.log(this.file.type)
        },
        openPreview() {
            this.$store.commit("openPhotoPreview")
        },
        async uploadBlog() {
            if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
                if (this.blogPhotoFile) {
                    try {
                        this.loading = !this.loading;
                        // Create a reference to the storage location
                        const storageReference = storageRef(storage, `blogCovers/${this.blogCoverPhotoName}`);
                        // Define metadata with the correct content type
                        const metadata = {
                            contentType: this.blogPhotoFile.type, // Automatically use the file's type
                        };
                        // Upload the file
                        const snapshot = await uploadBytes(storageReference, this.blogPhotoFile, metadata);
                        // Get the file URL
                        const downloadURL = await getDownloadURL(snapshot.ref);


                        // Generate a new document reference to get a unique ID
                        const newBlogRef = doc(collection(db, "blogPosts"));

                        const blogData = {
                            blogId: newBlogRef.id,
                            blogTitle: this.blogTitle,
                            blogHTML: this.blogHTML,
                            blogCoverPhotoName: this.blogCoverPhotoName,
                            blogCoverPhoto: downloadURL,
                            createdAt: new Date(),
                            profileId: this.profileId
                        };
                        await setDoc(newBlogRef, blogData);
                        this.$refs.blogPhoto.value = null;
                        const nullValue = null;
                        this.$store.commit("fileNameChange", nullValue);
                        this.$store.commit("updateBlogTitle", nullValue);
                        this.$store.commit("newBlogPost", nullValue)
                        this.$store.commit("blogPhotoFileReset", nullValue)


                        await this.$store.dispatch("getPost");
                        this.loading = !this.loading;
                        this.$router.push({ name: 'viewblog', params: { blogid: newBlogRef.id } });
                    } catch (err) {
                        this.loading = !this.loading;
                        console.error("Error uploading blog:", err.message);
                        // Display error message to user
                        this.error = true;
                        this.errorMsg = err.message;
                        setTimeout(() => {
                            this.error = false;
                        }, 5000);
                    }


                } else {
                    this.error = true;
                    this.errorMsg = "Please make sure you uploaded a blog cover photo!";
                    setTimeout(() => {
                        this.error = false;
                    }, 5000);
                }
            } else {
                this.error = true;
                this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!";
                setTimeout(() => {
                    this.error = false;
                }, 5000);
            }

        },
    },
}
</script>

<style>
.invisible {
    opacity: 0 !important;
}

.ql-editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
}

.button-inactive {
    opacity: 0.3;
}



/* General Styles */
.invisible {
    opacity: 0 !important;
}

.ql-editor {
    height: 600px !important;
    display: flex !important;
    flex-direction: column !important;
}


/* Header Styles */
.ql-editor h1,
.ql-editor h2,
.ql-editor h3,
.ql-editor h4,
.ql-editor h5,
.ql-editor h6 {
    font-family: 'Quicksand' !important;
    margin: 0 0 15px 0 !important;
}

.ql-editor h1 {
    font-size: 40px !important;
    font-weight: bold !important;
}

.ql-editor h2 {
    font-size: 32px !important;
    font-weight: bold !important;
}

.ql-editor h3 {
    font-size: 28px !important;
    font-weight: bold !important;
}

.ql-editor h4 {
    font-size: 24px !important;
    font-weight: bold !important;
}

.ql-editor h5 {
    font-size: 20px !important;
    font-weight: bold !important;
}

.ql-editor h6 {
    font-size: 18px !important;
    font-weight: bold !important;
}

/* Paragraph Styles */
.ql-editor p {
    font-size: 18px !important;
    font-family: 'Quicksand' !important;
    line-height: 1.6 !important;
    margin: 0 0 15px 0 !important;
}

/* List Styles */
.ql-editor ul,
.ql-editor ol {
    margin: 0 0 15px 0 !important;
    font-size: 16px !important;
}

.ql-editor ul {
    list-style-type: disc !important;
}

.ql-editor ol {
    list-style-type: decimal !important;
}

.ql-editor li {
    margin: 0 0 5px 0 !important;
    line-height: 1.6 !important;
}
</style>