import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({ baseURL: "https://hash-insta.herokuapp.com" })

API.interceptors.request.use((req) => {
    if (Cookies.get("--t")) {
        req.headers.Authorization = `Bearer ${Cookies.get('--t')}`;
    }
    return req;
})

export const login = (formdata) => API.post("/login/signin", formdata)
export const signup = (formdata) => API.post("/login/signup", formdata)
export const activate = (formdata) => API.post("/login/activate", formdata)
export const getAllUsers = () => API.get("/login/signup")
export const create = (formdata) => API.post("/post/create", formdata)
export const likePost = (formdata) => API.put("/post/like", formdata)
export const commentPost = (formdata) => API.put("/post/comment", formdata)
export const unlikePost = (formdata) => API.put("/post/unlike", formdata)
export const getPosts = () => API.get("/post/all")
export const getFollowPosts = () => API.get("/post/follow")
export const getMyPosts = () => API.get("/post/mypost")
export const getMyProfile = () => API.get("/user/profile")
export const follow = (formdata) => API.put("/user/follow", formdata)
export const unfollow = (formdata) => API.put("/user/unfollow", formdata)
export const getProfile = (id) => API.get(`/user/${id}`)
export const EditProfile = (formdata) => API.patch("/user/profile", formdata)
export const deletePost = (formdata) => API.put("/post/one", formdata)