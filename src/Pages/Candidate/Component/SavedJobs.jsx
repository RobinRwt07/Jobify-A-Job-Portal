import { useEffect, useState } from 'react';
import style from '../Styles/SavedJobs.module.css';
import { useCandidateInfo } from '../useCandidateInfo';
import Pagination from '../../../Component/Pagination';
import Message from '../../../Component/Message';
import SavedJobRow from './SavedJobRow';


const SavedJobs = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [allSavedJobs, setSavedJobs] = useState([]);
	const candidateInfo = useCandidateInfo();


	useEffect(() => {
		const allCandidateDetails = JSON.parse(localStorage.getItem("candidatesDetails")) || [];
		const candidateDetails = allCandidateDetails.find(candidate => candidate.candidateId === candidateInfo.candidateId);
		if (candidateDetails && candidateDetails.savedJobs.length > 0) {
			const savedJobs = new Set(candidateDetails.savedJobs);
			const allSavedJobsArray = Array.from(savedJobs.values());
			const allJobs = JSON.parse(localStorage.getItem('allJobs')) || [];
			setSavedJobs(allJobs.filter(job => {
				if (allSavedJobsArray.includes(job.jobId)) {
					return job;
				}
			}));
		}
	}, []);


	if (allSavedJobs.length === 0) {
		return <Message>No Saved Jobs</Message>
	}

	const jobsPerPage = 10;
	const lastJob = jobsPerPage * currentPage;
	const firstJob = lastJob - jobsPerPage;
	const currentPageJobs = allSavedJobs.slice(firstJob, lastJob);

	const totalPages = [];
	for (let i = 1; i <= Math.ceil(allSavedJobs.length / jobsPerPage); i++) {
		totalPages.push(i);
	}

	const allOrgs = JSON.parse(localStorage.getItem("registeredOrg")) || [];
	return (
		<section>
			<h3>Saved Jobs (12)</h3>
			<div className={style.savedJobsTable}>

				<div className={style.savedJobContainer}>
					{
						allSavedJobs.length === 0 ?
							<Message>No Saved Jobs</Message> :
							currentPageJobs.map(job => {
								const matchedOrg = allOrgs.find(company => company.companyId === job.companyId);
								return <SavedJobRow candidateId={candidateInfo.candidateId} jobInfo={job} key={job.jobId} companyImage={matchedOrg.companyImage} />
							})
					}
				</div>
			</div>
			{
				(totalPages.length > 1) &&
				<Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
			}
		</section>
	)
}

export default SavedJobs