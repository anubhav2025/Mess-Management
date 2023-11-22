import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import DashboardScreen2 from "./screens/DashboardScreen2";
import Dashboard from "./components/Dashboard";
// import { ThemeProvider } from "react-bootstrap";

import Layout from "./components/Layout";

const MyRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route path="" element={<Layout />}>
          <Route path="/dashboard/student" element={<DashboardScreen />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {
  const mode = "dark";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  //   console.log(theme);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MyRouter />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

root.render(<Index />);

reportWebVitals();
