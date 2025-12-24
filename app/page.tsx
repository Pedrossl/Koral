'use client';

import { useEffect, useState } from 'react';
import ShrineCard from '@/components/ShrineCard';

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
  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    fetchShrines();
  }, []);

  const fetchShrines = async () => {
    try {
      const response = await fetch('/api/shrines');
      const data = await response.json();
      setShrines(data);

      // Calcular progresso total
      const totalSections = data.reduce((acc: number, shrine: Shrine) => acc + shrine.total_sections, 0);
      const completedSections = data.reduce((acc: number, shrine: Shrine) => acc + shrine.completed_sections, 0);
      const progress = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;
      setTotalProgress(progress);
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

          <div className="max-w-2xl mx-auto bg-purple-950/60 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-purple-500">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-purple-200 tracking-wide">TOTAL PROGRESS</span>
              <span className="text-3xl font-black text-purple-300">{totalProgress}%</span>
            </div>
            <div className="w-full bg-purple-950 rounded-full h-4 overflow-hidden border border-purple-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 transition-all duration-1000 ease-out shadow-lg shadow-purple-500/50"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {shrines.map((shrine) => (
            <ShrineCard key={shrine.id} shrine={shrine} />
          ))}
        </div>

        <footer className="mt-12 text-center text-purple-400 text-sm tracking-wide">
          <p>DATA SOURCE: CORAL ISLAND WIKI - LAKE TEMPLE</p>
        </footer>
      </div>
    </div>
  );
}
