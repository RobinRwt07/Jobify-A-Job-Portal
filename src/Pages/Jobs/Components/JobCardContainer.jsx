import { useEffect, useState } from 'react';
import { jobs } from '../../../../Public/DummyData/Jobs';
import JobCard from '../../../Component/JobCard';
import style from '../Style/jobs.module.css';

const JobCardContainer = ({ searchParam: { title = "", location = "" } }) => {
	const [allJobs, setAllJobs] = useState([]);
	const [searchResult, setSearchResult] = useState([]);

	useEffect(() => {
		setAllJobs(jobs);
		if (title.length !== 0 || location.length !== 0) {
			setSearchResult(allJobs.filter(job => {
				if (job.jobTitle.toLowerCase().includes(title.toLowerCase()) || job.location === location) {
					return job;
				}
			}))
		}
		else {
			setSearchResult(jobs);
		}
	}, [title, location]);

	if (searchResult.length === 0) {
		return <div>
			<h1>Can not find jobs</h1>
		</div>
	}
	return (

		<div className={style.jobCardContainer}>
			{searchResult.map(job => <JobCard key={job.jobId} jobData={job} />)}
		</div>
	)
}

export default JobCardContainer;