import React, { useState } from 'react'
import { useEmployerInfo } from '../useEmployerInfo';
import style from '../style/companyProfile.module.css';
import logo from '../../../Assest/Images/profileAvatar.png';
import Button from '../../../Component/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faInfo, faUser } from '@fortawesome/free-solid-svg-icons';
import CompanyInfo from './CompanyInfo';
import UpdateProfile from './UpdateProfile';
import AccoutSetting from './AccoutSetting';

const EmployerProfile = () => {
	const { companyInfo, setCompanyInfo } = useEmployerInfo();
	const [activeTab, setActiveTab] = useState("CompanyInfo");

	return (
		<section className={style.companyProfile}>
			<div>
				<div>
					<img src={companyInfo.companyImage || logo} alt="CompanyLogo" />
				</div>
				<h2>{companyInfo.companyName}</h2>
				<div className='flex-justify-center'>
					<Button>Update Picture</Button>
				</div>
			</div>
			<div>
				<div className={style.employerTabs}>
					<div className={activeTab === "CompanyInfo" && 'activeEmployerTab'} onClick={() => setActiveTab('CompanyInfo')} >
						<FontAwesomeIcon icon={faUser} />
						<span>Company Info</span>
					</div>
					<div className={activeTab === "UpdateProfile" && 'activeEmployerTab'} onClick={() => { setActiveTab("UpdateProfile") }} >
						<FontAwesomeIcon icon={faInfo} />
						<span>Update Profile</span>
					</div>
					<div className={activeTab === "AccountSetting" && 'activeEmployerTab'} onClick={() => setActiveTab("AccountSetting")} >
						<FontAwesomeIcon icon={faGear} />
						<span>Account Setting</span>
					</div>
				</div>
				{activeTab === 'CompanyInfo' && <CompanyInfo companyInfo={companyInfo} />}
				{activeTab === 'UpdateProfile' && <UpdateProfile companyInfo={companyInfo} />}
				{activeTab === 'AccountSetting' && <AccoutSetting companyInfo={companyInfo} />}
			</div>
		</section >
	)
}

export default EmployerProfile