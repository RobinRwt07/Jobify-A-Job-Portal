import React from 'react'
import style from '../Styles/dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import { useEmployerAuth } from '../hooks/useEmployerAuth';
import { useCandidateAuth } from '../hooks/useCandidateAuth';
import { faLessThan, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const DashboardSideBar = ({ sideBarActive, setSideBarActive, type, children }) => {
	const { employerLogout } = useEmployerAuth();
	const { candidateLogout } = useCandidateAuth();

	const logoutHandler = (type === "employer") ? employerLogout : candidateLogout;

	function handleClose() {
		setSideBarActive(false);
	}

	return (
		<div className={style.sideBar}>
			{sideBarActive &&
				<span className={`${style.sidebarBtn} ${style.closeBtn}`} onClick={handleClose}>
					<FontAwesomeIcon icon={faLessThan} />
				</span>
			}
			{children}
			<Button type='btn btn-tertiary' handler={logoutHandler}>
				<FontAwesomeIcon icon={faRightFromBracket} />
				Log-out
			</Button>
		</div >
	)
}

export default DashboardSideBar;