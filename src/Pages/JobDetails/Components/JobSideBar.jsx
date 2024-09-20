import React from 'react';
import style from '../Style/jobsideBar.module.css';
import JobCard from '../../../Component/JobCard';
import { Link } from 'react-router-dom';

const JobSideBar = ({ similerJobs, jobTitle }) => {
	return (
		<div className={style.jobSideBar}>
			<h3>Similar Role </h3>
			<div>
				{
					similerJobs.length == 0 ?
						<h3>No Similar Job Found</h3> :
						similerJobs.map((job) => (
							<Link to={`/jobdetail/${job.jobId}`} key={job.jobId}>
								<JobCard jobData={job} />
							</Link>
						))
				}
			</div>
		</div>
	)
}

export default JobSideBar