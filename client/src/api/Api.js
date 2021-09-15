import axios from "axios";
import Cookies from "js-cookie";

// const axios = axios.create({ baseURL: "https://hash-insta.herokuapp.com" })

axios.interceptors.request.use((req) => {
    if (Cookies.get("--t")) {
        req.headers.Authorization = `Bearer ${Cookies.get('--t')}`;
    }
    return req;
})

export const login = (formdata) => axios.post("/login/signin", formdata)
export const signup = (formdata) => axios.post("/login/signup", formdata)
export const activate = (formdata) => axios.post("/login/activate", formdata)
export const forgot = (formdata) => axios.post("/login/forgot", formdata)
export const reset = (formdata) => axios.post("/login/reset", formdata)
export const getAllUsers = () => axios.get("/login/signup")
export const create = (formdata) => axios.post("/post/create", formdata)
export const likePost = (formdata) => axios.put("/post/like", formdata)
export const commentPost = (formdata) => axios.put("/post/comment", formdata)
export const unlikePost = (formdata) => axios.put("/post/unlike", formdata)
export const getPosts = () => axios.get("/post/all")
export const getFollowPosts = () => axios.get("/post/follow")
export const getMyPosts = () => axios.get("/post/mypost")
export const getMyProfile = () => axios.get("/user/profile")
export const follow = (formdata) => axios.put("/user/follow", formdata)
export const unfollow = (formdata) => axios.put("/user/unfollow", formdata)
export const getProfile = (id) => axios.get(`/user/${id}`)
export const EditProfile = (formdata) => axios.patch("/user/profile", formdata)
export const deletePost = (formdata) => axios.put("/post/one", formdata)