import { createContext } from "react";
import type { ExpenseContextType } from "@/types/expense";

export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);
