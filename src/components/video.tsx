import React from "react";

export const Video = React.memo(() => {
  const videoId = "fDOIQWzCm8A";

 const src =
  `https://www.youtube.com/embed/${videoId}` +
  `?autoplay=1&loop=1&playlist=${videoId}` +
  `&mute=1&controls=0&rel=0` +
  `&playsinline=1&fs=0&disablekb=1` +
  `&iv_load_policy=3` +
  `&cc_load_policy=0&hl=pt`

  return (
    <div className="relative w-full pb-[56.25%] bg-black overflow-hidden">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={src}
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Vídeo institucional"
      />
    </div>
  );
});
