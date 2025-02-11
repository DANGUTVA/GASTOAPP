import { Button } from "@/components/ui/button";
import { useMonthlyBudget } from "./hooks/useMonthlyBudget";
import { SetBudgetDialog } from "./SetBudgetDialog";
import { useState } from "react";

export const BudgetDefinition = () => {
  const { formattedMonth } = useMonthlyBudget();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-4 text-center space-y-4">
      <h2 className="text-lg font-semibold">
        No hay presupuesto establecido para {formattedMonth}
      </h2>
      <p className="text-gray-600">
        Para comenzar a registrar gastos, primero debes establecer un presupuesto para este mes.
      </p>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 w-full"
      >
        Establecer Presupuesto
      </Button>
      <SetBudgetDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        month={formattedMonth}
      />
    </div>
  );
};
