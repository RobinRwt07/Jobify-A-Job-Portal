import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import JobCardContainer from "./Components/JobCardContainer";
import JobSearchBar from "./Components/JobSearchBar";
import FilterBar from "./Components/FilterBar";
import style from './Style/jobs.module.css';
const FindJobs = () => {
	const [searchData, setSearchData] = useState({ title: "", location: "" });
	const [isFilterOpen, setFilterOpen] = useState(false);
	const location = useLocation();
	const queryParam = new URLSearchParams(location.search);
	console.log(searchData.title, searchData.location);

	useEffect(() => {
		if (queryParam.has("location") || queryParam.has('title')) {
			setSearchData({
				title: queryParam.get('title'),
				location: queryParam.get('location')
			})
		}
	}, []);
	return (
		<div className={`${style.jobContainer} container`}>
			{isFilterOpen && <FilterBar handleFilterChange={setFilterOpen} />}
			<div>
				<JobSearchBar handleSearchData={setSearchData} handleFilterChange={setFilterOpen} />
				<JobCardContainer searchParam={searchData} />
			</div>
		</div >
	);
}

export default FindJobs;