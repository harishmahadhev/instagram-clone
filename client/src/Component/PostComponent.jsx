import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../api/Api";
import { refreshPage } from "./Shared";

function PostComponent({ post, profile }) {
  const [likes, setLikes] = useState(post.likes);
  const [comment, setComment] = useState(post.comments);
  const [text, setText] = useState("");
  const likePost = async (id) => {
    const { data } = await api.likePost({ id });
    setLikes(data.message.likes);
  };

  const unlikePost = async (id) => {
    const { data } = await api.unlikePost({ id });
    setLikes(data.message.likes);
  };

  const makeComment = async (text, id) => {
    const { data } = await api.commentPost({ id, text });
    setComment(data.message.comments);
    setText("");
  };

  const deletePost = async (id) => {
    await api.deletePost({ id });
    refreshPage();
  };

  const handleClick = (id) => {
    if (likes.includes(profile.profile._id)) {
      unlikePost(id);
    } else {
      likePost(id);
    }
  };

  return (
    <div className="postComponent card m-3">
      <section className="postComponentTitle">
        <div className="col-1 postProfilePicture">
          <img
            src={
              post.postedby.pic
                ? post.postedby.pic
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
          />
        </div>
        <div className="col-9 postProfileName">
          <Link
            to={
              post.postedby._id === profile.profile._id
                ? `/app/profile`
                : `/app/profile/${post.postedby._id}`
            }
          >
            {post.postedby.name}
          </Link>
          <div className="postLocation">{post.location}</div>
        </div>
        {post.postedby._id === profile.profile._id ? (
          <div className="postComponentRight col-1 col-sm-4">
            <i
              className="fa fa-trash active"
              aria-hidden="true"
              onClick={() => deletePost(post._id)}
            ></i>
          </div>
        ) : (
          <div className="postComponentRight">
            {profile.profile.following.includes(post.postedby._id)
              ? "Following"
              : "Follow"}
          </div>
        )}
      </section>
      <section className="postPicture">
        <img src={post.photo} alt="" width="100%" height="70%" />
      </section>
      <section className="row p-2 align-items-center">
        <div className="postLeftIcons col-10">
          <i
            className={
              likes.includes(profile.profile._id)
                ? "bi bi-heart-fill"
                : "bi bi-heart active"
            }
            onClick={() => handleClick(post._id)}
          ></i>
          <i className="bi bi-chat active"></i>
        </div>
      </section>
      <section>
        <div className="postBody">
          {likes.length === 0 ? null : <div>{likes.length} likes</div>}
          <span className="postProfileName">
            {post.postedby.name}
            <span className="postBodyDescription">{post.body}</span>
          </span>
        </div>
      </section>
      <hr />
      <section className="showComment">
        {comment.map((comment, i) => (
          <div key={i} className="postProfileName">
            {comment.postedby.name}
            <span className="postBodyDescription">{comment.text}</span>
          </div>
        ))}
      </section>

      <section className="postComment row m-1 align-items-center">
        <div className="icon col-1">
          <i className="bi bi-emoji-smile active"></i>
        </div>
        <div className="col-9">
          <input
            type="text"
            name="comment"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button
          className="col-2"
          disabled={text ? false : true}
          onClick={() => {
            makeComment(text, post._id);
          }}
        >
          Post
        </button>
      </section>
    </div>
  );
}

export default PostComponent;
