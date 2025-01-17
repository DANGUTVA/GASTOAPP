import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Expense } from "@/types/expense";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  onViewDetails: (expense: Expense) => void;
}

export const ExpenseTable = ({ expenses, onEdit, onDelete, onViewDetails }: ExpenseTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">FECHA</th>
            <th className="p-2 text-left">DESCRIPCIÓN</th>
            <th className="p-2 text-left">CENTRO DE COSTO</th>
            <th className="p-2 text-left">CÓDIGO DDI</th>
            <th className="p-2 text-right">MONTO</th>
            <th className="p-2 text-center">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                {format(new Date(expense.date), "dd-MM-yyyy", { locale: es })}
              </td>
              <td className="p-2">{expense.description}</td>
              <td className="p-2">{expense.costCenter}</td>
              <td className="p-2">{expense.ddiCode || "-"}</td>
              <td className="p-2 text-right">
                ₡{expense.amount.toLocaleString("es-CR", { minimumFractionDigits: 2 })}
              </td>
              <td className="p-2">
                <div className="flex justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(expense)}
                    title="Ver detalles"
                  >
                    <Eye className="h-4 w-4 text-[#8E9196]" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(expense)}
                    title="Editar"
                  >
                    <Pencil className="h-4 w-4 text-[#0FA0CE]" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(expense.id)}
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4 text-[#ea384c]" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};