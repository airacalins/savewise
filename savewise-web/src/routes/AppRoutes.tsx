import { createBrowserRouter } from "react-router-dom";
import { OutletPage } from "../components/containers/OutletPage";
import { ExpensesCollectionPage } from "../pages/expenses/ExpensesCollectionPage";
import { FundsCollectionPage } from "../pages/funds/FundsCollectionPage";
import { ExpensesPage } from "../pages/expenses/ExpensesTransactionPage";
import { FundTransactionsPage } from "../pages/funds/FundTransactionsPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { HomePage } from "../pages/home/HomePage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/auth/signUp",
    element: <SignUpPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <OutletPage />,
    children: [
      // Protected Routes
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/funds",
            element: <FundsCollectionPage />,
          },
          {
            path: "/funds/:collectionId/transactions",
            element: <FundTransactionsPage />,
          },
          {
            path: "/expenses",
            element: <ExpensesCollectionPage />,
          },
          {
            path: "/expenses/:collectionId/transactions",
            element: <ExpensesPage />,
          },
        ],
      },
    ],
  },
]);
