import { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";

const CandidateAuthContext = createContext(null);

export const CandidateAuthProvider = ({ children }) => {
	const [candidateAuthed, setCandidateAuth] = useState(localStorage.getItem('loggedInCandidate') || false);
	const candidateLogout = () => {
		if (candidateAuthed) {
			if (localStorage.getItem('loggedInCandidate')) {
				localStorage.removeItem("loggedInCandidate");
				setCandidateAuth(false);
				toast.success("logged out");
			}
		}
	}
	return (
		<CandidateAuthContext.Provider value={{ candidateAuthed, setCandidateAuth, candidateLogout }}>
			{children}
		</CandidateAuthContext.Provider>
	)
}


// custom hook that return the context with candidate auth status
export const useCandidateAuth = () => {
	return useContext(CandidateAuthContext);
}
