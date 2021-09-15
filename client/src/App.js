import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Component/Navbar'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Home from './Component/Home';
import Profile from './Component/Profile';
import CreatePost from './Component/CreatePost';
import { varCtx } from './Component/Shared';
import * as api from "./api/Api";
import EditProfile from './Component/EditProfile';
import OtherProfile from './Component/OtherProfile';

export default function App() {
  const { setLoading } = useContext(varCtx);
  const [posts, setPosts] = useState([]);
  const [myposts, setMyposts] = useState([]);
  const [profile, setProfile] = useState([]);
  const [users, setUsers] = useState([]);

  const getAPIs = async () => {
    setLoading(true);
    const posts = await api.getPosts();
    setPosts(posts.data);
    const profile = await api.getMyProfile();
    setProfile(profile.data);
    const myposts = await api.getMyPosts();
    setMyposts(myposts.data);
    const allusers = await api.getAllUsers();
    setUsers(allusers.data)
    setLoading(false);
  };

  useEffect(() => {
    getAPIs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="app">
      <Navbar profile={profile} />
      <div className="container">
        <Switch>
          <Route path="/app/home" ><Home posts={posts} users={users} profile={profile} /></Route>
          <Route exact path="/app/profile" ><Profile myposts={myposts} profile={profile} /></Route>
          <Route path="/app/profile/:id" ><OtherProfile Cur_id={profile.profile ? profile.profile._id : null} following={profile.profile ? profile.profile.following : null} /></Route>
          <Route path="/app/create" component={CreatePost}></Route>
          <Route path="/app/edit" ><EditProfile profile={profile} /> </Route>
        </Switch>
      </div>
    </div>
  )
}
