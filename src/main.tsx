import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "@/pages/Root.tsx";
import SignupPage from "@/pages/SignupPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/pomodor",
        element: <App />
      },
      {
        path: "/pomodor/login",
        element: <LoginPage />
      },
      {
        path: "/pomodor/signup",
        element: <SignupPage />
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/*<App />*/}
  </StrictMode>
);
