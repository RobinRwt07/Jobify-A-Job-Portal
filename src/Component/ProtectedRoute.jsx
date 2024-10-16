import { Navigate, Outlet } from "react-router-dom";
import { useCandidateAuth } from "../hooks/useCandidateAuth";
import { useEmployerAuth } from "../hooks/useEmployerAuth";
import useAdminAuth from "../hooks/useAdminAuth";

const ProtectedRoute = ({ type, redirectTo }) => {
	const isAdminAuthed = useAdminAuth();
	const { employerAuthed } = useEmployerAuth();
	const { candidateAuthed } = useCandidateAuth();
	if (type == "admin") {
		return isAdminAuthed ? <Outlet /> : <Navigate to={redirectTo} replace />
	}

	if (type == 'employer') {
		return employerAuthed ? <Outlet /> : <Navigate to={redirectTo} replace />
	}

	if (type == 'candidate') {
		return candidateAuthed ? <Outlet /> : <Navigate to={redirectTo} replace />
	}
}

export default ProtectedRoute;