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
import CompanyDetail from "./Components/CompanyDetail";

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
		jobId: matchedJob.jobId,
		companyId: matchedJob.companyId,
		jobTitle: matchedJob.jobTitle,
		jobLocation: matchedJob.jobLocation,
		vacancies: matchedJob.vacancies,
		workMode: matchedJob.workMode,
		salary: `${(matchedJob.minSalary / 100000).toFixed(1)} - ${(matchedJob.maxSalary / 100000).toFixed(1)} LPA`,
		experience: `${matchedJob.minExperience} - ${matchedJob.maxExperience}`,
		postedOn: dayjs(matchedJob.postedOn).format('DD MMM YYYY')
	}
	const jobDescription = {
		jobDescription: matchedJob.jobDescription,
		education: matchedJob.education,
		workMode: matchedJob.workMode,
		skills: matchedJob.skills.split(',')
	}
	const similerJobs = allJobs.filter(job => {
		const isActive = new Date(job.expirationDate) > new Date();
		const isMatched = matchedJob.jobTags.split(',').some(tag => job.jobTags.includes(tag.trim()));
		return isActive && isMatched;
	})
	const allEmployers = JSON.parse(localStorage.getItem("employersDetails")) || [];
	const companyInfo = allEmployers.find(employer => employer.companyId === matchedJob.companyId) || {};
	return (
		<>
			<section className={`${style.jobDetails} container`}>
				<div>
					<JobDetailsHeader jobInfo={jobInfo} companyInfo={companyInfo} />
					<JobDescription jobDescription={jobDescription} />
					<CompanyDetail companyInfo={companyInfo} />
				</div>
				<JobSideBar jobTitle={matchedJob.jobTitle} similerJobs={similerJobs.slice(0, 5)} />
			</section>
			<Footer />
		</>
	)
}

export default JobDetails;