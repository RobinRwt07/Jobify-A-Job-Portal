import { createContext, useContext, useState, useEffect } from "react"
import { useEmployerAuth } from "../../hooks/useEmployerAuth";
const EmployerInfoContext = createContext();

export const EmployerInfoProvider = ({ children }) => {
	const [companyInfo, setCompanyInfo] = useState(null);
	const { employerAuthed } = useEmployerAuth();
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