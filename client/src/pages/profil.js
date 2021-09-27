import React, { useContext, useEffect, useState } from "react";
import Log from "../components/log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/profil/UpdateProfil";
import { isEmpty } from "../components/Utils";
import { useDispatch, useSelector } from "react-redux";
//import UserCard from "../components/profil/UserCard";
import { getUsers } from "../actions/users.actions";
import { deleteUser } from "../actions/user.actions";

const Profil = () => {
  const uid = useContext(UidContext);
  const adminId = "614c3ff73ad1285c0c446638";
  const users = useSelector((state) => state.usersReducer);
  const [loadUser, setLoadUser] = useState(true);
  const dispatch = useDispatch();

  const deleteProfile = () => {
    dispatch(deleteUser());
  };

  useEffect(() => {
    if (loadUser) {
      dispatch(getUsers());
      setLoadUser(false);
    }
  }, [loadUser, dispatch]);

  if (uid !== adminId) {
    return (
      <div className="profil-page">
        {uid ? (
          <UpdateProfil />
        ) : (
          <div className="log-container">
            <Log signin={false} signup={true} />
            <div className="img-container">
              <img src="./img/log.svg" alt="" />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="profil-page">
        <ul>
          {!isEmpty(users[0]) &&
            users.map((user) => {
              return (
                <li className="card-container">
                  <div className="card-left">
                    <img src={user.picture} alt="user pic" />
                  </div>
                  <div className="card-right">
                    <div className="pseudo">
                      <h3>{user.pseudo}</h3>
                    </div>
                  </div>
                  <div className="button-container">
                    <div
                      className="btn"
                      id={user._id}
                      onClick={deleteProfile()}
                    >
                      Supprimer le profil
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
};

export default Profil;
