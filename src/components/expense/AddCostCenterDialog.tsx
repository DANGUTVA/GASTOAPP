import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useExpenses } from "@/context/useExpenses";
import { PlusCircleIcon, InfoIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddCostCenterDialogProps {
  onSelect: (value: string) => void;
  selectedValue?: string;
}

const AddCostCenterDialog = ({ onSelect, selectedValue }: AddCostCenterDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCostCenter, setNewCostCenter] = useState('');
  const { addCostCenter, costCenters } = useExpenses();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedCenter = newCostCenter.trim();
    if (!trimmedCenter) {
      toast({
        title: 'Error',
        description: 'El nombre no puede estar vacío',
        variant: 'destructive'
      });
      return;
    }

    if (costCenters.includes(trimmedCenter)) {
      toast({
        title: 'Duplicado',
        description: 'Este centro de costos ya existe',
        variant: 'destructive'
      });
      return;
    }

    await addCostCenter(trimmedCenter);
    onSelect(trimmedCenter);
    toast({
      title: '¡Agregado!',
      description: 'Nuevo centro de costos creado'
    });
    setNewCostCenter('');
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={onSelect} value={selectedValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona un centro de costos" />
        </SelectTrigger>
        <SelectContent>
          {costCenters.map((center) => (
            <SelectItem key={center} value={center}>
              {center}
            </SelectItem>
          ))}
          <DialogTrigger asChild onClick={() => setIsOpen(true)}>
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 justify-start px-2 py-1.5 text-primary hover:bg-accent"
            >
              <PlusCircleIcon className="h-4 w-4" />
              Agregar nuevo centro
            </Button>
          </DialogTrigger>
        </SelectContent>
      </Select>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Centro de Costos</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              Ingresa un nombre único y descriptivo
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="costCenter">Nombre del Centro</Label>
                <Input
                  id="costCenter"
                  value={newCostCenter}
                  onChange={(e) => setNewCostCenter(e.target.value)}
                  placeholder="Ej: Marketing Digital"
                />
              </div>
              
              {costCenters.length > 0 && (
                <div className="space-y-2">
                  <Label>Centros existentes</Label>
                  <div className="flex flex-wrap gap-2">
                    {costCenters.map((center) => (
                      <Badge key={center} variant="outline">
                        {center}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!newCostCenter.trim()}>
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCostCenterDialog;
