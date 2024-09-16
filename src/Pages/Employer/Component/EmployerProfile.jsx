import React from 'react'
import { useEmployerInfo } from '../useEmployerInfo';
import style from '../style/companyProfile.module.css';
import logo from '../../../Assest/Images/profileAvatar.png';

const EmployerProfile = () => {
	const { companyInfo, setCompanyInfo } = useEmployerInfo();
	return (
		<div className={style.companyProfile}>
			<div>
				<div>
					<img src={companyInfo.companyImage || logo} alt="CompanyLogo" />
				</div>
				<div>
					<h2>{companyInfo.companyName}</h2>
					<h4>Locaiton: {companyInfo.companyLocation}</h4>
					<p>Email: {companyInfo.companyEmail}</p>
				</div>
			</div>
		</div>
	)
}

export default EmployerProfile