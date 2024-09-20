import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from '../Styles/FeaturedJob.module.css';
import JobCard from '../../../Component/JobCard';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import Message from "../../../Component/Message";

const FeaturedJob = () => {
	const [allJobs, setAllJobs] = useState(JSON.parse(localStorage.getItem("allJobs")) || []);
	if (allJobs.length === 0) {
		return (
			<Message>
				No Jobs Available
			</Message>
		)
	}
	const jobs = allJobs.slice(0, 9);
	return (
		<div className="container">
			<div className={style["featured-header"]}>
				<h2 className='heading'>Latest <span>Job</span> </h2>
				<div>
					<Button type="btn-tertiary"> View All</Button>
					<FontAwesomeIcon icon={faArrowRight} color={"#4640DE"} />
				</div>
			</div>
			<div className={`${style['featured-job-box']} inner-container `}>
				{jobs.map(job => (
					<Link to={`/jobdetail/${job.jobId}`} key={job.jobId}>
						<JobCard key={job.jobId} jobData={job} />
					</Link>
				))}
			</div>
		</div>
	)
}

export default FeaturedJob;