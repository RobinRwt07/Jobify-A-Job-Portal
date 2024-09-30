import React, { createContext, useState } from 'react';
import EmployerSideBar from './Component/EmployerSideBar';
import { Outlet } from 'react-router-dom';
import style from '../../Styles/dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { EmployerInfoProvider } from './useEmployerInfo';
import DashboardSideBar from '../../Component/DashboardSideBar';

const Employer = () => {
	const [sideBarActive, setSideBarActive] = useState(false);
	function handleOpen() {
		setSideBarActive(true);
	}

	return (
		<EmployerInfoProvider>
			<section className={`${style.dashboard} container`}>
				{
					(!sideBarActive) &&
					<span className={` ${style.sidebarBtn} ${style.openBtn}`} onClick={handleOpen}>
						<FontAwesomeIcon icon={faGreaterThan} />
					</span>
				}

				{
					sideBarActive &&
					<DashboardSideBar sideBarActive={sideBarActive} setSideBarActive={setSideBarActive} type={'employer'} >
						<EmployerSideBar />
					</DashboardSideBar>
				}
				<div className={style.contentContainer}>
					<Outlet />
				</div>
			</section>
		</EmployerInfoProvider>
	)
}

export default Employer