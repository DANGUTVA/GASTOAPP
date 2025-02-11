import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface CostCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCostCenter: string) => void;
}

const CostCenterModal: React.FC<CostCenterModalProps> = ({ isOpen, onClose, onSave }) => {
  const [newCostCenter, setNewCostCenter] = useState('');

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (newCostCenter.trim()) {
      onSave(newCostCenter.trim());
      setNewCostCenter('');
      // Cerramos el modal después de guardar
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0 bg-white rounded-lg overflow-hidden">
        <DialogTitle className="sr-only">Agregar nuevo centro de costos</DialogTitle>
        <div className="relative">
          <DialogClose className="relative right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="flex flex-col items-center p-6 gap-6">
            <Input
              type="text"
              placeholder="Escribe un nuevo centro de costos"
              value={newCostCenter}
              onChange={(e) => setNewCostCenter(e.target.value)}
              className="w-full text-center border rounded-md px-6 py-3"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSave(e as any);
                }
              }}
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSave}
                className="bg-[#4285f4] hover:bg-[#3367d6] text-white px-8 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Aceptar
              </button>
              <button
                onClick={onClose}
                className="bg-[#ea4335] hover:bg-[#d33828] text-white px-8 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CostCenterModal;
