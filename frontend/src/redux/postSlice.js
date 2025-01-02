// redux/postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api'; // Instance Axios ou fetch configurée


// Thunks pour les API calls
export const fetchUserPosts = createAsyncThunk(
  'post/fetchUserPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/post/user/${userId}`);
      return response.data; // Liste des posts
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      await API.delete(`/post/${postId}`);
      return postId; // Retourner l'ID pour le supprimer localement
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    userPosts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetchUserPosts
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // deletePost
    builder
      .addCase(deletePost.fulfilled, (state, action) => {
        state.userPosts = state.userPosts.filter(
          (post) => post._id !== action.payload
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
