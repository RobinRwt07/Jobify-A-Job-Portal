import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const EmployerAuthContext = createContext();

export const EmployerAuthProvider = ({ children }) => {
	const [employerAuthed, setEmployerAuth] = useState(localStorage.getItem('loggedInOrg') || false);

	const employerLogout = () => {
		if (localStorage.getItem("loggedInOrg")) {
			localStorage.removeItem('loggedInOrg');
			setEmployerAuth(false);
			toast.success("Logged out");
		}
	}
	return (
		<EmployerAuthContext.Provider value={{ employerAuthed, setEmployerAuth, employerLogout }}>
			{children}
		</EmployerAuthContext.Provider>
	)
}

export const useEmployerAuth = () => {
	return useContext(EmployerAuthContext);
}