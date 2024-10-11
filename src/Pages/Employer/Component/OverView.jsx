import React, { useEffect, useState } from 'react'
import Button from '../../../Component/Button';
import RecentActivity from './RecentActivity';
import style from '../../../Styles/dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import { useEmployerInfo } from '../useEmployerInfo';


const OverView = () => {
	const [allJobs, setAllJobs] = useState(JSON.parse(localStorage.getItem('allJobs')) || []);
	const [postedJobs, setPostedJobs] = useState([]);
	const { companyInfo, setCompanyInfo } = useEmployerInfo();
	const navigate = useNavigate();

	function fetchAllPostedJobs(companyId) {
		const allPostedJobs = allJobs.filter(job => job.companyId === companyId);
		setPostedJobs(allPostedJobs);
	}
	let totalApplications = 0;
	const allApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
	totalApplications = allApplications.filter(application => application.companyId === companyInfo.companyId).length;
	useEffect(() => {
		// fetch all job with the same company id
		fetchAllPostedJobs(companyInfo.companyId);
	}, []);

	if (!companyInfo) {
		return navigate('/login/employer');
	}
	const recentJobs = postedJobs.slice(0, 5);
	return (
		<div className={style.overview}>
			<div>
				<h2>Hello, {companyInfo.companyName}</h2>
				<Button type='btn btn-primary' handler={() => navigate('/employer/add_job')}> Post A Job </Button>
			</div >
			<div className='card'>
				<div>
					<span>{postedJobs.length}</span><br />
					Jobs Posted
				</div>
				<div style={{ backgroundColor: '#fafad2' }}>
					<span>{totalApplications}</span><br />
					Applications
				</div>
			</div>
			<RecentActivity recentJobs={recentJobs} />
		</div>
	)
}

export default OverView;