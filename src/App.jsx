// src/App.jsx
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Header from './components/Header'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import ProductGallery from './components/ProductGallery' // Se mantiene la importación aunque se mueva la lógica del modal
import UbicacionGallery from './components/UbicacionGallery'
import Comments from './components/Comments'
import ContactForm from './components/ContactForm'
import FloatingButtons from './components/FloatingButtons'
import BackgroundSelector from './components/BackgroundSelector'
import AudioPlayer from './components/AudioPlayer'
import ChatbotGemini from './components/ChatbotGemini'
import Footer from './components/Footer' // Lo añadiremos en el siguiente paso

// Importamos el hook de navegación
import { useNavigation } from './hooks/useNavigation';

const SECTIONS = {
  hero: <Hero />,
  galeria: <Gallery />,
  productos: <Gallery />, // Usamos el mismo componente para ambos fines
  ubicacion: <UbicacionGallery />,
  comentarios: <Comments />,
  contacto: <ContactForm />
}

export default function App() {
  // Usamos el nuevo hook para manejar la navegación
  const [section, navigateTo] = useNavigation(); 
  const [bg, setBg] = useState('bgTamales')

  // SEO config
  const SEO = {
    title: "Tamales doña Ofe - Tamales, atole y café casero en CDMX",
    description: "Tamales doña Ofe: Tamal de verde, mole rojo, rajas, atole, café y torta de tamal. Sabor mexicano tradicional, calidad y atención.",
    keywords: "tamales, atole, café, torta de tamal, mole rojo, rajas, verde, CDMX, comida mexicana, desayuno",
    url: "https://tamales-dona-ofe.vercel.app",
    image: "/logo.png"
  }

  return (
    <div className={`min-h-screen font-tamal transition-all duration-500 ${bg} relative`}>
      <Helmet>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <meta name="keywords" content={SEO.keywords} />
        <meta name="author" content="Tamales doña Ofe" />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SEO.url} />
        <meta property="og:image" content={SEO.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.title} />
        <meta name="twitter:description" content={SEO.description} />
        <meta name="twitter:image" content={SEO.image} />
        <html lang="es" />
      </Helmet>
      <AudioPlayer />
      {/* Pasamos la función navigateTo en lugar de setSection */}
      <Header setSection={navigateTo} section={section} />
      <BackgroundSelector setBg={setBg} />
      <main className="fade-in pt-4 pb-16 px-2 md:px-4">
        {/* El componente actual se envuelve en un div con su ID para el Hash Link */}
        <div id={section}>
          {SECTIONS[section]}
        </div>
      </main>
      <FloatingButtons />
      <ChatbotGemini />
      {/* <Footer /> */}
    </div>
  )
}
