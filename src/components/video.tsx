import React from 'react';

export const Video = React.memo(() => {
    console.log("Componente Video renderizado");

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/fDOIQWzCm8A?autoplay=1&mute=1&loop=1&rel=0" // Adicionando todos os parâmetros necessários
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video"
            />
        </div>
    );
});
