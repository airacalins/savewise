import { createBrowserRouter } from "react-router-dom";
import { OutletPage } from "../components/containers/OutletPage";
import { ExpensesCollectionPage } from "../pages/expenses/ExpensesCollectionPage";
import { FundsCollectionPage } from "../pages/funds/FundsCollectionPage";
import { ExpensesPage } from "../pages/expenses/ExpensesTransactionPage";
import { FundsPage } from "../pages/funds/FundsTransactionPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { HomePage } from "../pages/home/HomePage";
import { SignUpPage } from "../pages/auth/SignUpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OutletPage />,
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/signUp",
        element: <SignUpPage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/fundsCollection",
        element: <FundsCollectionPage />,
      },
      {
        path: "/fundsCollection/:id",
        element: <FundsPage />,
      },
      {
        path: "/expensesCollection",
        element: <ExpensesCollectionPage />,
      },
      {
        path: "/expensesCollection/:id",
        element: <ExpensesPage />,
      },
    ],
  },
]);
