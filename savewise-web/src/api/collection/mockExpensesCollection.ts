import { Collection, CollectionType } from "./type";

export const mockExpensesCollectionData: Collection[] = [
  {
    id: "1",
    name: "Utilities",
    currentMonthTotal: 1500.75,
    yearToDateTotal: 12000.0,
    collectionType: CollectionType.Expense,
  },
  {
    id: "2",
    name: "Living Expenses",
    currentMonthTotal: 3000.0,
    yearToDateTotal: 25000.0,
    collectionType: CollectionType.Expense,
  },
  {
    id: "3",
    name: "Savings",
    currentMonthTotal: 2000.5,
    yearToDateTotal: 18000.0,
    collectionType: CollectionType.Expense,
  },
  {
    id: "4",
    name: "Travel",
    currentMonthTotal: 1200.0,
    yearToDateTotal: 10000.0,
    collectionType: CollectionType.Expense,
  },
  {
    id: "5",
    name: "Entertainment",
    currentMonthTotal: 800.0,
    yearToDateTotal: 7000.0,
    collectionType: CollectionType.Expense,
  },
  {
    id: "6",
    name: "Groceries",
    currentMonthTotal: 900.0,
    yearToDateTotal: 8000.0,
    collectionType: CollectionType.Expense,
  },
  {
    id: "7",
    name: "Healthcare",
    currentMonthTotal: 650.25,
    yearToDateTotal: 5000.0,
    collectionType: CollectionType.Expense,
  },
  {
    id: "8",
    name: "Education",
    currentMonthTotal: 1300.0,
    yearToDateTotal: 11000.0,
    collectionType: CollectionType.Expense,
  },
  {
    id: "9",
    name: "Miscellaneous",
    currentMonthTotal: 400.0,
    yearToDateTotal: 3000.0,
    collectionType: CollectionType.Expense,
  },
  {
    id: "10",
    name: "Insurance",
    currentMonthTotal: 600.5,
    yearToDateTotal: 4500.0,
    collectionType: CollectionType.Expense,
  },
];
