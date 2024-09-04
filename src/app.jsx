import Footer from "./Component/Footer";
import Header from "./Component/Header";
import Home from './Pages/Home/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
export const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header />

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<h1>signup</h1>}>
						<Route index element={<h1>Default child route</h1>} />
						<Route path='/signup/candidate' element={<h1>candidate signup</h1>} />
						<Route path='/signup/employer' element={<h1>employer signup</h1>} />
					</Route>
				</Routes>

				<Footer />
			</BrowserRouter>
		</>
	)
}