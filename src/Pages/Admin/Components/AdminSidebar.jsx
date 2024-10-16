import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faUser, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import style from '../../../Styles/dashboard.module.css';

const AdminSidebar = ({ setSideBarActive }) => {
	function closeSideBar() {
		setSideBarActive(false);
	}
	return (
		<div className={style.navigationContainer}>
			<NavLink to={'/admin'} onClick={closeSideBar} end>
				<FontAwesomeIcon icon={faLayerGroup} />
				<span>Overview</span>
			</NavLink>

			<NavLink to={'/admin/candidates'} onClick={closeSideBar} end>
				<FontAwesomeIcon icon={faUser} />
				<span>Candidates</span>
			</NavLink>

			<NavLink to={'/admin/employers'} onClick={closeSideBar} end>
				<FontAwesomeIcon icon={faUserGraduate} />
				<span>Employers</span>
			</NavLink>
		</div>
	)
}

export default AdminSidebar;