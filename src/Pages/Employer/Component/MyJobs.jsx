import { useEffect, useRef, useState } from 'react';
import style from '../style/recentActivity.module.css';
import Message from '../../../Component/Message';
import { useEmployerInfo } from '../useEmployerInfo';
import JobRow from './JobRow';
import Pagination from '../../../Component/Pagination';

const MyJobs = () => {
	const [allJobs, setAllJobs] = useState(JSON.parse(localStorage.getItem("allJobs")) || []);
	const [allPostedJobs, setAllPostedJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	const jobStatus = useRef('all');
	const jobTime = useRef('all');
	const [currentPage, setCurrentPage] = useState(1);

	const { companyInfo, setCompanyInfo } = useEmployerInfo();

	useEffect(() => {
		setAllPostedJobs(allJobs.filter(job => job.companyId === companyInfo.companyId));
		setFilteredJobs(allJobs.filter(job => job.companyId === companyInfo.companyId))
	}, [])

	if (allPostedJobs.length === 0) {
		return <Message>You have not posted any job yet</Message>
	}

	const jobsPerPage = 5;
	const lastJob = jobsPerPage * currentPage;
	const firstJob = lastJob - jobsPerPage;


	const currentPageJobs = filteredJobs.slice(firstJob, lastJob);

	const totalPages = [];
	for (let i = 1; i <= Math.ceil(filteredJobs.length / jobsPerPage); i++) {
		totalPages.push(i);
	}

	function handleChangeStatus(e) {
		jobStatus.current = e.target.value;
		setFilteredJobs(allPostedJobs.filter((job) => {
			const isExpire = new Date(job.expirationDate) < new Date();
			if (jobStatus.current === 'all') {
				return job;
			}
			else if (jobStatus.current === 'expire') {
				return isExpire && job;
			}
			else if (jobStatus.current === 'active') {
				return (!isExpire) && job;
			}
		}));
	}

	function handleJobTime(e) {
		jobTime.current = e.target.value;
		let result = [...allPostedJobs];
		if (jobTime.current === 'all') {
			result = [...allPostedJobs];
		}
		else if (jobTime.current === 'latest') {
			result = result.sort((job1, job2) => {
				return new Date(job2.postedOn) - new Date(job1.postedOn);
			})
		}
		else if (jobTime.current === 'oldest') {
			result = result.sort((job1, job2) => {
				return new Date(job1.postedOn) - new Date(job2.postedOn);
			})
		}
		setFilteredJobs(result);
	}

	return (
		<section className={style.joblist}>
			<h2>My Jobs</h2>
			<div className={style.jobsTable}>
				<table>
					<thead>
						<tr>
							<th>
								<select name="jobs" value={jobTime.current} onChange={handleJobTime}>
									<option value="all">All Job</option>
									<option value="latest">lasted Job</option>
									<option value="oldest">oldest Job</option>
								</select>
							</th>
							<th>
								<select name="jobs" value={jobStatus.current} onChange={handleChangeStatus}>
									<option value="all">Status</option>
									<option value="active">active</option>
									<option value="expire">expire</option>
								</select>
							</th>
							<th>Application</th>
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
		</section >
	)
}

export default MyJobs