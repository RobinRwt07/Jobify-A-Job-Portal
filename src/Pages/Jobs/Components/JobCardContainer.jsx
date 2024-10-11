import { useContext, useEffect, useState } from 'react';
import JobCard from '../../../Component/JobCard';
import style from '../Style/jobs.module.css';
import { FilterContext } from '../context';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Message from '../../../Component/Message';
import Button from '../../../Component/Button';

const JobCardContainer = ({ searchParam: { title = "", location = "", companyId = "" } }) => {
	const navigate = useNavigate();
	const [allJobs, setAllJobs] = useState(JSON.parse(localStorage.getItem("allJobs")) || []);
	const { selectedTag, setSelectedTag } = useContext(FilterContext);
	const [currentPage, setCurrentPage] = useState(1);

	let jobs = allJobs.filter(job => new Date(job.expirationDate) > new Date());

	const searchResult = jobs.filter(job => {
		const matchedLocation = location.length === 0 || job.jobLocation.toLowerCase().includes(location.toLowerCase());
		const matchedTitle = title.length === 0 || job.jobTitle.toLowerCase().includes(title.toLowerCase());
		const matchedCompany = companyId.length === 0 || job.companyId === companyId;
		return matchedLocation && matchedTitle && matchedCompany;
	});

	const filteredJobs = searchResult.filter((job => {
		const matchedJobType = selectedTag.jobType.length === 0 || selectedTag.jobType.includes(job.jobType);
		const matcheWorkMode = selectedTag.workMode.length === 0 || selectedTag.workMode.includes(job.workMode);
		return matcheWorkMode && matchedJobType;
	}))

	const itemPerPage = 10;
	const lastItem = currentPage * itemPerPage;
	const firstItem = lastItem - itemPerPage;

	const currentPageItem = filteredJobs.slice(firstItem, lastItem);
	const totalPages = [];

	for (let index = 1; index <= Math.ceil(filteredJobs.length / itemPerPage); index++) {
		totalPages.push(index)
	}

	function handleNextClick() {
		if (currentPage < totalPages.length) {
			setCurrentPage(currentPage + 1);
		}
	}
	function handlePreviousClick() {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	}

	if (searchResult.length === 0) {
		return <Message>Can't Find Any Job</Message>
	}
	const allOrgs = JSON.parse(localStorage.getItem("employersDetails")) || [];
	return (
		<>
			<div style={{ marginBlock: "1rem" }}>
				<h4> Total Jobs : {filteredJobs.length}</h4>
			</div>

			{filteredJobs.length === 0 ?
				<Message>No Jobs</Message> :
				<div className={style.jobCardContainer}>
					<div className={style.jobCards}>
						{currentPageItem.map(job => {
							const matchedOrg = allOrgs.find(company => company.companyId === job.companyId);
							return (
								<Link to={`/jobdetail/${job.jobId}`} key={job.jobId}>
									<JobCard jobData={job} companyName={matchedOrg.companyName} companyImage={matchedOrg.companyImage} />
								</Link>
							)
						})}
					</div>
				</div>
			}
			{
				totalPages.length > 1 &&
				<div className={style.paginationBlock}>
					<Button type="btn btn-primary" handler={handlePreviousClick} disabled={currentPage == 1}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
					{
						totalPages.map((page, index) => (
							<div key={index} onClick={(e) => setCurrentPage(Number(e.target.textContent))} className={page == currentPage ? "activePage" : ''}  >
								{page}
							</div>
						))
					}
					<Button type="btn btn-primary" handler={handleNextClick} disabled={currentPage == totalPages.length}>
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</div>
			}
		</>
	)
}

export default JobCardContainer;