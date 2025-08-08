import React from 'react';

export const Video = React.memo(() => {
    

    return (
           <div className="w-full h-screen flex items-center justify-center bg-black">
            <iframe
                src="https://www.instagram.com/p/DM9GzhQuk5n/embed"
                width="900"
                height="980"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
            />

        </div>
    );
});