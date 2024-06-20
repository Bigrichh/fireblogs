import { createStore } from 'vuex'; // Import Vuex to create a store
import { auth, db } from "../firebase/firebaseConfig.js";// Import authentication and Firestore configuration
import { doc, getDoc, updateDoc, query, orderBy, getDocs, collection, deleteDoc } from "firebase/firestore";// Import Firestore methods for document handling


// Create and export the Vuex store
export default createStore({
  state: {

    blogPosts: [],
    postLoaded: null,

    blogHTML: "",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFile: null,
    newBlogPhotoFile: null,
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null, // editPost state

    // User profile state
    user: null, // User object from Firebase authentication
    profileAdmin: null,
    profileEmail: null, // User's email
    profileFirstName: null, // User's first name
    profileLastName: null, // User's last name
    profileUserName: null, // User's username
    profileId: null, // User's unique ID
    profileInitials: null, // User's initials
  },


  // Mutations: Functions to update the state
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    blogPhotoFileReset(state,payload){
      state.blogPhotoFile = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    setBlogPhotoFile(state, file) {
      state.blogPhotoFile = file; // Mutation to set the file
    },
    setNewBlogPhotoFile(state, file) {
      state.newBlogPhotoFile = file; // Mutation to set the file
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(post => post.blogID !== payload);
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoFile = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
      console.log(payload)
    },

    // Toggle the edit post state
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },

    // Set the user object in the state
    updateUser(state, payload) {
      state.user = payload
    },

    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
    },

    // Set the user profile information in the state
    setProfileInfo(state, userProfileData) {
      state.profileEmail = userProfileData.email; // Set user's email
      state.profileFirstName = userProfileData.firstName; // Set user's first name
      state.profileLastName = userProfileData.lastName; // Set user's last name
      state.profileUserName = userProfileData.userName; // Set user's username
      state.profileId = userProfileData.uid; // Set user's ID
      state.profileInitials = userProfileData.firstName.charAt(0) + userProfileData.lastName.charAt(0); // Set user's initials by taking the first letter of first and last names
    },

    changeFirstName(state, payload) {
      state.profileFirstName = payload
    },
    changeLastName(state, payload) {
      state.profileLastName = payload
    },
    changeUserName(state, payload) {
      state.profileUserName = payload
    },


  },

  // Actions: Functions to perform asynchronous operations
  actions: {
    // Action to get the current user's profile information from Firestore
    async getCurrentUser({ commit }, user) {
      const currentUser = auth.currentUser;// Get the current authenticated user
      if (currentUser) {// Check if a user is logged in

        const userDocRef = await getDoc(doc(db, 'users', currentUser.uid)); // Get the User's Documentsnapshot object from the firestore database which contains metadata and methods related to the document and also the actual document data

        if (userDocRef.exists()) { // Check if the Users Documentsnapshot object actually exists
          const userProfileData = userDocRef.data(); // Get the actual document data from the Documentsnapshots .data() method which returns the documents data as a Javascript object
          userProfileData.uid = currentUser.uid; // Add the user's UID to the data
          commit("setProfileInfo", userProfileData); // Commit the setProfileInfo mutation which updates the profile information in the state
          const token = await user.getIdTokenResult();
          const admin = await token.claims.admin;
          commit('setProfileAdmin', admin)

        } else {
          console.log("No such document!"); // Log a message if the document does not exist
        }

      } else {
        // No user is logged in
        commit('setUser', null); // Reset the user object to null
        commit('setProfileInfo', {
          email: null,
          firstName: null,
          lastName: null,
          userName: null,
          id: null,
          initials: null
        }); // Reset the profile information to its initial state
      }
    },

    async updateUserSettings({ state }) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          await updateDoc(userDocRef, {
            firstName: state.profileFirstName,
            lastName: state.profileLastName,
            userName: state.profileUserName,
          });
          console.log('User profile updated successfully');
        } catch (error) {
          console.error('Error updating user profile:', error);
        }
      }
    },

    async getPost({ state }) {
      const blogsDocRef = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(blogsDocRef);
      querySnapshot.forEach((doc) => {
        if (!state.blogPosts.some(post => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogId,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().createdAt.toDate().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          }
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },


    async updatePost({commit,dispatch},payload){
      commit('filterBlogPost', payload);
      await dispatch("getPost")
    },

    async deletePost({ commit }, payload) {
      try {
        await deleteDoc(doc(db, 'blogPosts', payload)); // Delete the document from Firestore
        commit('filterBlogPost', payload); // Remove the post from the state
        console.log('Post deleted successfully');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  },

  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  }
});