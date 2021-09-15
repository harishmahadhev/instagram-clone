/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import Footer from "./Footer";
import Posts from "./Posts";
import * as api from "../api/Api";
import { useParams } from "react-router";
import { Loading, varCtx } from "./Shared";

export default function OtherProfile({ following }) {
  const [activeTab, setActiveTab] = useState(1);
  const [profile, setProfile] = useState([]);
  const [isFollow, setisFollow] = useState();
  const [followers, setFollowers] = useState(0);
  const { loading, setLoading } = useContext(varCtx);
  const { id } = useParams();

  const handleChange = (index) => {
    setActiveTab(index);
  };

  const getProfile = async (id) => {
    const { data } = await api.getProfile(id);
    setProfile(data);
    setisFollow(following.includes(data.user._id));
    setFollowers(data.user.followers.length);
  };

  const handleFollow = async (id) => {
    if (isFollow) {
      await api.unfollow({ id });
      setisFollow(false);
      setFollowers(followers - 1);
    } else {
      await api.follow({ id });
      setisFollow(true);
      setFollowers(followers + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    getProfile(id);
    setLoading(false);
  }, []);

  return loading ? (
    <Loading color="black" type="spin" />
  ) : (
    <div className="profile">
      <main>
        <div className="profileTop row">
          <div className="profileTopLeft col-sm-12 m-3">
            <div className="profilePicture">
              <img src={profile.user ? profile.user.pic : null} alt="Profile" />
            </div>
          </div>
          <div className="profileTopRight col-sm-12 m-3">
            <div className="profileTopRightOne">
              <h1>{profile.user ? profile.user.name : null}</h1>
              <div
                className="profileFollow"
                onClick={() => handleFollow(profile.user._id)}
              >
                {isFollow ? "Unfollow" : "Follow"}
              </div>
            </div>
            <div className="profileTopRightTwo">
              <div>
                <span>{profile.posts ? profile.posts.length : null}</span>
                {profile.posts
                  ? profile.posts.length > 1
                    ? " posts"
                    : " post"
                  : null}
              </div>
              <div>
                <span> {followers}</span> followers
              </div>
              <div>
                <span>
                  {profile.user ? profile.user.following.length : null}
                </span>{" "}
                following
              </div>
            </div>
          </div>
        </div>
        <div className="profileMiddle">
          <div className="profileStory">
            <img
              className="StoryPicture"
              src="https://media-exp1.licdn.com/dms/image/C4D1BAQGGdNo6IlDOCQ/company-background_10000/0/1519801807380?e=2159024400&v=beta&t=VWHuXHsmYAXZB4XQn7H63FLLvHjjMfs6CdxCh3HwcCM"
              alt=""
            />
            <div className="StoryText">Travel ❤ </div>
          </div>
        </div>
        <div className="profileBottom">
          <div className="postHeader">
            <ul>
              <li
                className={`postHeaderItem ${activeTab === 1 ? "active" : ""}`}
                onClick={() => handleChange(1)}
              >
                <i
                  className={`bi bi-grid-3x3 ${
                    activeTab === 1 ? "active" : ""
                  }`}
                ></i>{" "}
                Posts
              </li>
              <li
                className={`postHeaderItem ${activeTab === 2 ? "active" : ""}`}
                onClick={() => handleChange(2)}
              >
                <i
                  className={`bi bi-tv  ${activeTab === 2 ? "active" : ""}`}
                ></i>
                IGTV
              </li>
              <li
                className={`postHeaderItem ${activeTab === 3 ? "active" : ""}`}
                onClick={() => handleChange(3)}
              >
                <i
                  className={`bi bi-bookmark  ${
                    activeTab === 3 ? "active" : ""
                  }`}
                ></i>
                SAVED
              </li>
              <li
                className={`postHeaderItem ${activeTab === 4 ? "active" : ""}`}
                onClick={() => handleChange(4)}
              >
                <i
                  className={`bi bi-person-badge  ${
                    activeTab === 4 ? "active" : ""
                  }`}
                ></i>
                TAGGED
              </li>
            </ul>
          </div>
          {activeTab === 1 ? (
            profile.posts ? (
              <Posts myPosts={profile.posts} />
            ) : null
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
