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
    console.log('Value changed to:', value);
    if (value === 'new') {
      setModalOpen(true);
    } else {
      onValueChange(value);
    }
  };

  const handleSaveNewCostCenter = (newCostCenter: string) => {
    console.log('Saving new cost center:', newCostCenter);
    if (onAddNewCostCenter) {
      onAddNewCostCenter(newCostCenter);
      onValueChange(newCostCenter);
    }
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  console.log('Current costCenter:', costCenter);
  console.log('Available costCenters:', costCenters);

  return (
    <div className={className}>
      <Select value={costCenter} onValueChange={handleValueChange}>
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
        onClose={handleCloseModal}
        onSave={handleSaveNewCostCenter}
      />
    </div>
  );
};