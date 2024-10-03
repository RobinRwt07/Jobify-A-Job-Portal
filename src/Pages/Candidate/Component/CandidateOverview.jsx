import { useEffect, useState } from 'react';
import style from '../../../Styles/dashboard.module.css';
import { useCandidateInfo } from '../useCandidateInfo';
import RecentAppliedJobs from './RecentAppliedJobs';


const CandidateOverview = () => {
	const [allAppliedJobs, setAppliedJobs] = useState([]);
	const candidateInfo = useCandidateInfo();
	useEffect(() => {
		const totalApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
		setAppliedJobs(totalApplications.filter(job => job.candidateId === candidateInfo.candidateId));
	}, []);
	const recentAppliedJobs = allAppliedJobs.slice(0, 5);

	let totalSavedJobs = 0;

	const allCandidateDetails = JSON.parse(localStorage.getItem("candidatesDetails")) || [];
	const candidateDetails = allCandidateDetails.find(candidate => candidate.candidateId === candidateInfo.candidateId);
	if (candidateDetails && candidateDetails.savedJobs) {
		totalSavedJobs = candidateDetails.savedJobs.length;
	}
	return (
		<div className={style.overview}>
			<div>
				<h2>Hello, {candidateInfo.candidateFirstName} {candidateInfo.candidateLastName || ''}</h2>
			</div>
			<div className='card'>
				<div>
					<span>{allAppliedJobs.length}</span><br />
					Applied Jobs
				</div>
				<div style={{ backgroundColor: '#fafad2' }}>
					<span>{totalSavedJobs}</span><br />
					Saved Jobs
				</div>
			</div>
			<RecentAppliedJobs recentAppliedJobs={recentAppliedJobs} />
		</div>
	)
}


export default CandidateOverview