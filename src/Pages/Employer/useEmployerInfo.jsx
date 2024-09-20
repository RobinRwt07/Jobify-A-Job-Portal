import { createContext, useContext, useState, useEffect } from "react"
import { useEmployerAuth } from "../../hooks/useEmployerAuth";
import { useNavigate } from "react-router-dom";
const EmployerInfoContext = createContext();

export const EmployerInfoProvider = ({ children }) => {
	const [companyInfo, setCompanyInfo] = useState(null);
	const { employerAuthed } = useEmployerAuth();
	const navigate = useNavigate();
	useEffect(() => {
		// request to get company info
		if (employerAuthed) {
			const registeredOrg = JSON.parse(localStorage.getItem("registeredOrg")) || [];
			if (registeredOrg.length > 0) {
				const result = registeredOrg.find(org => org.companyId === employerAuthed);
				if (result) {
					setCompanyInfo(result);
				}
			}
		}
		else {
			navigate('/login/employer');
		}
	}, []);


	if (!companyInfo) {
		return;
	}
	return (
		<EmployerInfoContext.Provider value={{ companyInfo, setCompanyInfo }}>
			{children}
		</EmployerInfoContext.Provider>
	)
}


// function to consume context

export const useEmployerInfo = () => {
	return useContext(EmployerInfoContext);
}