import React from 'react';

export const Video = React.memo(() => {
    const videoId = "fDOIQWzCm8A";
    // jIMC13n1wLU

    return (
        <div className="relative  w-full pb-[56.25%] ">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&vq=hd1080&mute=1`}
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen; accelerometer; gyroscope"

                referrerPolicy="strict-origin-when-cross-origin"
                title="video"
                style={{
                    objectFit: 'cover',
                }}
            />

        </div>
    );
});