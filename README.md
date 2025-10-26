# Laboratorio 10: Aplicaciones Web con Next.js (SSG, ISR, CSR)

Este proyecto fue desarrollado como parte del laboratorio de la materia **Desarrollo de Aplicaciones Web Avanzado**. La aplicación demuestra el uso de diferentes estrategias de renderizado de Next.js (Static Site Generation, Incremental Static Regeneration y Client-Side Rendering) a través de dos módulos principales: una Pokédex y un directorio de personajes de Rick and Morty.

---

## 🚀 Aplicación Desplegada

Puedes ver la aplicación en funcionamiento en el siguiente enlace:

**[https://rick-and-morty-ypacco.vercel.app/](https://rick-and-morty-ypacco.vercel.app/rick-and-morty)**

### Secciones Principales
- **Pokédex:** [https://rick-and-morty-ypacco.vercel.app/pokemon](https://rick-and-morty-ypacco.vercel.app/pokemon)
- **Directorio de Rick and Morty:** [https://rick-and-morty-ypacco.vercel.app/rick-and-morty](https://rick-and-morty-ypacco.vercel.app/rick-and-morty)

---

## 🛠️ Tecnologías Utilizadas

Este proyecto fue construido utilizando el ecosistema de React y Next.js, con un enfoque en las mejores prácticas de desarrollo web moderno.

*   **[Next.js](https://nextjs.org/)**: Framework de React para producción con renderizado híbrido.
*   **[React](https://react.dev/)**: Librería para construir interfaces de usuario.
*   **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que añade tipado estático.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS "utility-first" para un diseño rápido y responsivo.
*   **[React Icons](https://react-icons.github.io/react-icons/)**: Colección de íconos populares para proyectos de React.
*   **[Vercel](https://vercel.com/)**: Plataforma de despliegue optimizada para Next.js.

---

## 📋 Características Implementadas

### Módulo 1: Pokédex (SSG + ISR)

*   **Lista de Pokémon (`/pokemon`):**
    *   Generada estáticamente (SSG) para una carga inicial instantánea.
    *   Implementa **Incremental Static Regeneration (ISR)** con un tiempo de revalidación de 24 horas para mantener los datos actualizados sin necesidad de un nuevo `build`.
*   **Detalle de Pokémon (`/pokemon/[name]`):**
    *   Utiliza `generateStaticParams` para pre-renderizar las páginas de los primeros 151 Pokémon como archivos HTML estáticos (SSG).
    *   También implementa ISR para revalidar los datos periódicamente.

### Módulo 2: Directorio de Rick and Morty (SSG + ISR + CSR)

*   **Página Principal (`/rick-and-morty`):**
    *   La lista inicial de personajes se genera estáticamente (SSG) para un rendimiento óptimo.
    *   Incluye un componente de **búsqueda avanzada interactiva**.
*   **Búsqueda Avanzada (CSR):**
    *   Implementada como un Componente de Cliente (`'use client'`).
    *   Permite filtrar personajes en tiempo real por **nombre, estado, tipo y género**.
    *   Utiliza los hooks `useState` y `useEffect` de React para manejar el estado y las peticiones a la API desde el navegador.
*   **Detalle del Personaje (`/rick-and-morty/[id]`):**
    *   Las páginas de los personajes más populares se pre-generan con SSG.
    *   Se utiliza ISR con una revalidación de 10 días para el resto de personajes y para mantener la frescura de los datos.

---

## ⚙️ Cómo Ejecutar el Proyecto en Local

Si deseas ejecutar este proyecto en tu propia máquina, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/yudi-star/rick-and-morty_next-js_DAWA.git
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd rick-and-morty_next-js_DAWA
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

4.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

5.  Abre [http://localhost:3000](http://localhost:3000/rick-and-morty) en tu navegador para ver la aplicación.

---

_Este proyecto fue desarrollado con fines educativos._
