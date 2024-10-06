import { createBrowserRouter } from "react-router-dom";
import { OutletPage } from "../components/containers/OutletPage";
import { HomePage } from "../pages/home/HomePage";

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
        path: "accounts",
        element: <div>About Page</div>,
      },
    ],
  },
]);
