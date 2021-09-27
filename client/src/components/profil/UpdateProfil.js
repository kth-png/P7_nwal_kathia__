import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateBio } from "../../actions/user.actions";
import LeftNav from "../LeftNav";
import { dateParser } from "../Utils";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (bio) {
      dispatch(updateBio(userData._id, bio));
    }
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de {userData.pseudo} </h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier votre bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider la modification</button>
              </>
            )}
          </div>
          <h4>Inscrit depuis le : {dateParser(userData.createdAt)}</h4>
        </div>
      </div>
      <div
        className="delete-container"
        onClick={() => {
          if (window.confirm("voulez vous supprimer le profil?")) {
            deleteUser(userData._id);
            // window.location = "./";
          }
        }}
      >
        <img src="./img/icons/trash.svg" alt="trash" />
      </div>
    </div>
  );
};

export default UpdateProfil;
