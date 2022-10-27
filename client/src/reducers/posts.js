import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  addNewMemory,
  deletePost,
  editPost,
  fetchPost,
  fetchPosts,
  fetchPostsBySearch,
  likePost,
} from "../api";

const initialState = {
  loading: false,
  error: "",
  data: [],
  message: "",
};

export const getAllMemories = createAsyncThunk(
  "memories/getMemories",
  async (page) => {
    try {
      const { data } = await fetchPosts(page);

      // console.log("🚀 ~ file: posts.js ~ line 24 ~ data", data);

      return data;
    } catch (error) {
      throw new error();
    }
  }
);

export const getMemory = createAsyncThunk("memories/getMemory", async (id) => {
  try {
    const { data } = await fetchPost(id);

    // console.log("🚀 ~ file: posts.js/Reducers ~ line 24 ~ data", data);

    return data;
  } catch (error) {
    throw new error();
  }
});

export const createNewMemory = createAsyncThunk(
  "memories/createMemory",
  async (post) => {
    try {
      const { data } = await addNewMemory(post);

      console.log("🚀 ~ file: posts.js ~ line 29 ~ data", data);

      return data;
    } catch (error) {
      throw new error();
    }
  }
);

export const updatePost = createAsyncThunk(
  "memories/updateMemory",
  async ({ currentId, createdData }) => {
    try {
      console.log(
        "🚀 ~ file: posts.js/Reducer ~ line 43 ~ before post",
        currentId,
        createdData
      );
      const { data } = await editPost(currentId, createdData);

      console.log("🚀 ~ file: posts.js/Reducer ~ line 44 ~ data", data);

      return data;
    } catch (error) {
      throw new error();
    }
  }
);

export const deleteMemory = createAsyncThunk(
  "memories/deleteMemory",
  async (id) => {
    try {
      const { data } = await deletePost(id);

      console.log(
        "🚀 ~ file: posts.js/reducer Action ~ line 67 ~ result",
        data
      );

      return data;
    } catch (error) {
      throw new error();
    }
  }
);

export const likeMemoryPost = createAsyncThunk(
  "memory/likePost",
  async (id) => {
    try {
      const { data } = await likePost(id);

      console.log("🚀 ~ file: posts.js/Reducer ~ line 83 ~ updatedPost", data);
      return data;
    } catch (error) {
      throw new error();
    }
  }
);

export const getPostBySearch = createAsyncThunk(
  "memory/searchPost",
  async ({ search, tags }) => {
    try {
      const { data } = await fetchPostsBySearch({ search, tags });

      // console.log("🚀 ~ file: posts.js/Reducers ~ line 102 ~ data", data);
      return data;
    } catch (error) {
      throw new error();
    }
  }
);

const postReducer = createSlice({
  name: "memory",
  initialState,
  reducers: {},
  extraReducers: {
    [createNewMemory.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [createNewMemory.fulfilled]: (state, { payload }) => {
      console.log("🚀 ~ file: posts.js ~ line 109 ~ payload", payload);
      console.log(
        "🚀 ~ file: posts.js/Reducer ~ line 109 ~ current(state)",
        current(state)
      );

      state.loading = false;
      // state.data = payload;
      state.data.posts.push(payload);
      // return {
      //   ...state.data,
      //   payload,
      // };
    },
    [createNewMemory.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [getAllMemories.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getAllMemories.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [getAllMemories.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [getMemory.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getMemory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [getMemory.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [updatePost.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, { payload }) => {
      console.log("🚀 ~ file: posts.js ~ line 181 ~ state", current(state));

      console.log("🚀 ~ file: posts.js ~ line 134 ~ payload", payload);
      const index = state.data.posts.findIndex(
        (post) => post._id === payload._id
      );

      console.log("🚀 ~ file: posts.js ~ line 185 ~ index", index);

      state.loading = false;
      // return payload;
      // state.data.posts[index].push(payload);

      state.data.posts[index] = {
        ...state.data.posts[index],
        ...payload,
      };
    },
    [updatePost.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteMemory.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [deleteMemory.fulfilled]: (state, { payload }) => {
      // console.log("🚀 ~ file: posts.js ~ line 199 ~ payload", payload);

      state.loading = false;
      const deletedItem = state.data.posts.filter((item) => {
        return item._id !== payload._id;
      });

      state.data.posts = deletedItem;
      // console.log(
      //   "🚀 ~ file: posts.js/Reducer Delete ~ line 119 ~ deletedItem",
      //   deletedItem
      // );

      // return deletedItem;
    },
    [deleteMemory.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [likeMemoryPost.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [likeMemoryPost.fulfilled]: (state, { payload }) => {
      console.log("🚀 ~ file: posts.js ~ line 230 ~ state", current(state));

      console.log("🚀 ~ file: posts.js/Reducer ~ line 170 ~ payload", payload);

      state.loading = false;

      const index = state.data.posts.findIndex(
        (post) => post._id === payload._id
      );

      // return [
      //   ...state.data.splice(0, index),
      //   payload,
      //   ...state.data.splice(index + 1),
      // ];
      // state.data[index].push(payload.data);
      // state.data = void payload.data;

      // return (state.data = {
      //   ...state.data,
      //   payload,
      // });

      // return payload.data;
      state.data.posts[index] = {
        ...state.data.posts[index],
        ...payload,
      };
    },
    [likeMemoryPost.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [getPostBySearch.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getPostBySearch.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [getPostBySearch.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default postReducer.reducer;
