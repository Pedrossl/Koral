'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

interface Item {
  id: number;
  item_name: string;
  quantity: number;
  image_url: string;
  completed_quantity: number;
}

interface SectionItemProps {
  id: number;
  name: string;
  image_url: string;
  items: Item[];
  completed: boolean;
  onToggle: (id: number, completed: boolean) => void;
  onItemUpdate: (itemId: number, completedQuantity: number) => void;
}

export default function SectionItem({ id, name, image_url, items, completed, onToggle, onItemUpdate }: SectionItemProps) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [itemStates, setItemStates] = useState<Record<number, number>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.completed_quantity }), {})
  );

  const handleToggle = async () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);
    await onToggle(id, newCompletedState);
  };

  const handleItemChange = async (item: Item, value: string) => {
    const numValue = parseInt(value) || 0;
    const newQty = Math.min(Math.max(numValue, 0), item.quantity);

    setItemStates(prev => ({ ...prev, [item.id]: newQty }));
    await onItemUpdate(item.id, newQty);
  };

  const handleItemCheckbox = async (item: Item) => {
    const currentQty = itemStates[item.id] || 0;
    const newQty = currentQty >= item.quantity ? 0 : item.quantity;

    setItemStates(prev => ({ ...prev, [item.id]: newQty }));
    await onItemUpdate(item.id, newQty);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const completedItems = items.reduce((sum, item) => sum + (itemStates[item.id] || 0), 0);
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="border-2 rounded-xl p-4 transition-all duration-300 border-purple-500 bg-purple-950/40 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20">
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {image_url && (
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-purple-900/50 flex-shrink-0 border border-purple-600">
                <Image
                  src={image_url}
                  alt={name}
                  fill
                  className="object-contain"
                  unoptimized
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
            <h4 className="font-bold text-lg text-purple-100 tracking-wide">{name.toUpperCase()}</h4>
          </div>
          <div className="text-sm font-bold text-purple-300">
            {completedItems}/{totalItems} ({Math.round(progressPercentage)}%)
          </div>
        </div>

        {/* Barra de progresso da seção */}
        <div className="mb-4">
          <div className="w-full bg-purple-950 rounded-full h-2 border border-purple-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 transition-all duration-500 shadow-lg shadow-purple-500/50"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item) => {
            const itemCompleted = (itemStates[item.id] || 0) >= item.quantity;
            const currentQty = itemStates[item.id] || 0;

            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  itemCompleted ? 'bg-purple-900/60 border-purple-400' : 'bg-purple-950/60 border-purple-700'
                }`}
              >
                <Checkbox
                  checked={itemCompleted}
                  onCheckedChange={() => handleItemCheckbox(item)}
                  className="flex-shrink-0"
                />

                {item.image_url && (
                  <div className="relative w-8 h-8 rounded overflow-hidden bg-purple-900/50 flex-shrink-0 border border-purple-600">
                    <Image
                      src={item.image_url}
                      alt={item.item_name}
                      fill
                      className="object-contain"
                      unoptimized
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <span className={`flex-1 text-sm font-medium tracking-wide ${itemCompleted ? 'text-purple-300' : 'text-purple-200'}`}>
                  {item.item_name}
                </span>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max={item.quantity}
                    value={currentQty}
                    onChange={(e) => handleItemChange(item, e.target.value)}
                    className="w-16 px-2 py-1 text-center border-2 border-purple-500 rounded-lg focus:outline-none focus:border-fuchsia-500 bg-purple-950 text-purple-100 font-mono font-bold"
                  />
                  <span className="text-sm font-bold text-purple-400">/ {item.quantity}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
