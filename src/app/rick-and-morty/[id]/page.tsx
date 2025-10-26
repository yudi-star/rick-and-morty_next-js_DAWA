import { Character, CharacterApiResponse } from '@/types/rickAndMorty';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const resolvedParams = await params; 
  try {
    const character = await getCharacter(resolvedParams.id);
    return {
      title: `${character.name} | Rick and Morty Directory`,
      description: `Detailed information about ${character.name}: status, species, origin, and appearances.`,
    };
  } catch (error) {
    return {
      title: "Character Not Found",
      description: "This character does not exist in the directory.",
    };
  }
}

// (SSG) Genera páginas estáticas para los primeros 20 personajes
export async function generateStaticParams() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data: CharacterApiResponse = await res.json();
  return data.results.map(character => ({
    id: character.id.toString(),
  }));
}

// Función para obtener los datos de un personaje por ID
async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 }, // Revalida cada 10 días
  });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

// Página de detalle del personaje
export default async function CharacterDetailPage({ params }: DetailPageProps) {
  const resolvedParams = await params; 
  const character = await getCharacter(resolvedParams.id);

  const DetailRow = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-700">
      <dt className="text-md font-medium text-gray-400">{label}</dt>
      <dd className="mt-1 text-md text-white sm:mt-0 sm:col-span-2">{value || 'N/A'}</dd>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-800 text-white rounded-lg shadow-2xl max-w-4xl w-full md:grid md:grid-cols-3 overflow-hidden animate-fade-in">
       
        <div className="md:col-span-1">
          <Image
            src={character.image}
            alt={character.name}
            width={400}
            height={400}
            className="w-full h-full object-cover"
            priority
          />
        </div>

       
        <div className="p-6 sm:p-8 md:col-span-2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-pink-300">{character.name}</h1>
            <div className="flex items-center gap-2 mt-2 mb-6">
              <span
                className={`h-3 w-3 rounded-full ${
                  character.status === 'Alive'
                    ? 'bg-green-500'
                    : character.status === 'Dead'
                    ? 'bg-red-500'
                    : 'bg-gray-500'
                }`}
              ></span>
              <span>{character.status} - {character.species}</span>
            </div>

            <div className="divide-y-0">
              <DetailRow label="Género" value={character.gender} />
              <DetailRow label="Tipo" value={character.type} />
              <DetailRow label="Planeta de Origen" value={character.origin.name} />
              <DetailRow label="Última Ubicación Conocida" value={character.location.name} />
              <DetailRow label="Aparece en" value={`${character.episode.length} episodios`} />
              <DetailRow label="ID del Personaje" value={character.id.toString()} />
              <DetailRow label="Creado en Registro" value={new Date(character.created).toLocaleDateString()} />
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/rick-and-morty"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-transform hover:scale-105"
            >
              ← Volver al Directorio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
