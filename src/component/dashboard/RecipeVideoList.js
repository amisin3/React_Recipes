import React from "react";
import RecipeVideoItem from "./RecipeVideoItem";

const RecipeVideoList = ({ handleVideoSelect, videos }) => {
  const renderedVideos = videos.map((video) => {
    return (
      <RecipeVideoItem
        key={video.id.videoId}
        video={video}
        handleVideoSelect={handleVideoSelect}
      />
    );
  });

  return <div>{renderedVideos}</div>;
};

export default RecipeVideoList;
