import { createBrowserRouter } from "react-router-dom";
import { OutletPage } from "../components/containers/OutletPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OutletPage />,
    children: [
      {
        path: "/",
        element: <div>Hello world!</div>,
      },
      {
        path: "accounts",
        element: <div>About Page</div>,
      },
    ],
  },
]);
