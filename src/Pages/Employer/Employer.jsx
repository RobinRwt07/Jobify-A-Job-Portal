import React, { createContext, useState } from 'react';
import EmployerSideBar from './Component/EmployerSideBar';
import { Outlet } from 'react-router-dom';
import style from './style/employer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { EmployerInfoProvider } from './useEmployerInfo';
import Modal from '../../Component/Modal';

const Employer = () => {
	const [sideBarActive, setSideBarActive] = useState(false);
	function handleOpen() {
		setSideBarActive(true);
	}

	return (
		<EmployerInfoProvider>
			<section className={`${style.employerContainer} container`}>
				{
					(!sideBarActive) &&
					<span className={` ${style.sidebarBtn} ${style.openBtn}`} onClick={handleOpen}>
						<FontAwesomeIcon icon={faGreaterThan} />
					</span>
				}

				{
					sideBarActive && <EmployerSideBar sideBarActive={sideBarActive} setSideBarActive={setSideBarActive} />
				}
				<div className={style.contentContainer}>
					<Outlet />
				</div>
			</section>
		</EmployerInfoProvider>
	)
}

export default Employer