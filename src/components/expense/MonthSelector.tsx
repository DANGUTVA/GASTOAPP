import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useExpenses } from "@/context/ExpenseContext";
import { addMonths } from "date-fns";

export const MonthSelector = () => {
  const { currentDate, setCurrentDate } = useExpenses();

  const handlePreviousMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePreviousMonth}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-lg font-medium">
        {format(currentDate, "MMMM yyyy", { locale: es })}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNextMonth}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
