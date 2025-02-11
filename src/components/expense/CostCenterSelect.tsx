import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface CostCenterSelectProps {
  costCenter: string;
  costCenters: string[];
  onValueChange: (value: string) => void;
  onAddNewCostCenter?: () => void;
  className?: string;
}

export const CostCenterSelect = ({ costCenter, costCenters, onValueChange, onAddNewCostCenter, className }: CostCenterSelectProps) => {
  const handleValueChange = (value: string) => {
    if (value === 'new') {
      if (onAddNewCostCenter) {
        onAddNewCostCenter();
      }
    } else {
      onValueChange(value);
    }
  };

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
    </div>
  );
};