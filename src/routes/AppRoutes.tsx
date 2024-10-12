import { createBrowserRouter } from "react-router-dom";
import { OutletPage } from "../components/containers/OutletPage";
import { HomePage } from "../pages/home/HomePage";
import { ExpensesCollectionPage } from "../pages/expenses/ExpensesCollectionPage";
import { FundsPage } from "../pages/funds/FundsPage";
import { Expenses } from "../pages/expenses/Expenses";

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
        path: "/expensesCollection",
        element: <ExpensesCollectionPage />,
      },
      {
        path: "/expensesCollection/:id",
        element: <Expenses />,
      },
    ],
  },
]);
