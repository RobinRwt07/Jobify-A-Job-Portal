import React from 'react';
import style from '../Style/jobsideBar.module.css';
import JobCard from '../../../Component/JobCard';
import { Link } from 'react-router-dom';

const JobSideBar = ({ similerJobs, jobTitle }) => {
	const allOrgs = JSON.parse(localStorage.getItem("registeredOrg")) || [];
	return (
		<div className={style.jobSideBar}>
			<h3>Similar Role </h3>
			<div>
				{
					similerJobs.length == 0 ?
						<h3>No Similar Job Found</h3> :
						similerJobs.map((job) => {
							const matchedOrg = allOrgs.find(company => company.companyId === job.companyId);
							return (
								<Link to={`/jobdetail/${job.jobId}`} key={job.jobId}>
									<JobCard jobData={job} companyName={matchedOrg.companyName} companyImage={matchedOrg.companyImage} />
								</Link>
							)
						})
				}
			</div>
		</div>
	)
}

export default JobSideBar