import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from "./Component/Header";
import Home from './Pages/Home/Home';
import SignUp from "./Pages/Login-Signup/SignUp";
import CandidateSignup from "./Pages/Login-Signup/Component/CandidateSignup";
import EmployerSignup from "./Pages/Login-Signup/Component/EmployerSignup";
import Login from "./Pages/Login-Signup/Login";
import CandidateLogin from "./Pages/Login-Signup/Component/CandidateLogin";
import EmployerLogin from "./Pages/Login-Signup/Component/EmployerLogin";
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
import Candidate from "./Pages/Candidate/Candidate";
import CandidateOverview from "./Pages/Candidate/Component/CandidateOverview";
import AppliedJobs from "./Pages/Candidate/Component/AppliedJobs";
import SavedJobs from "./Pages/Candidate/Component/SavedJobs";
import CandidateProfile from "./Pages/Candidate/Component/CandidateProfile";
import JobApplications from "./Pages/Employer/Component/JobApplications";
import About from "./Pages/About/About";
import UpdateCandidateProfile from "./Pages/Candidate/Component/UpdateCandidateProfile";
import Error from "./Component/Error";
import AdminLogin from "./Pages/Login-Signup/Component/AdminLogin";
import Admin from "./Pages/Admin/Admin";
import AdminOverview from "./Pages/Admin/Components/AdminOverview";
import AdminCandidates from "./Pages/Admin/Components/AdminCandidates";
import AdminEmployers from "./Pages/Admin/Components/AdminEmployers";


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

const Layout = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	)
}

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />} errorElement={<Error />} >
					<Route index element={<Home />} />
					<Route path="/signup" element={<SignUp />}  >
						<Route index element={<CandidateSignup />} />
						<Route path='/signup/candidate' element={<CandidateSignup />} />
						<Route path='/signup/employer' element={<EmployerSignup />} />
					</Route>

					<Route path="/login" element={<Login />} >
						<Route index element={<CandidateLogin />} />
						<Route path="/login/candidate" element={<CandidateLogin />} />
						<Route path="/login/employer" element={<EmployerLogin />} />
						<Route path="/login/admin" element={<AdminLogin />} />
					</Route>

					<Route path={'/jobs'} element={<FindJobs />} />
					<Route path={'/jobdetail/:jobid'} element={<JobDetails />} />
					<Route element={<ProtectedRoute type="candidate" redirectTo={'/login/candidate'} />} >
						<Route path="/candidate" element={<Candidate />} >
							<Route index element={<CandidateOverview />} />
							<Route path="/candidate/applied_jobs" element={<AppliedJobs />} />
							<Route path="/candidate/saved_jobs" element={<SavedJobs />} />
							<Route path='/candidate/profile' element={<CandidateProfile />} />
							<Route path='/candidate/update_profile' element={<UpdateCandidateProfile />} />
						</Route>
					</Route>

					<Route element={<ProtectedRoute type="employer" redirectTo={'/login/employer'} />}>
						<Route path="/employer" element={<Employer />} >
							<Route index element={<Overview />} />
							<Route path="/employer/profile" element={<EmployerProfile />} />
							<Route path="/employer/add_job" element={<AddJob />} />
							<Route path="/employer/my_jobs" element={<MyJobs />} />
							<Route path="/employer/update_job/:jobId" element={<UpdateJob />} />
							<Route path="/employer/job_applications/:jobId" element={<JobApplications />} />
						</Route>
					</Route>

					<Route element={<ProtectedRoute type='admin' redirectTo={'/login/admin'} />} >
						<Route path="/admin" element={<Admin />}>
							<Route index element={<AdminOverview />} />
							<Route path="/admin/candidates" element={<AdminCandidates />} />
							<Route path="/admin/employers" element={<AdminEmployers />} />
						</Route>
					</Route>

					<Route path={'/about'} element={<About />} />
				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
		</>
	)
}

export default App;