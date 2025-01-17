import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Expense } from "@/types/expense";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpenseDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
  imageUrl: string | null;
  isLoading: boolean;
}

export const ExpenseDetailsDialog = ({ 
  isOpen, 
  onClose, 
  expense,
  imageUrl,
  isLoading 
}: ExpenseDetailsDialogProps) => {
  if (!expense) return null;

  const formattedDate = format(new Date(expense.date), "dd-MM-yyyy", { locale: es });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Detalles del Gasto</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 py-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
              <p className="mt-1 text-base font-medium">{expense.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Monto</h3>
              <p className="mt-1 text-base font-semibold text-green-600">
                ₡{expense.amount.toLocaleString("es-CR", { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Fecha</h3>
              <p className="mt-1 text-base font-medium">{formattedDate}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Centro de Costo</h3>
              <p className="mt-1 text-base font-medium">{expense.costCenter}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Código DDI</h3>
              <p className="mt-1 text-base font-medium">{expense.ddiCode || "Sin código DDI"}</p>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Factura</h3>
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 min-h-[200px]">
                {isLoading ? (
                  <div className="text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                    <span>Cargando imagen...</span>
                  </div>
                ) : expense.hasReceipt && imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Factura"
                    className="max-w-full h-auto max-h-[200px] object-contain rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <ImageOff className="h-12 w-12 mb-2" />
                    <span>Sin imagen de factura</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
