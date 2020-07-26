import React from "react";

const RecipeVideoItem = ({ video, handleSelectVideo }) => {
  return (
    <div onClick={() => handleSelectVideo(video)}>
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.description}
      />
      <div className="content">
        <div className="header">{video.snippet.title}</div>
      </div>
    </div>
  );
};

export default RecipeVideoItem;
