import React from "react";
import VideoCard from "./VideoCard";

const VideoGallery = ({ videos }) => {
  return (
    <div className="container p-4">
      <div className="row align-items-center">
        {videos.map(() => (
          <div className="col-md-6">
            <VideoCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
