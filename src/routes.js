import React from "react";
import { Navigate } from "react-router-dom";

// Layout Types
import { DefaultLayout, Guest } from "./layouts";

// Route Views
import StockOverview from "./views/StockOverview";
import Recommendations from "./views/Recommendations";
import CheckStock from "./views/CheckStock";
import ResetPassword from "./views/auth/ResetPassword";
import Errors from "./views/Errors";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Navigate to="/stock-overview" />
  },
  {
    path: "/stock-overview",
    layout: DefaultLayout,
    component: StockOverview
  },
  {
    path: "/recommendations",
    layout: DefaultLayout,
    component: Recommendations
  },
  {
    path: "/check-stock",
    layout: DefaultLayout,
    component: CheckStock
  },
  {
    path: "/reset-password",
    layout: DefaultLayout,
    component: ResetPassword
  },
];
