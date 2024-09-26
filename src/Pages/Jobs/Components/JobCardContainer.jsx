import { useContext, useEffect, useState } from 'react';
import JobCard from '../../../Component/JobCard';
import style from '../Style/jobs.module.css';
import { FilterContext } from '../context';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Message from '../../../Component/Message';

const JobCardContainer = ({ searchParam: { title = "", location = "" } }) => {
	const [allJobs, setAllJobs] = useState(JSON.parse(localStorage.getItem("allJobs")) || []);
	const filterContext = useContext(FilterContext);
	const [currentPage, setCurrentPage] = useState(1);

	const searchResult = allJobs.filter(job => {
		const matchedLocation = location.length === 0 || job.jobLocation.toLowerCase().includes(location.toLowerCase());
		const matchedTitle = title.length === 0 || job.jobTitle.toLowerCase().includes(title.toLowerCase());
		return matchedLocation && matchedTitle;
	});

	const itemPerPage = 5;
	const lastItem = currentPage * itemPerPage;
	const firstItem = lastItem - itemPerPage;

	const currentPageItem = searchResult.slice(firstItem, lastItem);
	const totalPages = [];

	for (let index = 1; index <= Math.ceil(searchResult.length / itemPerPage); index++) {
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

	return (
		<>
			<div style={{ marginBlock: "1rem" }}>
				<h3> Total Jobs : {searchResult.length}</h3>
			</div>
			<div className={style.jobCardContainer}>
				<div className={style.jobCards}>
					{currentPageItem.map(job => (
						<Link to={`/jobdetail/${job.jobId}`} key={job.jobId}>
							<JobCard key={job.jobId} jobData={job} />
						</Link>
					))}
				</div>
			</div>

			{/* paginations */}
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