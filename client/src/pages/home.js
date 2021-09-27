import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/log";
import Trends from "../components/Trends";

const Home = () => {
  const uid = useContext(UidContext);
  //const admin = useContext(AdminContext);

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
