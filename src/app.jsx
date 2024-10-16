import { BrowserRouter, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from "./Component/Header";
import { CandidateAuthProvider } from "./hooks/useCandidateAuth";
import { EmployerAuthProvider } from "./hooks/useEmployerAuth";
import AppRoutes from "./AppRoutes";
import { Suspense } from "react";
import Loader from "./Component/Loader";
import ErrorBoundary from "./Component/ErrorBoundary";

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
			<ErrorBoundary>
				<Header />
				<Suspense fallback={<Loader />}>
					<main>
						<Outlet />
					</main>
				</Suspense>
			</ErrorBoundary>
		</>
	)
}

export { App, AppLayout };