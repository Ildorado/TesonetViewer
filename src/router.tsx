import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { AuthLayout, LoginLayout, ProtectedLayout } from "@/components";

import { LoginPage } from "./routes/Login";
import { ServersPage } from "./routes/Servers";
import { ErrorPage } from "./error-page";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />} errorElement={<ErrorPage />}>
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<ServersPage />} />
      </Route>
    </Route>
  )
);
