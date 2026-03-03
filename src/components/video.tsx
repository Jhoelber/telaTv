import React from "react";

export const Video = React.memo(() => {
  const videoId = "fDOIQWzCm8A";

  const src =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&loop=1&playlist=${videoId}` +
    `&mute=1&controls=0&modestbranding=1&rel=0` +
    `&playsinline=1&fs=0&disablekb=1`;

  return (
    <div className="relative w-full pb-[56.25%] overflow-hidden bg-black">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={src}
        frameBorder="0"

        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        title="video"
      />
    </div>
  );
});