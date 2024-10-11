import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from '../Styles/FeaturedJob.module.css';
import JobCard from '../../../Component/JobCard';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Message from "../../../Component/Message";
import Button from "../../../Component/Button";

const FeaturedJob = () => {
	const [allJobs] = useState(JSON.parse(localStorage.getItem("allJobs")) || []);
	const navigate = useNavigate();
	let jobs = allJobs.filter(job => new Date(job.expirationDate) > new Date());
	if (jobs.length === 0) {
		return (
			<Message>
				No Jobs Available
			</Message>
		)
	}

	jobs = jobs.slice(0, 9);
	const allOrgs = JSON.parse(localStorage.getItem("employersDetails")) || [];
	return (
		<div className="container">
			<div className={style["featured-header"]}>
				<h2 className='heading'>Latest <span>Job Openings</span> </h2>
				<Button type="btn-tertiary" handler={() => navigate('/jobs')}> View All
					<FontAwesomeIcon icon={faArrowRight} color={"#4640DE"} />
				</Button>
			</div>
			<div className={`${style['featured-job-box']} inner-container `}>
				{jobs.map(job => {
					const matchedOrg = allOrgs.find(company => company.companyId === job.companyId);
					return (
						<Link to={`/jobdetail/${job.jobId}`} key={job.jobId}>
							<JobCard jobData={job} companyName={matchedOrg.companyName} companyImage={matchedOrg.companyImage} />
						</Link>
					)
				})}
			</div>
		</div>
	)
}

export default FeaturedJob;