'use client';

import { useEffect, useState } from 'react';
import ShrineCard from '@/components/ShrineCard';
import { Search } from 'lucide-react';

interface Shrine {
  id: number;
  name: string;
  description: string;
  color: string;
  total_sections: number;
  completed_sections: number;
}

export default function Home() {
  const [shrines, setShrines] = useState<Shrine[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalSearch, setGlobalSearch] = useState('');

  useEffect(() => {
    fetchShrines();
  }, []);

  const fetchShrines = async () => {
    try {
      const response = await fetch('/api/shrines');
      const data = await response.json();
      setShrines(data);
    } catch (error) {
      console.error('Error fetching shrines:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-300 mx-auto" />
          <p className="mt-4 text-lg text-purple-200">LOADING SHRINES...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-black text-purple-100 mb-4 drop-shadow-2xl tracking-wider">
            LAKE TEMPLE
          </h1>
          <p className="text-xl text-purple-300 mb-6 tracking-wide">CORAL ISLAND - PROGRESS TRACKER</p>

          {/* Busca Global */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-400" />
              <input
                type="text"
                placeholder="BUSCAR EM TODOS OS ALTARES..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-purple-950/60 border-2 border-purple-500 rounded-xl text-purple-100 placeholder-purple-400 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50 font-bold tracking-wider uppercase transition-all text-lg backdrop-blur-sm shadow-2xl"
              />
            </div>
            {globalSearch && (
              <p className="text-xs text-purple-300 mt-2 tracking-wide text-center">
                Buscando em todos os altares...
              </p>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {shrines.map((shrine) => (
            <ShrineCard key={shrine.id} shrine={shrine} globalSearchTerm={globalSearch} />
          ))}
        </div>

        <footer className="mt-12 text-center text-purple-400 text-sm tracking-wide">
          <p>DATA SOURCE: CORAL ISLAND WIKI - LAKE TEMPLE</p>
        </footer>
      </div>
    </div>
  );
}
