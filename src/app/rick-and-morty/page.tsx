import Link from 'next/link';
import Image from 'next/image';
import { Character, CharacterApiResponse } from '@/types/rickAndMorty';
import CharacterSearch from '@/components/CharacterSearch'; 

async function getCharacters(): Promise<Character[]> {
  const res = await fetch("https://rickandmortyapi.com/api/character", { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error('Failed to fetch characters');
  }
  const data: CharacterApiResponse = await res.json();
  return data.results.slice(0, 8); 
}

export default async function RickAndMortyPage() {
  const initialCharacters = await getCharacters();

  const statusColor = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-pink-300 drop-shadow-lg">
          Directorio de Rick and Morty
        </h1>
        <p className="text-center text-gray-300 mb-10">
          Explora el multiverso o busca a tu personaje favorito.
        </p>

        {/* Componente de Búsqueda (CSR) */}
        <CharacterSearch />

        <h2 className="text-3xl font-bold mb-8 border-l-4 border-pink-300 pl-4">
          Personajes Destacados
        </h2>
        
        {/* Lista Inicial de Personajes (SSG) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {initialCharacters.map((character) => (
            <Link href={`/rick-and-morty/${character.id}`} key={character.id}>
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
                <div className="relative">
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={300}
                    height={300}
                    className="w-full object-cover group-hover:opacity-80 transition-opacity"
                    priority={false} // Lazy Loading
                  />
                  <span
                    className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full ${statusColor[character.status]}`}
                  >
                    {character.status}
                  </span>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold truncate">{character.name}</h2>
                  <p className="text-gray-400">{character.species}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
