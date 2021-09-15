import React, { useContext, useState } from "react";
import { Loading, refreshPage, varCtx } from "./Shared";
import * as api from "../api/Api";
import { useDropzone } from "react-dropzone";

export default function EditProfile({ profile }) {
  const [files, setFiles] = useState([]);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(profile.profile.name);
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

  const postDetails = async (name) => {
    try {
      const img = new FormData();
      img.append("file", files[0]);
      img.append("upload_preset", "insta-clone");
      img.append("cloud_name", "harishmahadhev");
      setLoading(true);

      const uploadUrl = await fetch(
        "https://api.cloudinary.com/v1_1/harishmahadhev/image/upload/",
        {
          method: "POST",
          body: img,
        }
      )
        .then((res) => res.json())
        .catch((e) => console.log(e));
      await api.EditProfile({ name, image: uploadUrl.secure_url });
      setLoading(false);
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  };

  const images = files.map((file) => (
    <img key={file.name} src={file.preview} alt="preview" />
  ));

  return (
    <div className="editProfile card">
      <div className="editProfileHead">
        {files.length === 0 ? <img src={profile.profile.pic} alt="" /> : images}
        <div className="editProfileHeadLeft">
          {edit ? (
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              defaultValue={profile.profile.name}
            />
          ) : (
            <div>
              {profile ? profile.profile.name : null}
              <div
                className="editProfileHeadUpload"
                onClick={() => setEdit((on) => !on)}
              >
                Edit Name
              </div>
            </div>
          )}
          <div className="editProfileHeadUpload" {...getRootProps()}>
            Change Profile picture
            <input type="file" {...getInputProps()} />
          </div>
        </div>
      </div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loading color="black" />
        </div>
      ) : (
        <button onClick={() => postDetails(name)}>Edit</button>
      )}
    </div>
  );
}
