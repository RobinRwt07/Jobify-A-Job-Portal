import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Component/ProtectedRoute";
import EmployerProfile from "./Pages/Employer/Component/EmployerProfile";
import Overview from './Pages/Employer/Component/OverView';
import AddJob from './Pages/Employer/Component/AddJob';
import MyJobs from "./Pages/Employer/Component/MyJobs";
import UpdateJob from './Pages/Employer/Component/UpdateJob';
import CandidateOverview from "./Pages/Candidate/Component/CandidateOverview";
import AppliedJobs from "./Pages/Candidate/Component/AppliedJobs";
import SavedJobs from "./Pages/Candidate/Component/SavedJobs";
import CandidateProfile from "./Pages/Candidate/Component/CandidateProfile";
import JobApplications from "./Pages/Employer/Component/JobApplications";
import UpdateCandidateProfile from "./Pages/Candidate/Component/UpdateCandidateProfile";
import Error from "./Component/Error";
import AdminLogin from "./Pages/Login-Signup/Component/AdminLogin";
import AdminOverview from "./Pages/Admin/Components/AdminOverview";
import AdminCandidates from "./Pages/Admin/Components/AdminCandidates";
import AdminEmployers from "./Pages/Admin/Components/AdminEmployers";
import CandidateSignup from "./Pages/Login-Signup/Component/CandidateSignup";
import EmployerSignup from "./Pages/Login-Signup/Component/EmployerSignup";
import CandidateLogin from "./Pages/Login-Signup/Component/CandidateLogin";
import EmployerLogin from "./Pages/Login-Signup/Component/EmployerLogin";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { AppLayout } from "./app";


// lazily loading component
const Home = React.lazy(() => import('./Pages/Home/Home'));
const FindJobs = React.lazy(() => import('./Pages/Jobs/FindJobs'));
const JobDetails = React.lazy(() => import('./Pages/JobDetails/JobDetails'));
const Login = React.lazy(() => import('./Pages/Login-Signup/Login'));
const SignUp = React.lazy(() => import('./Pages/Login-Signup/SignUp'));
const Employer = React.lazy(() => import('./Pages/Employer/Employer'));
const Candidate = React.lazy(() => import('./Pages/Candidate/Candidate'));
const Admin = React.lazy(() => import('./Pages/Admin/Admin'));
const About = React.lazy(() => import('./Pages/About/About'));

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<AppLayout />} errorElement={<Error />} >
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
export default AppRoutes