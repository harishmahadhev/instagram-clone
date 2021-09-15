import React, { useContext, useState } from "react";
import "../App.css";
import Footer from "./Footer";
import Posts from "./Posts";
import dp from "../images/default.jpg";
import { useHistory } from "react-router";
import { Loading, varCtx } from "./Shared";

export default function Profile({ myposts, profile }) {
  const [activeTab, setActiveTab] = useState(1);
  const history = useHistory();
  const { loading } = useContext(varCtx);
  const handleChange = (index) => {
    setActiveTab(index);
  };
  console.log(profile, myposts);
  return loading ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Loading color="black" type="spin" />
    </div>
  ) : (
    <div className="profile">
      <main>
        <div className="profileTop row">
          <div className="profileTopLeft col-sm-12 m-3">
            <div className="profilePicture">
              <img
                src={profile.profile ? profile.profile.pic : dp}
                alt="Profile"
              />
            </div>
          </div>
          <div className="profileTopRight col-sm-12 m-3">
            <div className="profileTopRightOne col-sm-12">
              <h1>{profile.profile ? profile.profile.name : null}</h1>
              <button onClick={() => history.push("/app/edit")}>
                Edit Profile
              </button>
            </div>
            <div className="profileTopRightTwo col-sm-12">
              <div>
                <span>{myposts.post.length}</span>{" "}
                {myposts.post.length > 1 ? "posts" : "post"}
              </div>
              <div>
                <span>
                  {profile.profile ? profile.profile.followers.length : null}{" "}
                </span>
                followers
              </div>
              <div>
                <span>
                  {profile.profile ? profile.profile.following.length : null}{" "}
                </span>
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
          {activeTab === 1 ? <Posts myPosts={myposts.post} /> : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
