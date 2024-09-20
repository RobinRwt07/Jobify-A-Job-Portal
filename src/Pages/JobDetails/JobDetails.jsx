import { useParams } from "react-router-dom";
import JobDetailsHeader from "./Components/JobDetailHeader";
import JobDescription from "./Components/JobDescription";
import Footer from '../../Component/Footer';
import JobSideBar from "./Components/JobSideBar";
import style from './Style/jobdetail.module.css';
import { useEffect, useState } from "react";
import JobDetailsShimmer from "./Components/JobDetailsShimmer";
import Message from "../../Component/Message";
import dayjs from "dayjs";

const JobDetails = () => {
	const [allJobs, setAllJobs] = useState(JSON.parse(localStorage.getItem('allJobs')) || []);
	const [matchedJob, setMatchedJob] = useState(null);
	const routeParam = useParams();

	function fetchJobData(searchedJobId) {
		const job = allJobs.find((job) => job.jobId === searchedJobId);
		setMatchedJob(job);
	}

	useEffect(() => {
		// fetch job details with specified jobid
		fetchJobData(routeParam.jobid);
	}, [routeParam])
	if (allJobs.length === 0) {
		return <Message>Jobs Not Found</Message>
	}

	if (!matchedJob) {
		return (<JobDetailsShimmer />)
	}

	const jobInfo = {
		jobTitle: matchedJob.jobTitle,
		companyName: matchedJob.companyName,
		jobLocation: matchedJob.jobLocation,
		vacancies: matchedJob.vacancies,
		salary: `${(matchedJob.minSalary / 100000).toFixed(1)} - ${(matchedJob.maxSalary / 100000).toFixed(1)} LPA`,
		experience: `${matchedJob.minExperience} - ${matchedJob.maxExperience}`,
		postedOn: dayjs(matchedJob.postedOn).format('DD MMM YYYY')
	}
	const jobDescription = {
		jobDescription: matchedJob.jobDescription,
		education: matchedJob.education,
		jobType: matchedJob.jobType,
		workMode: matchedJob.workMode,
		skills: matchedJob.skills.split(',')
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
					<JobDescription jobDescription={jobDescription} />
				</div>
				<JobSideBar jobTitle={matchedJob.jobTitle} similerJobs={similerJobs.slice(0, 5)} />
			</section>
			<Footer />
		</>
	)
}

export default JobDetails;