import { createContext, useContext, useEffect, useState } from "react";
import { useCandidateAuth } from '../../hooks//useCandidateAuth';
import { useNavigate } from "react-router-dom";

const CandidateInfoContext = createContext(null);

export const CandidateInfoProvider = ({ children }) => {
	const [candidateInfo, setCandidateInfo] = useState(null);
	const { candidateAuthed } = useCandidateAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (candidateAuthed) {
			const allCandidate = JSON.parse(localStorage.getItem('registeredCandidate')) || [];
			const candidate = allCandidate.find(candidate => candidate.candidateId === candidateAuthed);
			if (candidate) {
				setCandidateInfo(candidate);
			}
			else {
				navigate('/login/candidate');
			}
		}
	}, [])

	if (!candidateInfo) {
		return;
	}
	return (
		<CandidateInfoContext.Provider value={candidateInfo}>
			{children}
		</CandidateInfoContext.Provider>
	)

}

export const useCandidateInfo = () => {
	return useContext(CandidateInfoContext);
}