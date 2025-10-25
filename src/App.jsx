// UBICACIÓN: src/App.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
// --- Hooks y Lógica Central ---
import useNavigation from './hooks/useNavigation';
// --- Componentes ---
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import UbicacionGallery from './components/UbicacionGallery'; // <--- RUTA CORREGIDA
import Comments from './components/Comments';
import ContactForm from './components/ContactForm';
import FloatingButtons from './components/FloatingButtons';
import BackgroundSelector from './components/BackgroundSelector';
import AudioPlayer from './components/AudioPlayer';
import ChatbotGemini from './components/ChatbotGemini';
import Footer from './components/Footer'; // Importación de nuevo componente

// Mapeo de secciones a sus componentes
const SECTIONS = {
  hero: <Hero />,
  galeria: <Gallery />,
  ubicacion: <UbicacionGallery />,
  comentarios: <Comments />,
  contacto: <ContactForm />
};

export default function App() {
  const [section, setSection] = useNavigation(); // Usamos el hook de navegación
  const [bg, setBg] = React.useState('bgTamales');

  // SEO config
  const SEO = {
    title: "Tamales doña Ofe - Tamales, atole y café casero en CDMX",
    description: "Tamales doña Ofe: Tamal de verde, mole rojo, rajas, atole, café y torta de tamal. Sabor mexicano tradicional, calidad y atención.",
    keywords: "tamales, atole, café, torta de tamal, mole rojo, rajas, verde, CDMX, comida mexicana, desayuno",
    url: "https://tamales-dona-ofe.vercel.app",
    image: "/logo.png"
  };

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
      
      {/* Elementos fijos y de fondo */}
      <AudioPlayer />
      <BackgroundSelector setBg={setBg} />

      {/* Contenido principal */}
      <Header setSection={setSection} section={section} />
      <main className="fade-in pt-4 pb-16 px-2 md:px-4 max-w-7xl mx-auto">
        {SECTIONS[section]}
      </main>
      <FloatingButtons setSection={setSection} />
      <ChatbotGemini />
      <Footer />
    </div>
  );
}
