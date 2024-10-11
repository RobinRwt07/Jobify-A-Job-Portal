import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLayerGroup, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import style from '../../../Styles/dashboard.module.css';

const CandidateSideBar = ({ setSideBarActive }) => {
	function closeSideBar() {
		setSideBarActive(false);
	}
	return (
		<div className={style.navigationContainer}>
			<NavLink to={'/candidate'} onClick={closeSideBar} end>
				<FontAwesomeIcon icon={faLayerGroup} />
				<span>Overview</span>
			</NavLink>

			<NavLink to={'/candidate/profile'} onClick={closeSideBar} end>
				<FontAwesomeIcon icon={faUserCircle} />
				<span>Profile</span>
			</NavLink>

			<NavLink to={'/candidate/applied_jobs'} onClick={closeSideBar} end>
				<FontAwesomeIcon icon={faCirclePlus} />
				<span>Applied Jobs</span>
			</NavLink>

			<NavLink to={'/candidate/saved_jobs'} onClick={closeSideBar} end>
				<FontAwesomeIcon icon={faBriefcase} />
				<span>Saved Jobs</span>
			</NavLink>
		</div>
	)
}

export default CandidateSideBar;