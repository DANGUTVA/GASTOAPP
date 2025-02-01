import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DDICodeInput } from "./expense/DDICodeInput";
import { ExpenseFormActions } from "./ExpenseFormActions";
import { useExpenseForm } from "./expense/hooks/useExpenseForm";
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export const ExpenseForm = () => {
  const {
    description,
    setDescription,
    costCenter,
    setCostCenter,
    costCenters,
    amount,
    setAmount,
    ddiCode,
    isSubmitting,
    handleDDIInputChange,
    handleSubmit
  } = useExpenseForm();

  const [newCostCenter, setNewCostCenter] = useState("");
  const [isNewCostCenterModalOpen, setIsNewCostCenterModalOpen] = useState(false);

  const onCostCenterChange = (value: string) => {
    if (value === "new") {
      setIsNewCostCenterModalOpen(true);
    } else {
      setCostCenter(value);
    }
  };

  const handleNewCostCenterSubmit = () => {
    if (newCostCenter) {
      setCostCenter(newCostCenter);
      setNewCostCenter("");
    }
    setIsNewCostCenterModalOpen(false);
  };

  return (
    <Card className="p-4 mb-6 md:mb-8">
      <h2 className="text-lg font-semibold mb-4">Agregar Gasto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <Input
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Descripción"
          />
        </div>

        <div>
          <label htmlFor="cost-center" className="block text-sm font-medium text-gray-700">Centro de Costos</label>
          <Select
            value={costCenter}
            onValueChange={onCostCenterChange}
            aria-label="Centro de Costos"
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un centro de costos" />
            </SelectTrigger>
            <SelectContent>
              {costCenters.map((center) => (
                <SelectItem key={center} value={center} aria-label={center}>
                  {center}
                </SelectItem>
              ))}
              <SelectItem key="new" value="new" aria-label="Agregar nuevo centro de costos">
               +Agregar nuevo centro de costos
              </SelectItem>
            </SelectContent>
          </Select>
          {isNewCostCenterModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
              <Card className="p-6 w-80 rounded-lg shadow-lg">
                <input 
                  type="text" 
                  value={newCostCenter} 
                  onChange={(e) => setNewCostCenter(e.target.value)} 
                  placeholder="Ingrese nuevo centro de costos" 
                  className="block w-full p-2 mb-4 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Nuevo centro de costos"
                />
                <div className="flex justify-center space-x-4">
                  <button type="button" onClick={handleNewCostCenterSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Aceptar
                  </button>
                  <button type="button" onClick={() => setIsNewCostCenterModalOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Cancelar
                  </button>
                </div>
              </Card>
            </div>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Monto"
            min="0"
            step="0.01"
          />
        </div>

        <DDICodeInput 
          ddiCode={ddiCode}
          onDDIChange={handleDDIInputChange}
          aria-label="Código DDI"
        />

        <ExpenseFormActions onSubmit={handleSubmit} />
      </form>
    </Card>
  );
};