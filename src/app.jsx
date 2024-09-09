import Footer from "./Component/Footer";
import Header from "./Component/Header";
import Home from './Pages/Home/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Login-Signup/SignUp";
import CandidateSignup from "./Pages/Login-Signup/Component/CandidateSignup";
import EmployerSignup from "./Pages/Login-Signup/Component/EmployerSignup";
import Login from "./Pages/Login-Signup/Login";
import CandidateLogin from "./Pages/Login-Signup/Component/CandidateLogin";
import EmployerLogin from "./Pages/Login-Signup/Component/EmployerLogin";
import GlobalError from "./Component/GlobalError";
import FindJobs from "./Pages/Jobs/FindJobs";
export const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} errorElement={<GlobalError />} />
						<Route path="/signup" element={<SignUp />}  >
							<Route index element={<CandidateSignup />} />
							<Route path='/signup/candidate' element={<CandidateSignup />} />
							<Route path='/signup/employer' element={<EmployerSignup />} />
						</Route>
						<Route path="/login" element={<Login />} >
							<Route index element={<CandidateLogin />} />
							<Route path="/login/candidate" element={<CandidateLogin />} />
							<Route path="/login/employer" element={<EmployerLogin />} />
						</Route>
						<Route path={'/jobs'} element={<FindJobs />} >

						</Route>
					</Routes>
				</main>
			</BrowserRouter>
		</>
	)
}