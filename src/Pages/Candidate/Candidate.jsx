import React, { useState } from 'react'
import { CandidateInfoProvider } from './useCandidateInfo';
import style from '../../Styles/dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router-dom';
import DashboardSideBar from '../../Component/DashboardSideBar';
import CandidateSideBar from './Component/CandidateSidebar';
import { useCandidateAuth } from '../../hooks/useCandidateAuth';

const Candidate = () => {
	const { candidateLogout } = useCandidateAuth();
	const [sideBarActive, setSideBarActive] = useState(false);
	function handleOpen() {
		setSideBarActive(true);
	}

	return (
		<CandidateInfoProvider>
			<section className={`${style.dashboard} container`}>
				{
					(!sideBarActive) &&
					<span className={` ${style.sidebarBtn} ${style.openBtn}`} onClick={handleOpen}>
						<FontAwesomeIcon icon={faGreaterThan} />
					</span>
				}

				{
					sideBarActive &&
					<DashboardSideBar sideBarActive={sideBarActive} setSideBarActive={setSideBarActive} logoutHandler={candidateLogout}>
						<CandidateSideBar setSideBarActive={setSideBarActive} />
					</DashboardSideBar>
				}
				<div className={style.contentContainer}>
					<Outlet />
				</div>
			</section>
		</CandidateInfoProvider>
	)
}

export default Candidate