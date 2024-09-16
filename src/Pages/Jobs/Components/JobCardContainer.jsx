import { useContext, useEffect, useState } from 'react';
import { jobs } from '../../../../Public/DummyData/Jobs';
import JobCard from '../../../Component/JobCard';
import style from '../Style/jobs.module.css';
import { FilterContext } from '../context';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const JobCardContainer = ({ searchParam: { title = "", location = "" } }) => {
	const [allJobs, setAllJobs] = useState([]);
	const [searchResult, setSearchResult] = useState([]);
	const filterContext = useContext(FilterContext);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setAllJobs(jobs);
		if (title.length !== 0 || location.length !== 0) {
			setSearchResult(allJobs.filter(job => {
				if (title && location.length == 0) {
					return job.jobTitle.toLowerCase().includes(title.toLowerCase()) && job;
				}
				if (location && title.length == 0) {
					return job.location.toLowerCase().includes(location.toLowerCase()) && job
				}
				if (title && location) {
					return (job.location.toLowerCase().includes(location.toLowerCase()) && job.jobTitle.toLowerCase().includes(title.toLowerCase())) && job;
				}
			}));
		}
		else {
			setSearchResult(jobs);
		}
	}, [title, location]);

	const itemPerPage = 10;
	const lastItem = currentPage * itemPerPage;
	const firstItem = lastItem - itemPerPage;

	const allItems = searchResult;

	const currentPageItem = allItems.slice(firstItem, lastItem);

	const totalPages = [];

	for (let index = 1; index <= Math.ceil(allItems.length / itemPerPage); index++) {
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
		return <div>
			<h1>Can not find jobs</h1>
		</div>
	}

	return (
		<>
			<div style={{ marginBlock: "1rem" }}>
				<h3> Total Jobs : {allItems.length}</h3>
			</div>
			<div className={style.jobCardContainer}>
				{currentPageItem.map(job => (
					<Link to={`/jobdetail/${job.jobId}`} key={job.jobId}>
						<JobCard key={job.jobId} jobData={job} />
					</Link>
				))}
			</div>
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
		</>
	)
}

export default JobCardContainer;