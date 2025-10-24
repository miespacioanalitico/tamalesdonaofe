// src/components/AudioPlayer.jsx
import React, { useEffect, useRef, useState } from 'react'

export default function AudioPlayer() {
  const ref = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false);

  // Intentar reproducir al cargar y al interactuar
  useEffect(() => {
    const audio = ref.current;
    
    // Función para intentar la reproducción automática (puede fallar por políticas del navegador)
    const playAudio = () => {
      if (audio) {
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setIsReady(true);
          })
          .catch(error => {
            // Error común si el usuario no ha interactuado con la página (política de navegadores)
            console.info("Autoplay bloqueado. El usuario debe interactuar para reproducir el audio.");
            setIsPlaying(false);
            setIsReady(true); // Está listo, pero pausado
          });
      }
    };
    
    // Intentar reproducir inmediatamente
    playAudio();

    // Listener para asegurar la reproducción con la primera interacción del usuario
    const handleInteraction = () => {
        if (audio && !isPlaying) {
            playAudio();
            document.removeEventListener('click', handleInteraction);
        }
    };
    
    document.addEventListener('click', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = ref.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!isReady) {
    // No mostrar el botón hasta saber el estado inicial
    return null;
  }

  return (
    <>
      <audio
        ref={ref}
        src="/bg-music.mp3"
        loop
        controls={false}
        aria-label="Música de fondo"
        style={{ display: 'none' }}
      />
      {/* Botón flotante para el control de audio */}
      <button
        onClick={togglePlay}
        className="fixed left-6 bottom-28 z-50 bg-primary text-white p-3 rounded-full shadow-lg btn-animate hover:bg-accent focus:bg-accent transition-all duration-300 transform hover:scale-110"
        aria-label={isPlaying ? "Pausar música de fondo" : "Reproducir música de fondo"}
        title={isPlaying ? "Música: Reproduciendo" : "Música: Pausada"}
      >
        {/* Iconos de Lucide: Pause (||) o Play (>) */}
        {isPlaying ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 3l14 9-14 9V3z"></path></svg>
        )}
      </button>
    </>
  )
}
