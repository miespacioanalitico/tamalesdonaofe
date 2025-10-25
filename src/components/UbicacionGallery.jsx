import React, { useState, useEffect } from 'react'

const UBICACIONES = [
  {
    key: 'principal',
    label: 'Sucursal Principal',
    imgs: [
      '/gallery/ubicacion1.jpg',
      '/gallery/ubicacion2.jpg',
      '/gallery/ubicacion3.jpg',
      '/gallery/ubicacion4.jpg'
    ],
    desc: 'Sucursal principal en el corazón de la ciudad. Atención cálida y tradicional.',
    videos: [
      "https://www.youtube.com/embed/abcd1234",
      "https://www.youtube.com/embed/wxyz5678"
    ]
  },
  {
    key: 'sur',
    label: 'Sucursal Sur',
    imgs: [
      '/gallery/ubicacion_sur1.jpg',
      '/gallery/ubicacion_sur2.jpg',
      '/gallery/ubicacion_sur3.jpg',
      '/gallery/ubicacion_sur4.jpg'
    ],
    desc: 'Sucursal en la zona sur, ideal para desayunos familiares y reuniones.',
    videos: [
      "https://www.youtube.com/embed/efgh5678",
      "https://www.youtube.com/embed/ijkl9012"
    ]
  }
]

// Ajusta aquí la altura real de tu header si es diferente
const HEADER_HEIGHT = 64

function UbicacionModal({ ubicacion, onClose }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    function keyHandler(e) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") setIdx(i => (i > 0 ? i - 1 : i))
      if (e.key === "ArrowRight") setIdx(i => (i < ubicacion.imgs.length - 1 ? i + 1 : i))
    }
    window.addEventListener("keydown", keyHandler)
    return () => window.removeEventListener("keydown", keyHandler)
  }, [ubicacion, onClose])

  return (
    <div
      className="fixed left-0 right-0 z-[9999] bg-black/70 flex items-start justify-center"
      style={{ top: HEADER_HEIGHT, bottom: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${ubicacion.label}`}
      tabIndex={-1}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative flex flex-col items-center mt-10"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-800 text-white text-3xl font-bold rounded-full p-4 shadow-lg z-[10000]"
          onClick={onClose}
          aria-label="Cerrar galería"
        >
          ✖
        </button>
        <h3 className="text-xl font-bold text-primary mb-2">{ubicacion.label}</h3>
        <p className="mb-4 text-gray-700 text-center">{ubicacion.desc}</p>
        {/* Imagen principal grande */}
        <img
          src={ubicacion.imgs[idx]}
          alt={`Imagen ubicación ${idx + 1}`}
          className="rounded-xl mb-4 w-full max-h-[350px] object-contain cursor-pointer transition-all duration-300"
          loading="lazy"
          onClick={() => setIdx(idx)}
        />
        {/* Carrusel controles */}
        <div className="flex justify-center gap-2 mb-2">
          <button
            aria-label="Imagen anterior"
            className="btn-animate px-3 py-2 rounded bg-secondary text-primary font-bold text-xl"
            disabled={idx === 0}
            onClick={() => setIdx(i => i - 1)}
          >&lt;</button>
          <span className="px-3 font-bold text-lg">{idx + 1} / {ubicacion.imgs.length}</span>
          <button
            aria-label="Imagen siguiente"
            className="btn-animate px-3 py-2 rounded bg-secondary text-primary font-bold text-xl"
            disabled={idx === ubicacion.imgs.length - 1}
            onClick={() => setIdx(i => i + 1)}
          >&gt;</button>
        </div>
        {/* Miniaturas */}
        {ubicacion.imgs.length > 1 && (
          <div className="flex justify-center gap-2 mb-4">
            {ubicacion.imgs.map((img, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`border-2 rounded-lg w-14 h-14 overflow-hidden transition-all duration-200 ${idx === i ? 'border-accent scale-110' : 'border-gray-300 opacity-80'}`}
                aria-label={`Ver imagen ${i + 1}`}
                style={{ padding: 0 }}
              >
                <img src={img} alt={`Miniatura ${i + 1}`} className="object-cover w-full h-full" loading="lazy" />
              </button>
            ))}
          </div>
        )}
        {/* Videos de YouTube */}
        {ubicacion.videos.length > 0 && (
          <div className="w-full mt-4">
            <h3 className="text-accent font-bold mb-2 text-center text-lg">Videos relacionados</h3>
            <div className="grid grid-cols-1 gap-3 items-center">
              {ubicacion.videos.map((url, i) => (
                <div key={i} className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={url}
                    title={`Video ubicación ${i + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    aria-label={`Video de ubicación ${i + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function UbicacionGallery() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section aria-labelledby="ubicacion-gallery-title" className="mt-8 fade-in">
      <h2 id="ubicacion-gallery-title" className="text-2xl font-bold text-primary mb-6 text-center">Galería de ubicaciones</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {UBICACIONES.map((ubic, i) => (
          <button
            key={ubic.key}
            className="btn-animate bg-primary text-white px-5 py-4 rounded-xl font-semibold shadow hover:bg-accent focus:bg-accent focus:outline-none"
            onClick={() => setOpenIdx(i)}
            aria-haspopup="dialog"
            aria-label={`Ver galería de ${ubic.label}`}
          >
            {ubic.label}
          </button>
        ))}
      </div>
      {openIdx !== null && (
        <UbicacionModal ubicacion={UBICACIONES[openIdx]} onClose={() => setOpenIdx(null)} />
      )}
    </section>
  )
}