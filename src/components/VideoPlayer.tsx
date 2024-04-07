import React from "react";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  return (
    <div className="relative">
      <iframe
        loading="lazy"
        title="Video Player"
        className="w-full h-40 md:w-1/2 md:h-80 mx-auto"
        src={src}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
