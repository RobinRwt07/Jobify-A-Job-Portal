import React, { useState } from 'react';
import AdminSidebar from './Components/AdminSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import style from '../../Styles/dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import DashboardSideBar from '../../Component/DashboardSideBar';
import { toast } from 'react-toastify';


const Admin = () => {
	const [sideBarActive, setSideBarActive] = useState(false);
	const navigate = useNavigate();

	function handleOpen() {
		setSideBarActive(true);
	}

	function handleAdminLogout() {
		const isAdminLoggedIn = JSON.parse(localStorage.getItem('isAdminLoggedIn'));
		if (isAdminLoggedIn) {
			localStorage.removeItem('isAdminLoggedIn');
			navigate('/login/admin', { replace: true });
			toast.success("Logged Out");
		}
	}

	return (
		<section className={`${style.dashboard} container`}>
			{
				(!sideBarActive) &&
				<span className={` ${style.sidebarBtn} ${style.openBtn}`} onClick={handleOpen}>
					<FontAwesomeIcon icon={faGreaterThan} />
				</span>
			}
			{
				sideBarActive &&
				<DashboardSideBar sideBarActive={sideBarActive} setSideBarActive={setSideBarActive} logoutHandler={handleAdminLogout} >
					<AdminSidebar setSideBarActive={setSideBarActive} />
				</DashboardSideBar>
			}
			<div className={style.contentContainer}>
				<Outlet />
			</div>
		</section>
	)
}
export default Admin;