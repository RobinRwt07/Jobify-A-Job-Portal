import { useEffect, useState, useRef } from 'react';
import style2 from '../Styles/RecentAppliedJobs.module.css';
import { useCandidateAuth } from '../../../hooks/useCandidateAuth';
import Message from '../../../Component/Message';
import JobRow from './JobRow';
import Pagination from '../../../Component/Pagination';

const AppliedJobs = () => {
	const [appliedJobs, setAppliedJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const status = useRef('all');
	const { candidateAuthed } = useCandidateAuth();

	useEffect(() => {
		const allApplication = JSON.parse(localStorage.getItem("jobApplications")) || [];
		setAppliedJobs(allApplication.filter(job => job.candidateId === candidateAuthed));
		setFilteredJobs(allApplication.filter(job => job.candidateId === candidateAuthed));
	}, []);

	if (appliedJobs.length === 0) {
		return <Message>You have not posted any job</Message>
	}

	function handleStatusChange(e) {
		status.current = e.target.value;
		setFilteredJobs(appliedJobs.filter(job => {
			if (status.current === 'all') {
				return job;
			}
			else if (status.current === 'pending') {
				return job.status === "pending" && job;
			}
			else if (status.current === 'rejected') {
				return job.status === 'rejected' && job;
			}
			else if (status.current === 'accepted') {
				return job.status === 'accepted' && job;
			}
		}))
		console.log(status.current);
	}

	const jobsPerPage = 2;
	const lastJob = jobsPerPage * currentPage;
	const firstJob = lastJob - jobsPerPage;
	const currentPageJobs = filteredJobs.slice(firstJob, lastJob);

	const totalPages = [];
	for (let i = 1; i <= Math.ceil(filteredJobs.length / jobsPerPage); i++) {
		totalPages.push(i);
	}


	return (
		<section>
			<h3>Applied Jobs ({appliedJobs.length})</h3>
			<div className={style2.jobsTable}>
				<table>
					<thead>
						<tr>
							<th>Jobs</th>
							<th>
								<select value={status.current} onChange={handleStatusChange}>
									<option value="all">Status</option>
									<option value="accepted">Accepted</option>
									<option value="pending">Pending</option>
									<option value="rejected">Rejected</option>
								</select>
							</th>
							<th>Date Applied</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							filteredJobs.length === 0 ?
								<tr>
									<td style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }} colSpan={4}>
										No Jobs
									</td>
								</tr> :
								currentPageJobs.map(job => (
									<JobRow jobInfo={job} key={job.jobId} />
								))
						}
					</tbody>
				</table>
			</div>
			{
				(totalPages.length > 1) &&
				<Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
			}
		</section>
	)
}

export default AppliedJobs