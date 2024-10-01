import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from '../Styles/FeaturedJob.module.css';
import JobCard from '../../../Component/JobCard';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Message from "../../../Component/Message";

const FeaturedJob = () => {
	const [allJobs, setAllJobs] = useState(JSON.parse(localStorage.getItem("allJobs")) || []);
	const navigate = useNavigate();
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
				<Button type="btn-tertiary" handler={() => navigate('/jobs')}> View All
					<FontAwesomeIcon icon={faArrowRight} color={"#4640DE"} />
				</Button>
			</div>
			<div className={`${style['featured-job-box']} inner-container `}>
				{jobs.map(job => (
					<Link to={`/jobdetail/${job.jobId}`} key={job.jobId}>
						<JobCard jobData={job} />
					</Link>
				))}
			</div>
		</div>
	)
}

export default FeaturedJob;