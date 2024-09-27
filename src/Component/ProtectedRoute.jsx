import { Navigate, Outlet } from "react-router-dom";
import { useCandidateAuth } from "../hooks/useCandidateAuth";
import { useEmployerAuth } from "../hooks/useEmployerAuth";


const ProtectedRoute = ({ type, redirectTo }) => {

	const { employerAuthed } = useEmployerAuth();
	const { candidateAuthed } = useCandidateAuth();

	if (type == 'employer') {
		return employerAuthed ? <Outlet /> : <Navigate to={redirectTo} replace />
	}

	if (type == 'candidate') {
		return candidateAuthed ? <Outlet /> : <Navigate to={redirectTo} replace />
	}
}

export default ProtectedRoute;