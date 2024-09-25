import { useEffect, useRef, useState } from 'react';
import style from '../style/recentActivity.module.css';
import style2 from '../style/myjobs.module.css';
import Message from '../../../Component/Message';
import { useEmployerInfo } from '../useEmployerInfo';
import JobRow from './JobRow';
import Button from '../../../Component/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const MyJobs = () => {
	const [allJobs, setAllJobs] = useState(JSON.parse(localStorage.getItem("allJobs")) || []);
	const [allPostedJobs, setAllPostedJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	const jobStatus = useRef('all');
	const jobTime = useRef('all');
	const [currentPage, setCurrentPage] = useState(1);

	const { companyInfo, setCompanyInfo } = useEmployerInfo();

	console.log(allPostedJobs);

	useEffect(() => {
		setAllPostedJobs(allJobs.filter(job => job.companyId === companyInfo.companyId));
		setFilteredJobs(allJobs.filter(job => job.companyId === companyInfo.companyId))
	}, [])

	if (allPostedJobs.length === 0) {
		return <Message>You have not posted any job yet</Message>
	}

	const jobsPerPage = 10;
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
		const jobs = allPostedJobs;
		setFilteredJobs(jobs.sort((job1, job2) => {
			const diff = new Date(job1.postedOn) - new Date(job2.postedOn);
			if (jobTime.current === 'all') {
				return 0;
			}
			else if (jobTime.current === 'latest') {
				if (diff > 0) {
					return -1;
				}
				if (diff < 0) {
					return 1;
				}
			}
			else if (jobTime === 'oldest') {
				return diff;
			}
		}))
	}


	function handleNextClick() {
		if (currentPage < totalPages.length) {
			setCurrentPage(currentPage + 1);
		}
	}
	function handlePreviousClick() {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	}
	return (
		<section className={`${style.joblist} ${style2.myJobs}`}>
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
				<div className={style2.paginationBlock}>
					<Button type="btn btn-primary" handler={handlePreviousClick} disabled={currentPage == 1}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
					{
						totalPages.map((page, index) => (
							<div key={index} onClick={(e) => setCurrentPage(Number(e.target.textContent))} className={page == currentPage ? "activePage" : ''}  >
								{page}
							</div>
						))
					}
					<Button type="btn btn-primary" handler={handleNextClick} disabled={currentPage == totalPages.length}>
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</div>
			}
		</section >
	)
}

export default MyJobs