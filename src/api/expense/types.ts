export type ExpenseCollection = {
  id: string;
  name: string;
  currentMonthTotal: number;
  yearToDateTotal: number;
};

export type Expense = {
  id: string;
  date: string;
  description: string;
  amount: number;
  expenseCollectionId: string;
  fundId: string;
};
