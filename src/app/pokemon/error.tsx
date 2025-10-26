
'use client'; 

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white text-center p-4">
      <h2 className="text-4xl font-bold text-red-500 mb-4">¡Oh no! Algo salió mal.</h2>
      <p className="text-lg mb-6">Parece que hubo un error al cargar los datos de los Pokémon.</p>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition"
        onClick={() => reset()}
      >
        Intentar de nuevo
      </button>
    </div>
  );
}