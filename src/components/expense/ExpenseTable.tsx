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
    <div>
      {/* Vista de escritorio - tabla */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">FECHA</th>
              <th className="p-2 text-left">DESCRIPCIÓN</th>
              <th className="p-2 text-left">CENTRO DE COSTOS</th>
              <th className="p-2 text-left">DESPACHO</th>
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

      {/* Vista móvil - tarjetas */}
      <div className="md:hidden space-y-4">
        {expenses.map((expense, index) => (
          <div key={expense.id} className="bg-white rounded-lg shadow p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-0">
                <h4 className="text-sm font-medium text-gray-500">Descripción</h4>
                <p className="font-medium text-gray-900">{expense.description}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
              <h4 className="text-sm font-medium text-gray-500">Fecha</h4>
                <p className="font-medium text-gray-900">
                  {format(new Date(expense.date), "dd-MM-yyyy", { locale: es })}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Monto</h4>
                <p className="font-semibold text-green-600">
                  ₡{expense.amount.toLocaleString("es-CR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Centro de Costos</h4>
                <p className="font-medium text-gray-900">{expense.costCenter}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Despacho</h4>
                <p className="font-medium text-gray-900">{expense.ddiCode || "-"}</p>
              </div>
            </div>

            <div className="flex justify-center gap-2 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(expense)}
                className="text-[#8E9196]"
              >
                <Eye className="h-4 w-4 mr-1" />
                Ver
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(expense)}
                className="text-[#0FA0CE]"
              >
                <Pencil className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(expense.id)}
                className="text-[#ea384c]"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};