'use client';

import { useState, useEffect } from 'react';
import SectionItem from './SectionItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Search } from 'lucide-react';

interface Shrine {
  id: number;
  name: string;
  description: string;
  color: string;
  total_sections: number;
  completed_sections: number;
}

interface Section {
  id: number;
  name: string;
  image_url: string;
  items: {
    id: number;
    item_name: string;
    quantity: number;
    image_url: string;
    completed_quantity: number;
  }[];
  completed: boolean;
}

interface ShrineCardProps {
  shrine: Shrine;
  globalSearchTerm?: string;
}

export default function ShrineCard({ shrine, globalSearchTerm = '' }: ShrineCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [completedCount, setCompletedCount] = useState(shrine.completed_sections);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen && sections.length === 0) {
      fetchSections();
    }
  }, [isOpen]);

  // Abrir automaticamente quando há busca global
  useEffect(() => {
    if (globalSearchTerm && sections.length === 0) {
      setIsOpen(true);
    }
  }, [globalSearchTerm]);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/shrines/${shrine.id}/sections`);
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSection = async (sectionId: number, completed: boolean) => {
    try {
      await fetch(`/api/sections/${sectionId}/complete`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });

      // Atualizar estado local
      setSections((prev) =>
        prev.map((section) => (section.id === sectionId ? { ...section, completed } : section))
      );

      // Atualizar contador
      setCompletedCount((prev) => (completed ? prev + 1 : prev - 1));
    } catch (error) {
      console.error('Error toggling section:', error);
    }
  };

  const handleItemUpdate = async (itemId: number, completedQuantity: number) => {
    try {
      const response = await fetch(`/api/items/${itemId}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed_quantity: completedQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      // Atualizar estado local dos itens
      setSections((prev) =>
        prev.map((section) => ({
          ...section,
          items: section.items.map((item) =>
            item.id === itemId ? { ...item, completed_quantity: completedQuantity } : item
          ),
        }))
      );
    } catch (error) {
      console.error('Error updating item:', error);
      // Re-fetch em caso de erro para garantir consistência
      await fetchSections();
    }
  };

  // Calcular quantas seções estão 100% completas
  const completedSections = sections.filter((section) => {
    const totalItems = section.items.reduce((sum, item) => sum + item.quantity, 0);
    const completedItems = section.items.reduce((sum, item) => sum + item.completed_quantity, 0);
    return totalItems > 0 && completedItems >= totalItems;
  }).length;

  const totalSections = sections.length;
  const isFullyComplete = totalSections > 0 && completedSections === totalSections;

  // Filtrar seções e itens baseado no termo de busca (local ou global)
  const activeSearchTerm = globalSearchTerm || searchTerm;
  const filteredSections = sections.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.item_name.toLowerCase().includes(activeSearchTerm.toLowerCase())
    ),
  })).filter((section) => section.items.length > 0 || activeSearchTerm === '');

  return (
    <Card className={`overflow-hidden border-2 transition-all backdrop-blur-sm ${
      isFullyComplete
        ? 'border-cyan-400 bg-cyan-950/60 shadow-2xl shadow-cyan-400/50 animate-pulse-glow'
        : 'border-purple-500 bg-purple-950/60 hover:shadow-2xl hover:shadow-purple-500/30'
    }`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader
          className={`cursor-pointer ${isFullyComplete ? 'bg-cyan-900/60' : 'bg-purple-900/60'}`}
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between">
              <div className="text-left flex-1">
                <CardTitle className={`text-2xl font-black mb-1 tracking-wider ${isFullyComplete ? 'text-cyan-100' : 'text-purple-100'}`}>
                  {shrine.name.toUpperCase()}
                </CardTitle>
                <p className={`text-sm tracking-wide ${isFullyComplete ? 'text-cyan-300' : 'text-purple-300'}`}>
                  {shrine.description}
                </p>
                {totalSections > 0 && (
                  <div className={`mt-2 text-xs font-bold tracking-wide ${isFullyComplete ? 'text-cyan-400' : 'text-purple-400'}`}>
                    SEÇÕES COMPLETAS: {completedSections}/{totalSections}
                    {isFullyComplete && ' ✨ COMPLETO!'}
                  </div>
                )}
              </div>
              <ChevronDown
                className={`w-6 h-6 transition-transform duration-300 ${isFullyComplete ? 'text-cyan-300' : 'text-purple-300'} ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="pt-6 bg-purple-950/40">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Indicador de busca global */}
                {globalSearchTerm && (
                  <div className="mb-4 p-3 bg-fuchsia-500/20 border-2 border-fuchsia-500 rounded-lg">
                    <p className="text-sm text-fuchsia-200 tracking-wide text-center">
                      🔍 FILTRANDO POR: <span className="font-black">&quot;{globalSearchTerm.toUpperCase()}&quot;</span>
                    </p>
                  </div>
                )}

                {/* Campo de busca local (apenas quando não há busca global) */}
                {!globalSearchTerm && (
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input
                        type="text"
                        placeholder="BUSCAR ITEM..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-purple-900/60 border-2 border-purple-500 rounded-lg text-purple-100 placeholder-purple-400 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50 font-bold tracking-wider uppercase transition-all"
                      />
                    </div>
                    {searchTerm && (
                      <p className="text-xs text-purple-300 mt-2 tracking-wide">
                        Mostrando {filteredSections.reduce((acc, s) => acc + s.items.length, 0)} item(ns)
                      </p>
                    )}
                  </div>
                )}

                {filteredSections.length === 0 ? (
                  <div className="text-center py-8 text-purple-300 tracking-wide">
                    NENHUM ITEM ENCONTRADO
                  </div>
                ) : (
                  filteredSections.map((section) => (
                    <SectionItem
                      key={section.id}
                      id={section.id}
                      name={section.name}
                      image_url={section.image_url}
                      items={section.items}
                      completed={section.completed}
                      onToggle={handleToggleSection}
                      onItemUpdate={handleItemUpdate}
                    />
                  ))
                )}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
