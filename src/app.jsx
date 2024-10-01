import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from "./Component/Header";
import Home from './Pages/Home/Home';
import SignUp from "./Pages/Login-Signup/SignUp";
import CandidateSignup from "./Pages/Login-Signup/Component/CandidateSignup";
import EmployerSignup from "./Pages/Login-Signup/Component/EmployerSignup";
import Login from "./Pages/Login-Signup/Login";
import CandidateLogin from "./Pages/Login-Signup/Component/CandidateLogin";
import EmployerLogin from "./Pages/Login-Signup/Component/EmployerLogin";
import GlobalError from "./Component/GlobalError";
import FindJobs from "./Pages/Jobs/FindJobs";
import JobDetails from "./Pages/JobDetails/JobDetails";
import 'react-toastify/dist/ReactToastify.css';
import { CandidateAuthProvider } from "./hooks/useCandidateAuth";
import Employer from "./Pages/Employer/Employer";
import { EmployerAuthProvider } from "./hooks/useEmployerAuth";
import ProtectedRoute from "./Component/ProtectedRoute";
import EmployerProfile from "./Pages/Employer/Component/EmployerProfile";
import Overview from './Pages/Employer/Component/OverView';
import AddJob from './Pages/Employer/Component/AddJob';
import MyJobs from "./Pages/Employer/Component/MyJobs";
import UpdateJob from './Pages/Employer/Component/UpdateJob';
import Error from "./Component/Error";
import Candidate from "./Pages/Candidate/Candidate";
import CandidateOverview from "./Pages/Candidate/Component/CandidateOverview";
import AppliedJobs from "./Pages/Candidate/Component/AppliedJobs";
import SavedJobs from "./Pages/Candidate/Component/SavedJobs";
import CandidateProfile from "./Pages/Candidate/Component/CandidateProfile";

export const App = () => {
	return (
		<>
			<BrowserRouter>
				<EmployerAuthProvider>
					<CandidateAuthProvider>
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

								<Route path={'/jobs'} element={<FindJobs />} />
								<Route path={'/jobdetail/:jobid'} element={<JobDetails />} />
								<Route element={<ProtectedRoute type="candidate" redirectTo={'/login/candidate'} />} >
									<Route path="/candidate" element={<Candidate />} >
										<Route index element={<CandidateOverview />} />
										<Route path="/candidate/applied_jobs" element={<AppliedJobs />} />
										<Route path="/candidate/saved_jobs" element={<SavedJobs />} />
										<Route path='/candidate/profile' element={<CandidateProfile />} />
									</Route>
								</Route>

								<Route element={<ProtectedRoute type="employer" redirectTo={'/login/employer'} />}>
									<Route path="/employer" element={<Employer />} >
										<Route index element={<Overview />} />
										<Route path="/employer/profile" element={<EmployerProfile />} />
										<Route path="/employer/add_job" element={<AddJob />} />
										<Route path="/employer/my_jobs" element={<MyJobs />} />
										<Route path="/employer/update_job/:jobId" element={<UpdateJob />} />
									</Route>
								</Route>
								<Route path="*" element={<Error />} />
							</Routes>
						</main >
						<ToastContainer autoClose={3000} />
					</CandidateAuthProvider>
				</EmployerAuthProvider>
			</BrowserRouter >
		</>
	)
}