import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../Component/Button';
import RecentActivity from './RecentActivity';
import { useEmployerAuth } from '../../../hooks/useEmployerAuth';
import style from '../style/employer.module.css';
import { useNavigate } from 'react-router-dom';
import { useEmployerInfo } from '../useEmployerInfo';


const OverView = () => {
	const { employerAuthed } = useEmployerAuth();
	const navigate = useNavigate();
	const { companyInfo, setCompanyInfo } = useEmployerInfo();

	if (!companyInfo) {
		return <h3>Loading...</h3>
	}
	function handleAddJobClick() {
		navigate('/employer/add_job');
	}

	return (
		<div className={style.overview}>
			<div>
				<h2>Hello,{companyInfo.comapny}</h2>
				<Button type='btn btn-primary' handler={handleAddJobClick}> Post A Job </Button>
			</div >
			<div>
				<div >
					234 Jobs
				</div>
				<div >
					234 Jobs
				</div>
			</div>
			<RecentActivity employerId={employerAuthed} />
		</div>
	)
}

export default OverView;