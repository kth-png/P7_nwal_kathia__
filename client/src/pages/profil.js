import React, { useContext } from "react";
import Log from "../components/log";
import { UidContext } from "../components/AppContext";

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <h1>UPDATE PAGE</h1>
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
};

export default Profil;
