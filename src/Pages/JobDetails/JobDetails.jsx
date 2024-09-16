import { useParams } from "react-router-dom";
import JobDetailsHeader from "./Components/JobDetailHeader";
import JobDescription from "./Components/JobDescription";
import Footer from '../../Component/Footer';
import JobSideBar from "./Components/JobSideBar";
import style from './Style/jobdetail.module.css';
import { jobs } from "../../../Public/DummyData/Jobs";
import { useEffect, useState } from "react";
import JobDetailsShimmer from "./Components/JobDetailsShimmer";

const JobDetails = () => {
	const [allJobs, setAllJobs] = useState([]);
	const [matchedJob, setMatchedJob] = useState(null);
	const routeParam = useParams();

	useEffect(() => {
		setAllJobs(jobs);
		const job = jobs.find((job) => job.jobId == routeParam.jobid);
		setMatchedJob(job);
	}, [routeParam])

	if (!matchedJob) {
		return (<JobDetailsShimmer />)
	}

	const jobInfo = {
		jobTitle: matchedJob.jobTitle,
		companyName: matchedJob.companyName,
		location: matchedJob.location,
		opening: matchedJob.totalOpening,
		salary: matchedJob.salary,
		reqExp: matchedJob.reqExp || "0 - 1"
	}
	const similerJobs = allJobs.filter(job => {
		const isMatched = job.jobTitle.split(' ').some((item) => matchedJob.jobTitle.includes(item));
		if (isMatched) {
			return job;
		}
	})

	return (
		<>
			<section className={`${style.jobDetails} container`}>
				<div>
					<JobDetailsHeader jobInfo={jobInfo} />
					<JobDescription />
				</div>
				<JobSideBar jobTitle={matchedJob.jobTitle} similerJobs={similerJobs.slice(0, 5)} />
			</section>
			<Footer />
		</>
	)
}

export default JobDetails;