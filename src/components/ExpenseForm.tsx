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
            className="w-full"
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
                  className="input-field"
                  style={{ marginBottom: '1rem', color: '#999', fontSize: '16px', width: '100%', height: '40px' }}
                />
                <div className="button-group" style={{ gap: '1rem' }}>
                  <button onClick={handleNewCostCenterSubmit} className="btn-accept" style={{ padding: '0.5rem 1rem' }}>Aceptar</button>
                  <button onClick={() => setIsNewCostCenterModalOpen(false)} className="btn-cancel" style={{ padding: '0.5rem 1rem' }}>Cancelar</button>
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
            className="w-full"
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
          />
        </div>

        <ExpenseFormActions onSubmit={handleSubmit} />
      </form>
    </Card>
  );
};