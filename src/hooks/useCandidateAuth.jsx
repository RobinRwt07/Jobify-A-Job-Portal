import { useContext, createContext, useState } from "react";

const CandidateAuthContext = createContext(null);

export const CandidateAuthProvider = ({ children }) => {
	const [candidateAuthed, setCandidateAuth] = useState(localStorage.getItem('loggedInCandidate') || false);
	return (
		<CandidateAuthContext.Provider value={{ candidateAuthed, setCandidateAuth }}>
			{children}
		</CandidateAuthContext.Provider>
	)
}


// custom hook that return the context with candidate auth status
export const useCandidateAuth = () => {
	return useContext(CandidateAuthContext);
}
