import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import CostCenterModal from './CostCenterModal';

interface CostCenterSelectProps {
  costCenter: string;
  costCenters: string[];
  onValueChange: (value: string) => void;
  onAddNewCostCenter?: (newCostCenter: string) => void;
  className?: string;
}

export const CostCenterSelect = ({ costCenter, costCenters, onValueChange, onAddNewCostCenter, className }: CostCenterSelectProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleValueChange = (value: string) => {
    if (value === 'new') {
      setModalOpen(true);
    } else {
      onValueChange(value);
    }
  };

  const handleSaveNewCostCenter = (newCostCenter: string) => {
    console.log('Guardando nuevo centro de costos:', newCostCenter);
    if (onAddNewCostCenter) {
      onAddNewCostCenter(newCostCenter);
      // Forzamos la selección del nuevo centro de costos
      setTimeout(() => {
        console.log('Seleccionando nuevo centro de costos:', newCostCenter);
        onValueChange(newCostCenter);
      }, 0);
    }
  };

  return (
    <div className={className}>
      <Select value={costCenter || ''} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccione un centro de costo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {costCenters.map((center) => (
              <SelectItem key={center} value={center}>
                {center}
              </SelectItem>
            ))}
            <SelectSeparator />
            <SelectItem value="new" className="text-blue-600">
              <Plus className="w-4 h-4 mr-2 inline-block" />
              Agregar nuevo centro de costo
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <CostCenterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveNewCostCenter}
      />
    </div>
  );
};