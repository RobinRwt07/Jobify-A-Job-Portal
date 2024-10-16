import { BrowserRouter, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from "./Component/Header";
import { CandidateAuthProvider } from "./hooks/useCandidateAuth";
import { EmployerAuthProvider } from "./hooks/useEmployerAuth";
import AppRoutes from "./AppRoutes";
import { Suspense } from "react";
import Loader from "./Component/Loader";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<EmployerAuthProvider>
					<CandidateAuthProvider>
						<AppRoutes />
						<ToastContainer autoClose={3000} />
					</CandidateAuthProvider>
				</EmployerAuthProvider>
			</BrowserRouter >
		</>
	)
}

const AppLayout = () => {
	return (
		<>
			<Header />
			<Suspense fallback={<Loader />}>
				<main>
					<Outlet />
				</main>
			</Suspense>
		</>
	)
}

export { App, AppLayout };