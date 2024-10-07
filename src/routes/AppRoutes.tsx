import { createBrowserRouter } from "react-router-dom";
import { OutletPage } from "../components/containers/OutletPage";
import { HomePage } from "../pages/home/HomePage";
import { ExpensesPage } from "../pages/expenses/ExpensesPage";
import { FundsPage } from "../pages/funds/FundsPage";
import { ExpenseDetailsPage } from "../pages/expenses/ExpenseDetailsPage";
import { SummariesPage } from "../pages/summar/SummariesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OutletPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/funds",
        element: <FundsPage />,
      },
      {
        path: "/expenses",
        element: <ExpensesPage />,
      },
      {
        path: "/expenses/:id",
        element: <ExpenseDetailsPage />,
      },
      {
        path: "/expenses/:id",
        element: <ExpenseDetailsPage />,
      },
      {
        path: "/summaries",
        element: <SummariesPage />,
      },
    ],
  },
]);
