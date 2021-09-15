import React, { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import Footer from "./Footer";
import { Loading, refreshPage, varCtx } from "./Shared";
import * as api from "../api/Api";

export default function CreatePost() {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const { loading, setLoading } = useContext(varCtx);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  const images = files.map((file) => (
    <div key={file.name}>
      <div className="postImagefile">
        <img src={file.preview} alt="preview" />
      </div>
    </div>
  ));

  const postDetails = async (body, location) => {
    try {
      const img = new FormData();
      img.append("file", files[0]);
      img.append("upload_preset", "insta-clone");
      img.append("cloud_name", "harishmahadhev");
      setLoading(true);
      const uploadUrl = await fetch(
        "	https://api.cloudinary.com/v1_1/harishmahadhev/image/upload",
        {
          method: "POST",
          body: img,
        }
      ).then((res) => res.json());
      await api.create({ location, body, image: uploadUrl.secure_url });
      setLoading(false);
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="createPost">
      <h1 className="createPostTitle">Add a new Post</h1>
      {files.length === 0 ? (
        <div className="getPostImage" {...getRootProps()}>
          <input type="file" {...getInputProps()} />
          <i className="bi bi-plus-lg"></i>
          <p>Drop files here</p>
        </div>
      ) : (
        images
      )}
      <div className="getPostDetails">
        <label htmlFor="body">Description *</label>
        <input
          type="text"
          name="body"
          placeholder="Write a caption.."
          autoComplete="off"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          placeholder="Add Location"
          autoComplete="off"
          onChange={(e) => setLocation(e.target.value)}
        />
        {loading ? (
          <div>
            <Loading color="black" />
          </div>
        ) : (
          <button
            type="submit"
            className="createPostButton"
            onClick={() => {
              postDetails(description, location);
            }}
          >
            Upload
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}
