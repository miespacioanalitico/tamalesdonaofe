// src/data/constants.js

// ----------------------------------------------------------------------
// 1. Configuración de Navegación (NAVS)
// ----------------------------------------------------------------------
export const NAVS = [
  { key: 'hero', label: 'Inicio', target: '#inicio' },
  { key: 'galeria', label: 'Galería', target: '#galeria' },
  { key: 'productos', label: 'Productos', target: '#productos' },
  { key: 'ubicacion', label: 'Ubicación', target: '#ubicacion' },
  { key: 'comentarios', label: 'Testimonios', target: '#testimonios' }, // Renombrado a Testimonios
  { key: 'contacto', label: 'Contacto', target: '#contacto' }
];

// ----------------------------------------------------------------------
// 2. Data de Productos (PRODUCTS)
// ----------------------------------------------------------------------
export const PRODUCTS = [
  {
    key: 'verde',
    label: 'Tamal de Pollo en Salsa Verde 🌶️',
    price: 25, // Precio ficticio, ajústelo si es necesario
    imgs: [
      '/gallery/verde1.jpg',
      '/gallery/verde2.jpg',
      '/gallery/verde3.jpg',
      '/gallery/verde4.jpg'
    ],
    desc: 'El clásico y favorito de la casa. Rico y delicioso tamal de pollo en salsa verde, con un toque picante.',
    videos: [
      "https://www.youtube.com/embed/5Z4s5n6V8F8",
      "https://www.youtube.com/embed/7hR6lHMvKTo"
    ]
  },
  {
    key: 'mole',
    label: 'Tamal de Pollo en Mole Rojo 🍫',
    price: 25,
    imgs: [
      '/gallery/mole1.jpg',
      '/gallery/mole2.jpg',
      '/gallery/mole3.jpg',
      '/gallery/mole4.jpg'
    ],
    desc: 'Sabroso tamal de mole rojo, un clásico mexicano con un sabor dulce y profundo que deleita al paladar.',
    videos: [
      "https://www.youtube.com/embed/1K7k7QjAChg",
      "https://www.youtube.com/embed/GbQ4O8ZL9RY"
    ]
  },
  {
    key: 'rajas',
    label: 'Tamal de Queso y Rajas 🧀🌶️',
    price: 25,
    imgs: [
      '/gallery/rajas1.jpg',
      '/gallery/rajas2.jpg',
      '/gallery/rajas3.jpg',
      '/gallery/rajas4.jpg'
    ],
    desc: 'Tamal de rajas con queso, suave y cremoso con el toque picante del chile poblano. Una delicia vegetariana.',
    videos: [
      "https://www.youtube.com/embed/Vx3U0h4kOUs",
      "https://www.youtube.com/embed/KbQ1fJQ2A9E"
    ]
  },
  {
    key: 'atole',
    label: 'Atole de Vainilla y Chocolate ☕',
    price: 19,
    imgs: [
      '/gallery/atole1.jpg',
      '/gallery/atole2.jpg',
      '/gallery/atole3.jpg',
      '/gallery/atole4.jpg'
    ],
    desc: 'Atole casero, cremoso y reconfortante. El acompañante perfecto para cualquier tamal.',
    videos: [
      "https://www.youtube.com/embed/2rG0gM4Lh8c",
      "https://www.youtube.com/embed/MpJ8vQp1x8g"
    ]
  },
  {
    key: 'torta',
    label: 'Torta de Tamal (Guajolota)',
    price: 35,
    imgs: [
      '/gallery/torta1.jpg',
      '/gallery/torta2.jpg',
      '/gallery/torta3.jpg',
      '/gallery/torta4.jpg'
    ],
    desc: 'Torta de tamal, la famosa "Guajolota". Pídelo con el tamal de tu elección. Combinación única y deliciosa.',
    videos: [
      "https://www.youtube.com/embed/UhR1vF9gF8c",
      "https://www.youtube.com/embed/6yW6jQqQ9A8"
    ]
  }
];
