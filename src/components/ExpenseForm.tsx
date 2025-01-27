import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DDICodeInput } from "./expense/DDICodeInput";
import { CostCenterSelect } from "./expense/CostCenterSelect";
import { ExpenseFormActions } from "./ExpenseFormActions";
import { useExpenseForm } from "./expense/hooks/useExpenseForm";
import { useState } from "react";

export const ExpenseForm = () => {
  const {
    description,
    setDescription,
    costCenter,
    setCostCenter,
    costCenters,
    setCostCenters,
    amount,
    setAmount,
    date,
    setDate,
    ddiCode,
    isSubmitting,
    handleDDIInputChange,
    handleCostCenterChange,
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
      setCostCenters((prev) => [...prev, newCostCenter]);
      setCostCenter(newCostCenter);
      setNewCostCenter("");
    }
    setIsNewCostCenterModalOpen(false);
  };

  return (
    <Card className="p-4 mb-6 md:mb-8">
      <h2 className="text-lg font-semibold mb-4">Agregar Gasto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <CostCenterSelect 
            costCenter={costCenter}
            costCenters={costCenters}
            onValueChange={onCostCenterChange}
            className="w-full"
          />
          {isNewCostCenterModalOpen && (
            <div className="modal-container">
              <Card className="p-4">
                <input 
                  type="text" 
                  value={newCostCenter} 
                  onChange={(e) => setNewCostCenter(e.target.value)} 
                  placeholder="Ingrese nuevo centro de costo" 
                  className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="button-group" style={{ gap: '1rem' }}>
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
          />
        </div>

        <DDICodeInput 
          ddiCode={ddiCode}
          onDDIChange={handleDDIInputChange}
        />

        <div>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <ExpenseFormActions onSubmit={handleSubmit} />
      </form>
    </Card>
  );
};