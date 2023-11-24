import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./screens/layout";
import Dashboard from "./screens/dashboard";
import Products from "./screens/products";
import Customers from "./screens/customers";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MenuItems from "./screens/menu/WeeklyMenu";

import LatestMenuItems from "./screens/menu/LatestMenuItems";
import LatestComplaints from "./screens/complaints/LatestComplaints";
import ComplaintForm from './screens/complaints/ComplaintForm';

function App() {
	const mode = useSelector((state) => state.global.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes>
					<Route element={<Layout />}>
						{" "}
						{/* will exist on every page. Eg, navbar and sidebar. */}
						<Route index={true} path="/" element={<HomeScreen />} />
						<Route path="/login" element={<LoginScreen />} />
						<Route path="/register" element={<RegisterScreen />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/products" element={<Products />} />
						<Route path="/customers" element={<Customers />} />
						<Route path="/menu/weekly" element={<MenuItems />} />
						<Route path="/complaints/add" element={<ComplaintForm />} />
            <Route path="/menu/items/all" element={<LatestMenuItems />} />
            <Route path="/complaints/latest" element={<LatestComplaints />} />
					</Route>
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
