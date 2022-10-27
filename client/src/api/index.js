import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = async (page) => await API.get(`/posts?page=${page}`);

export const fetchPost = async (id) => await API.get(`/posts/${id}`);

export const addNewMemory = async (newPost) =>
  await API.post("/posts", newPost);

export const editPost = async (id, updatePost) =>
  await API.patch(`/posts/${id}`, updatePost);

export const deletePost = async (id) => await API.delete(`/posts/${id}`);

export const likePost = async (id) => await API.patch(`/posts/${id}/likePost`);

export const fetchPostsBySearch = async (searchQuery) =>
  await API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

// Auth
export const signup = async (user) => await API.post("/users/signup", user);

export const signin = async (user) => await API.post("/users/signin", user);
