import React, { useContext } from "react";
import PostComponent from "./PostComponent";
import StoryWrapper from "./StoryWrapper";
import { Loading, varCtx } from "./Shared";
import { Link } from "react-router-dom";

export default function Home({ posts, profile, users }) {
  const { loading } = useContext(varCtx);
  return (
    <div className="row ">
      <div className="col-lg-8 col-md-12 col-sm-12">
        <StoryWrapper />
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading type={"spin"} color="black" />
          </div>
        ) : (
          posts.map((post) => (
            <PostComponent
              key={post._id}
              post={post ? post : null}
              profile={profile ? profile : null}
            />
          ))
        )}
      </div>
      <div className="homeRight col-lg-4 col-sm-6">
        <div className="homeSuggestion row align-items-center ">
          <div className="homeProfile col-3">
            <img
              src={profile.profile ? profile.profile.pic : null}
              alt="Profile"
            />
          </div>
          <div className="col-6">
            <h6 className="card-title m-0">
              {profile.profile ? profile.profile.name : null}
            </h6>
            <div className="m-0">
              <small className="text-muted">
                {profile.profile ? profile.profile.email : null}
              </small>
            </div>
          </div>
        </div>
        <div className="row ">
          <small className="col-9 text-secondary">Suggestions for you</small>
          <small className="col-3 "></small>
        </div>
        {users
          .filter((user) => user._id !== profile.profile._id)
          .map((user) => (
            <div key={user._id} className="row mt-2 align-items-center">
              <div className="homeSuggestionProfile col-3">
                <img
                  src={user.pic}
                  alt="Profile"
                  style={{ objectPosition: "center" }}
                />
              </div>
              <div className="col-6">
                <Link to={`/app/profile/${user._id}`}>
                  <small>{user.name}</small>
                </Link>
                <div className="m-0 text-secondary">
                  <small>New to instagram</small>
                </div>
              </div>
              <small
                style={{ userSelect: "none" }}
                className="col-3 text-primary"
              >
                {user.followers.includes(profile.profile._id)
                  ? "Following"
                  : "Follow"}
              </small>
            </div>
          ))}
      </div>
    </div>
  );
}
