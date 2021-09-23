import React from "react";
import { useSelector } from "react-redux";
import LeftNav from "../components/LeftNav";
import Card from "../components/post/Card";
import NewPostForm from "../components/post/NewPostForm";
import { isEmpty } from "../components/Utils";

const Trending = () => {
  const trendList = useSelector((state) => state.trendingReducer);

  return (
    <div className="trending-page">
      <LeftNav />
      <div className="main">
        <ul>
          {!isEmpty(trendList[0]) &&
            trendList.map((post) => <Card post={post} key={post._id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <NewPostForm />
        </div>
      </div>
    </div>
  );
};

export default Trending;
