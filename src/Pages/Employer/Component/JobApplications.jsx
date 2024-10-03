import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import JobApplicationRow from "./JobApplicationRow";
import Pagination from "../../../Component/Pagination";
import Message from "../../../Component/Message";
import style from '../style/jobApplication.module.css';
import CandidateDetails from "./CandidateDetails";

const JobApplications = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [open, setOpen] = useState(false);
	const [applicationId, setApplicationsId] = useState(null);
	const [applications, setApplications] = useState([]);
	const { jobId } = useParams();

	useEffect(() => {
		const allApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
		setApplications(allApplications.filter(application => application.jobId === jobId));
	}, []);

	if (jobId.length === 0 || (!jobId.startsWith("JOB"))) {
		return <Navigate to={'*'} />
	}

	if (applications.length === 0) {
		return <Message>No Application</Message>
	}

	function handleClose() {
		setOpen(false);
	}

	const itemPerPage = 10;
	const lastItem = itemPerPage * currentPage;
	const firstItem = lastItem - itemPerPage;
	const currentPageApplication = applications.slice(firstItem, lastItem);

	const totalPages = [];
	for (let i = 1; i <= Math.ceil(applications.length / itemPerPage); i++) {
		totalPages.push(i);
	}

	return (
		<section>
			<CandidateDetails open={open} handleClose={handleClose} applicationId={applicationId} />
			<h3>Total Applications ({applications.length})</h3>
			<div className={style.jobApplicationTable}>
				<div className={style.jobApplicationContainer}>
					{
						currentPageApplication.map(application => <JobApplicationRow applicationInfo={application} setOpen={setOpen} setApplicationsId={setApplicationsId} key={application.applicationId} />)
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

export default JobApplications