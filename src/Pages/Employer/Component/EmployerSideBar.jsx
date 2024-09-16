import React, { act } from 'react'
import style from '../style/employer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLayerGroup, faCirclePlus, faRightFromBracket, faArrowRight, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Component/Button';
import { NavLink } from 'react-router-dom';
import { useEmployerAuth } from '../../../hooks/useEmployerAuth';


const EmployerSideBar = ({ sideBarActive, setSideBarActive }) => {
	const { employerAuthed, employerLogout } = useEmployerAuth();

	function handleClose() {
		setSideBarActive(false);
	}

	return (
		<div className={style.employerSideBar}>
			{sideBarActive &&
				<span className={`${style.sidebarBtn} ${style.closeBtn}`} onClick={handleClose}>
					<FontAwesomeIcon icon={faLessThan} />
				</span>
			}
			<div>
				<NavLink to={'/employer'} end>
					<FontAwesomeIcon icon={faLayerGroup} />
					<span>Overview</span>
				</NavLink>

				<NavLink to={'/employer/profile'} end>
					<FontAwesomeIcon icon={faUserCircle} />
					<span> Profile</span>
				</NavLink>

				<NavLink to={'/employer/add_job'} end>
					<FontAwesomeIcon icon={faCirclePlus} />
					<span>Add a post</span>
				</NavLink>

				<NavLink to={'/employer/my_jobs'} end>
					<FontAwesomeIcon icon={faBriefcase} />
					<span>My Jobs</span>
				</NavLink>
			</div>
			<Button type='btn btn-tertiary' handler={employerLogout}>
				<FontAwesomeIcon icon={faRightFromBracket} />
				Log-out
			</Button>
		</div >
	)
}

export default EmployerSideBar;