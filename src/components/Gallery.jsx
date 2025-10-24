// src/components/Gallery.jsx
import React, { useState } from 'react'
import ProductGallery from './ProductGallery'
import { PRODUCTS } from '../data/constants' // Importamos las constantes de productos

export default function Gallery() {
  const [openIdx, setOpenIdx] = useState(null)
  
  // Usamos un array con las claves de los productos principales (ej. tamales y atole)
  const mainProductsKeys = ['verde', 'mole', 'rajas', 'atole', 'torta'];
  const mainProducts = PRODUCTS.filter(p => mainProductsKeys.includes(p.key));

  // Función para abrir la galería y obtener el producto correcto
  const handleOpenGallery = (key) => {
    const index = PRODUCTS.findIndex(p => p.key === key);
    if (index !== -1) {
      setOpenIdx(index);
    }
  }

  return (
    <section aria-labelledby="gallery-title" className="mt-8 fade-in">
      <h2 id="gallery-title" className="text-3xl font-bold text-primary mb-6 text-center border-b-2 border-accent pb-2">
        Nuestro Menú Estrella 🌟
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {mainProducts.map((prod) => (
          <button
            key={prod.key}
            className="btn-animate bg-primary text-white px-5 py-4 rounded-xl font-semibold shadow-lg hover:bg-accent focus:bg-accent focus:outline-none text-lg transition-all duration-300"
            onClick={() => handleOpenGallery(prod.key)}
            aria-haspopup="dialog"
            aria-label={`Ver detalles y galería de ${prod.label}`}
          >
            {prod.label}
          </button>
        ))}
      </div>
      
      {/* Pasamos el objeto del producto completo a ProductGallery */}
      {openIdx !== null && (
        <ProductGallery
          product={PRODUCTS[openIdx]} // Pasamos el objeto completo
          onClose={() => setOpenIdx(null)}
        />
      )}
    </section>
  )
}
