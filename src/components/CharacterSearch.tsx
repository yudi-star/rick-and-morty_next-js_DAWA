'use client';

import { useState, useEffect } from 'react';
import { Character } from '@/types/rickAndMorty';
import Link from 'next/link';
import Image from 'next/image';

export default function CharacterSearch() {

  const [filters, setFilters] = useState({
    name: '',
    status: '',
    type: '',
    gender: '',
  });

  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hasFilters = Object.values(filters).some(value => value !== '');
    if (!hasFilters) {
      setResults([]);
      setError(null);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters.name) params.append('name', filters.name);
      if (filters.status) params.append('status', filters.status);
      if (filters.type) params.append('type', filters.type);
      if (filters.gender) params.append('gender', filters.gender);

      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`);
        const data = await res.json();

        if (data.error) {
          setResults([]);
          setError(data.error);
        } else {
          setResults(data.results || []);
        }
      } catch (err) {
        setError("Error al conectar con la API.");
        setResults([]);
      }
      setLoading(false);
    };

    const timeoutId = setTimeout(fetchResults, 500);
    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="mb-12 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-pink-300">Búsqueda</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Nombre del personaje..."
          className="p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          <option value="">Estado (cualquiera)</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          <option value="">Género (cualquiera)</option>
          <option value="female">Femenino</option>
          <option value="male">Masculino</option>
          <option value="genderless">Sin género</option>
          <option value="unknown">Desconocido</option>
        </select>
        <input
          type="text"
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          placeholder="Tipo (Alien, Cronenberg)..."
          className="p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      {/* Resultados de la búsqueda */}
      {loading && <p className="text-center text-pink-300">Buscando...</p>}
      {error && <p className="text-center text-red-500">Resultado: {error}</p>}
      
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {results.map((character) => (
            <Link href={`/rick-and-morty/${character.id}`} key={character.id}>
              <div className="bg-gray-700 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <Image src={character.image} alt={character.name} width={300} height={300} className="w-full object-cover"/>
                <div className="p-4">
                  <h2 className="text-xl font-bold truncate">{character.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
