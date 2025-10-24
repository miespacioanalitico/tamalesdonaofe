// src/data/constants.js

// --- CONFIGURACIÓN DE NAVEGACIÓN ---
export const NAVS = [
  { key: 'hero', label: 'Inicio', icon: '🏠' },
  { key: 'productos', label: 'Menú y Galería', icon: '🥟' },
  { key: 'ubicacion', label: 'Ubicación', icon: '📍' },
  { key: 'comentarios', label: 'Testimonios', icon: '⭐' },
  { key: 'contacto', label: 'Contacto y Pedido', icon: '📞' }
];

// --- PRODUCTOS ---
export const PRODUCTS = [
  {
    key: 'verde',
    label: 'Tamal de Cerdo en Salsa Verde',
    price: 25, // Precio actualizado (ejemplo)
    desc: 'Rico y delicioso tamal de verde preparado con ingredientes de calidad para tu disfrute. (Picor ligero)',
    imgs: [
      '/gallery/verde1.jpg',
      '/gallery/verde2.jpg',
      '/gallery/verde3.jpg',
      '/gallery/verde4.jpg'
    ],
    videos: [
      "https://www.youtube.com/embed/5Z4s5n6V8F8?si=J7b9P6s8R-6C1Z4W", // URL de ejemplo actualizada
      "https://www.youtube.com/embed/7hR6lHMvKTo?si=Fw1p-e3sB0Y4yP5f"
    ]
  },
  {
    key: 'mole',
    label: 'Tamal de Pollo en Mole Rojo',
    price: 25,
    desc: 'Sabroso tamal de mole rojo, un clásico mexicano que deleita al paladar. Sabor profundo y ligeramente dulce.',
    imgs: [
      '/gallery/mole1.jpg',
      '/gallery/mole2.jpg',
      '/gallery/mole3.jpg',
      '/gallery/mole4.jpg'
    ],
    videos: [
      "https://www.youtube.com/embed/1K7k7QjAChg?si=TzD2m9T8sQzC4T7e",
      "https://www.youtube.com/embed/GbQ4O8ZL9RY?si=9l-3R7nN6Vd0w8Jd"
    ]
  },
  {
    key: 'rajas',
    label: 'Tamal de Queso y Rajas',
    price: 25,
    desc: 'Tamal de rajas con queso Oaxaca, suave y picante, preparado para los amantes del sabor tradicional. (Vegetariano)',
    imgs: [
      '/gallery/rajas1.jpg',
      '/gallery/rajas2.jpg',
      '/gallery/rajas3.jpg',
      '/gallery/rajas4.jpg'
    ],
    videos: [
      "https://www.youtube.com/embed/Vx3U0h4kOUs?si=P2s-Yn-8t4N-L3bK",
      "https://www.youtube.com/embed/KbQ1fJQ2A9E?si=B5w8hJc6Y2zY7w0b"
    ]
  },
  {
    key: 'atole',
    label: 'Atole de Vainilla',
    price: 19,
    desc: 'Atole casero, cremoso y reconfortante, perfecto acompañante para tu tamal. Servido caliente.',
    imgs: [
      '/gallery/atole1.jpg',
      '/gallery/atole2.jpg',
      '/gallery/atole3.jpg',
      '/gallery/atole4.jpg'
    ],
    videos: [
      "https://www.youtube.com/embed/2rG0gM4Lh8c?si=B4b5N9Ym7gP9m7G2",
      "https://www.youtube.com/embed/MpJ8vQp1x8g?si=S1vW2oXq2Z7k9hN8"
    ]
  },
  {
    key: 'torta',
    label: 'Torta de Tamal (Guajolota)',
    price: 35,
    desc: 'Torta de tamal, combinación única y deliciosa para saciar tu antojo. Elige tu sabor de tamal.',
    imgs: [
      '/gallery/torta1.jpg',
      '/gallery/torta2.jpg',
      '/gallery/torta3.jpg',
      '/gallery/torta4.jpg'
    ],
    videos: [
      "https://www.youtube.com/embed/UhR1vF9gF8c?si=X9k2l5j5MvB7y9sS",
      "https://www.youtube.com/embed/6yW6jQqQ9A8?si=W8g9D8y2gP1hX7eD"
    ]
  }
];

// --- UBICACIONES (Se mantienen en UbicacionGallery.jsx ya que son datos de presentación) ---

// --- TESTIMONIOS (Serán dinámicos, por lo que las constantes estarán en Comments.jsx) ---
