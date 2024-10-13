// import { Expense } from "./types";

// export const mockExpenses: Expense[] = [
//   {
//     id: "1",
//     expenseCollectionId: "1",
//     date: "2024-01-01T00:00:00",
//     description: "Office Supplies",
//     amount: 150.75,
//     fundId: "1",
//   },
//   {
//     id: "2",
//     expenseCollectionId: "1",
//     date: "2024-01-05T00:00:00",
//     description: "Marketing Materials",
//     amount: 320.0,
//     fundId: "1",
//   },
//   {
//     id: "3",
//     expenseCollectionId: "1",
//     date: "2024-01-10T00:00:00",
//     description: "Staff Training",
//     amount: 300.0,
//     fundId: "1",
//   },
//   {
//     id: "4",
//     expenseCollectionId: "1",
//     date: "2024-01-15T00:00:00",
//     description: "Travel Expenses",
//     amount: 450.25,
//     fundId: "1",
//   },
//   {
//     id: "5",
//     expenseCollectionId: "1",
//     date: "2024-01-20T00:00:00",
//     description: "Client Dinner",
//     amount: 150.5,
//     fundId: "1",
//   },
//   {
//     id: "6",
//     expenseCollectionId: "1",
//     date: "2024-01-25T00:00:00",
//     description: "Office Rent",
//     amount: 2000.0,
//     fundId: "1",
//   },
//   {
//     id: "7",
//     expenseCollectionId: "1",
//     date: "2024-01-30T00:00:00",
//     description: "Website Hosting",
//     amount: 100.0,
//     fundId: "1",
//   },
//   {
//     id: "8",
//     expenseCollectionId: "1",
//     date: "2024-02-05T00:00:00",
//     description: "Consulting Fees",
//     amount: 800.0,
//     fundId: "1",
//   },
//   {
//     id: "9",
//     expenseCollectionId: "1",
//     date: "2024-02-10T00:00:00",
//     description: "Software Licenses",
//     amount: 500.0,
//     fundId: "1",
//   },
//   {
//     id: "10",
//     expenseCollectionId: "1",
//     date: "2024-02-15T00:00:00",
//     description: "Miscellaneous Expenses",
//     amount: 200.0,
//     fundId: "1",
//   },

//   {
//     id: "11",
//     expenseCollectionId: "2",
//     date: "2024-01-02T00:00:00",
//     description: "Office Supplies",
//     amount: 250.75,
//     fundId: "2",
//   },
//   {
//     id: "12",
//     expenseCollectionId: "2",
//     date: "2024-01-06T00:00:00",
//     description: "Marketing Campaign",
//     amount: 620.0,
//     fundId: "2",
//   },
//   {
//     id: "13",
//     expenseCollectionId: "2",
//     date: "2024-01-11T00:00:00",
//     description: "Staff Training",
//     amount: 400.0,
//     fundId: "2",
//   },
//   {
//     id: "14",
//     expenseCollectionId: "2",
//     date: "2024-01-16T00:00:00",
//     description: "Client Meeting",
//     amount: 300.0,
//     fundId: "2",
//   },
//   {
//     id: "15",
//     expenseCollectionId: "2",
//     date: "2024-01-21T00:00:00",
//     description: "Office Maintenance",
//     amount: 150.0,
//     fundId: "2",
//   },
//   {
//     id: "16",
//     expenseCollectionId: "2",
//     date: "2024-01-26T00:00:00",
//     description: "Travel Expenses",
//     amount: 800.0,
//     fundId: "2",
//   },
//   {
//     id: "17",
//     expenseCollectionId: "2",
//     date: "2024-01-31T00:00:00",
//     description: "Internet Fees",
//     amount: 75.0,
//     fundId: "2",
//   },
//   {
//     id: "18",
//     expenseCollectionId: "2",
//     date: "2024-02-06T00:00:00",
//     description: "Consulting Fees",
//     amount: 600.0,
//     fundId: "2",
//   },
//   {
//     id: "19",
//     expenseCollectionId: "2",
//     date: "2024-02-11T00:00:00",
//     description: "Office Equipment",
//     amount: 450.0,
//     fundId: "2",
//   },
//   {
//     id: "20",
//     expenseCollectionId: "2",
//     date: "2024-02-16T00:00:00",
//     description: "Miscellaneous Expenses",
//     amount: 300.0,
//     fundId: "2",
//   },

