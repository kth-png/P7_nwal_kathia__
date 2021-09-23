import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../actions/user.actions";

const DeleteProfil = (props) => {
  const dispatch = useDispatch;
  const deleteProfile = dispatch(deleteUser(props.id));
  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce profil ?")) {
          deleteProfile();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
  );
};

export default DeleteProfil;
