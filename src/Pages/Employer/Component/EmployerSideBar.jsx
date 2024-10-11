import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLayerGroup, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import style from '../../../Styles/dashboard.module.css';

const EmployerSideBar = ({ setSideBarActive }) => {
	function closeSideBar() {
		setSideBarActive(false);
	}
	return (
		<div className={style.navigationContainer}>
			<NavLink to={'/employer'} onClick={closeSideBar} end>
				<FontAwesomeIcon icon={faLayerGroup} />
				<span>Overview</span>
			</NavLink>

			<NavLink to={'/employer/profile'} onClick={closeSideBar} end>
				<FontAwesomeIcon icon={faUserCircle} />
				<span> Profile</span>
			</NavLink>

			<NavLink to={'/employer/add_job'} onClick={closeSideBar} end>
				<FontAwesomeIcon icon={faCirclePlus} />
				<span>Add a job</span>
			</NavLink>

			<NavLink to={'/employer/my_jobs'} onClick={closeSideBar} end>
				<FontAwesomeIcon icon={faBriefcase} />
				<span>My Jobs</span>
			</NavLink>
		</div>
	)
}

export default EmployerSideBar;