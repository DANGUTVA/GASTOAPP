import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Expense } from "@/types/expense";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface EditExpenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
  onSave: (expense: Expense) => void;
  costCenters: string[];
}

export const EditExpenseDialog = ({ 
  isOpen, 
  onClose, 
  expense, 
  onSave,
  costCenters 
}: EditExpenseDialogProps) => {
  const [editedExpense, setEditedExpense] = useState<Expense | null>(null);

  useEffect(() => {
    if (expense) {
      setEditedExpense(expense);
    }
  }, [expense]);

  const handleSave = () => {
    if (editedExpense) {
      onSave(editedExpense);
      onClose();
    }
  };

  if (!expense || !editedExpense) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Gasto</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              placeholder="Descripción"
              value={editedExpense.description}
              onChange={(e) =>
                setEditedExpense(prev =>
                  prev ? { ...prev, description: e.target.value } : null
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="costCenter">Centro de Costo</Label>
            <Select
              value={editedExpense.costCenter}
              onValueChange={(value) =>
                setEditedExpense(prev =>
                  prev ? { ...prev, costCenter: value } : null
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar centro de costo" />
              </SelectTrigger>
              <SelectContent>
                {costCenters.map((center) => (
                  <SelectItem key={center} value={center}>
                    {center}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Monto"
              value={editedExpense.amount}
              onChange={(e) =>
                setEditedExpense(prev =>
                  prev ? { ...prev, amount: parseFloat(e.target.value) || 0 } : null
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={editedExpense.date.split('T')[0]}
              onChange={(e) =>
                setEditedExpense(prev =>
                  prev ? { ...prev, date: e.target.value } : null
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ddiCode">Código DDI</Label>
            <Input
              id="ddiCode"
              placeholder="Código DDI"
              value={editedExpense.ddiCode || ''}
              onChange={(e) =>
                setEditedExpense(prev =>
                  prev ? { ...prev, ddiCode: e.target.value } : null
                )
              }
            />
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};