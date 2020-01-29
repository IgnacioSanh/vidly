import React from "react";

const LikeButton = ({ movieLiked, like }) => {
  let heartClass = "fa fa-heart";
  if (!movieLiked) heartClass = "fa fa-heart-o";
  return (
    <i className={heartClass} onClick={like} style={{ cursor: "pointer" }}></i>
  );
};

export default LikeButton;
