'use client';

import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import SectionItem from './SectionItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

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
}

export default function ShrineCard({ shrine }: ShrineCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [completedCount, setCompletedCount] = useState(shrine.completed_sections);

  useEffect(() => {
    if (isOpen && sections.length === 0) {
      fetchSections();
    }
  }, [isOpen]);

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
      await fetch(`/api/items/${itemId}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed_quantity: completedQuantity }),
      });

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
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-purple-500 transition-all hover:shadow-2xl hover:shadow-purple-500/30 bg-purple-950/60 backdrop-blur-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader
          className="cursor-pointer bg-purple-900/60"
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <CardTitle className="text-2xl font-black mb-1 text-purple-100 tracking-wider">
                  {shrine.name.toUpperCase()}
                </CardTitle>
                <p className="text-sm text-purple-300 tracking-wide">{shrine.description}</p>
              </div>
              <ChevronDown
                className={`w-6 h-6 transition-transform duration-300 text-purple-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </CollapsibleTrigger>
          <div className="mt-4">
            <ProgressBar current={completedCount} total={shrine.total_sections} color="#a855f7" />
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="pt-6 bg-purple-950/40">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
              </div>
            ) : (
              <div className="space-y-4">
                {sections.map((section) => (
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
                ))}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
