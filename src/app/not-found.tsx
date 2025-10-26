
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-dart text-center p-4">
      <h1 className="text-9xl font-bold text-purple-500">404</h1>
      <h2 className="text-4xl font-semibold mt-4 mb-2">Página No Encontrada</h2>
      <p className="text-lg mb-8">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
      <Link
        href="/rick-and-morty"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}