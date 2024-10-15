export type ExpenseCollection = {
  id: string;
  name: string;
  currentMonthTotal: number;
  yearToDateTotal: number;
  isHidden: boolean;
};

export type AddExpenseCollectionRequest = Pick<ExpenseCollection, "name">;

export type Expense = {
  id: string;
  date: string;
  description: string;
  amount: number;
  expenseCollectionId: string;
  fundId: string;
};

export type AddExpenseRequest = Omit<Expense, "id">;
