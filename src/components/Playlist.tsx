import React from 'react';

export const Playlist = React.memo(() => {
    const playlistId = "PLav9e3k2FdJw3l22fZxev7kaeR4x_tHGn";

    return (
        <div className="relative w-full pb-[56.25%]">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&loop=1&mute=1&vq=hd1080`}
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen; accelerometer; gyroscope"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Playlist em loop"
                style={{
                    objectFit: 'cover',
                }}
            />
        </div>
    );
});
