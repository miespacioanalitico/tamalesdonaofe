import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Importamos los plugins de PostCSS que Tailwind necesita
// para funcionar en el entorno de build de producción (Vercel).
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Agregamos la configuración de PostCSS para que Tailwind sepa
  // dónde buscar las clases en los archivos de la aplicación.
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          // Ruta a los archivos que contienen clases de Tailwind.
          // CRÍTICO para que Vercel genere el CSS final.
          content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
        }),
        autoprefixer(),
      ],
    },
  },
});
