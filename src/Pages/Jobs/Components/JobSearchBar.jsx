import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from '../Style/jobs.module.css';

const JobSearchBar = ({ handleSearchData, handleFilterChange }) => {
	const [jobTitle, setJobTitle] = useState("");
	const [jobLocation, setJobLocation] = useState("");

	function handleSearch() {
		handleSearchData({
			title: jobTitle,
			location: jobLocation,
		})
	}
	function handleFilterBtnClick() {
		handleFilterChange(true);
	}
	return (
		<div className={style.JobSearchBar}>
			<label>
				<FontAwesomeIcon icon={faMagnifyingGlass} />
				<input type="text" placeholder="Job Title, Keyword..." value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
			</label>
			<hr />
			<label>
				<FontAwesomeIcon icon={faLocationDot} />
				<input type="text" placeholder="Search location..." value={jobLocation} onChange={(e) => { setJobLocation(e.target.value) }} />
			</label>
			<Button type="btn-primary" handler={handleSearch} disabled={jobTitle || jobLocation ? false : true}>Search</Button>
			<Button type="btn-primary" handler={handleFilterBtnClick}>Filter</Button>
		</div>
	)
}

export default JobSearchBar