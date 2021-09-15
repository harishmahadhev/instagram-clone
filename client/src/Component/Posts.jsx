import React from "react";
import "../App.css";
export default function Posts({ myPosts }) {
  return (
    <div className="postList row">
      {myPosts.length !== 0 ? (
        myPosts.map((post, i) => (
          <div key={i} className="postItem col-sm-12 col-md-4">
            <img src={post.photo} alt="Post" />
          </div>
        ))
      ) : (
        <div className="postItem col-sm-12 col-md-4"></div>
      )}
    </div>
  );
}