//   {
//     id: "21",
//     expenseCollectionId: "3",
//     date: "2024-01-03T00:00:00",
//     description: "Office Supplies",
//     amount: 180.75,
//     fundId: "3",
//   },
//   {
//     id: "22",
//     expenseCollectionId: "3",
//     date: "2024-01-07T00:00:00",
//     description: "Marketing Strategy",
//     amount: 500.0,
//     fundId: "3",
//   },
//   {
//     id: "23",
//     expenseCollectionId: "3",
//     date: "2024-01-12T00:00:00",
//     description: "Staff Training",
//     amount: 350.0,
//     fundId: "3",
//   },
//   {
//     id: "24",
//     expenseCollectionId: "3",
//     date: "2024-01-17T00:00:00",
//     description: "Client Lunch",
//     amount: 220.0,
//     fundId: "3",
//   },
//   {
//     id: "25",
//     expenseCollectionId: "3",
//     date: "2024-01-22T00:00:00",
//     description: "Office Utilities",
//     amount: 400.0,
//     fundId: "3",
//   },
//   {
//     id: "26",
//     expenseCollectionId: "3",
//     date: "2024-01-27T00:00:00",
//     description: "Travel Expenses",
//     amount: 500.0,
//     fundId: "3",
//   },
//   {
//     id: "27",
//     expenseCollectionId: "3",
//     date: "2024-02-01T00:00:00",
//     description: "Software Purchase",
//     amount: 700.0,
//     fundId: "3",
//   },
//   {
//     id: "28",
//     expenseCollectionId: "3",
//     date: "2024-02-07T00:00:00",
//     description: "Consulting Fees",
//     amount: 450.0,
//     fundId: "3",
//   },
//   {
//     id: "29",
//     expenseCollectionId: "3",
//     date: "2024-02-12T00:00:00",
//     description: "Office Rent",
//     amount: 2000.0,
//     fundId: "3",
//   },
//   {
//     id: "30",
//     expenseCollectionId: "3",
//     date: "2024-02-17T00:00:00",
//     description: "Miscellaneous Expenses",
//     amount: 250.0,
//     fundId: "3",
//   },

//   {
//     id: "31",
//     expenseCollectionId: "4",
//     date: "2024-01-04T00:00:00",
//     description: "Office Supplies",
//     amount: 130.75,
//     fundId: "4",
//   },
//   {
//     id: "32",
//     expenseCollectionId: "4",
//     date: "2024-01-08T00:00:00",
//     description: "International Shipping",
//     amount: 420.0,
//     fundId: "4",
//   },
//   {
//     id: "33",
//     expenseCollectionId: "4",
//     date: "2024-01-13T00:00:00",
//     description: "Staff Training",
//     amount: 250.0,
//     fundId: "4",
//   },
//   {
//     id: "34",
//     expenseCollectionId: "4",
//     date: "2024-01-18T00:00:00",
//     description: "Client Conference",
//     amount: 600.0,
//     fundId: "4",
//   },
//   {
//     id: "35",
//     expenseCollectionId: "4",
//     date: "2024-01-23T00:00:00",
//     description: "Office Renovation",
//     amount: 1200.0,
//     fundId: "4",
//   },
//   {
//     id: "36",
//     expenseCollectionId: "4",
//     date: "2024-01-28T00:00:00",
//     description: "Travel Expenses",
//     amount: 700.0,
//     fundId: "4",
//   },
//   {
//     id: "37",
//     expenseCollectionId: "4",
//     date: "2024-02-02T00:00:00",
//     description: "Communication Expenses",
//     amount: 80.0,
//     fundId: "4",
//   },
//   {
//     id: "38",
//     expenseCollectionId: "4",
//     date: "2024-02-08T00:00:00",
//     description: "Consulting Fees",
//     amount: 500.0,
//     fundId: "4",
//   },
//   {
//     id: "39",
//     expenseCollectionId: "4",
//     date: "2024-02-13T00:00:00",
//     description: "Utilities",
//     amount: 300.0,
//     fundId: "4",
//   },
//   {
//     id: "40",
//     expenseCollectionId: "4",
//     date: "2024-02-18T00:00:00",
//     description: "Miscellaneous Expenses",
//     amount: 150.0,
//     fundId: "4",
//   },

//   {
//     id: "41",
//     expenseCollectionId: "5",
//     date: "2024-01-09T00:00:00",
//     description: "Office Supplies",
//     amount: 90.75,
//     fundId: "5",
//   },
//   {
//     id: "42",
//     expenseCollectionId: "5",
//     date: "2024-01-14T00:00:00",
//     description: "Retirement Seminar",
//     amount: 500.0,
//     fundId: "5",
//   },
//   {
//     id: "43",
//     expenseCollectionId: "5",
//     date: "2024-01-19T00:00:00",
//     description: "Staff Training",
//     amount: 200.0,
//     fundId: "5",
//   },
//   {
//     id: "44",
//     expenseCollectionId: "5",
//     date: "2024-01-24T00:00:00",
//     description: "Investment Research",
//     amount: 600.0,
//     fundId: "5",
//   },
//   {
//     id: "45",
//     expenseCollectionId: "5",
//     date: "2024-01-29T00:00:00",
//     description: "Annual Audit",
//     amount: 1500.0,
//     fundId: "5",
//   },
//   {
//     id: "46",
//     expenseCollectionId: "5",
//     date: "2024-02-03T00:00:00",
//     description: "Travel Expenses",
//     amount: 400.0,
//     fundId: "5",
//   },
//   {
//     id: "47",
//     expenseCollectionId: "5",
//     date: "2024-02-09T00:00:00",
//     description: "Fund Marketing",
//     amount: 300.0,
//     fundId: "5",
//   },
//   {
//     id: "48",
//     expenseCollectionId: "5",
//     date: "2024-02-14T00:00:00",
//     description: "Consulting Fees",
//     amount: 700.0,
//     fundId: "5",
//   },
//   {
//     id: "49",
//     expenseCollectionId: "5",
//     date: "2024-02-19T00:00:00",
//     description: "Office Renovation",
//     amount: 2500.0,
//     fundId: "5",
//   },
//   {
//     id: "50",
//     expenseCollectionId: "5",
//     date: "2024-02-24T00:00:00",
//     description: "Miscellaneous Expenses",
//     amount: 200.0,
//     fundId: "5",
//   },
// ];
