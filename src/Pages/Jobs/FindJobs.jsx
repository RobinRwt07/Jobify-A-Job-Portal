import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import JobCardContainer from "./Components/JobCardContainer";
import Footer from "../../Component/Footer";
import JobSearchBar from "./Components/JobSearchBar";
import FilterBar from "./Components/FilterBar";
import style from './Style/jobs.module.css';
import { FilterContext } from "./context";

const FindJobs = () => {
	const [searchData, setSearchData] = useState({ title: "", location: "" });
	const [isFilterOpen, setFilterOpen] = useState(false);
	const location = useLocation();
	const queryParam = new URLSearchParams(location.search);

	const [selectedTag, setSelectedTag] = useState({
		jobType: {
			fullTime: false,
			partTime: false,
			internship: false
		},
		workMode: {
			onsite: false,
			remote: false,
			hybrid: false
		}
	});

	useEffect(() => {
		if (queryParam.has("location") || queryParam.has('title')) {
			setSearchData({
				title: queryParam.get('title'),
				location: queryParam.get('location')
			})
		}
	}, []);
	return (
		<>
			<FilterContext.Provider value={{ tags: selectedTag, handler: setSelectedTag }}>
				<div className={`${style.jobContainer} container`}>
					{isFilterOpen && <FilterBar handleFilterChange={setFilterOpen} />}
					<div>
						<JobSearchBar handleSearchData={setSearchData} handleFilterChange={setFilterOpen} />
						<JobCardContainer searchParam={searchData} />
					</div>
				</div >
			</FilterContext.Provider>
			<Footer />
		</>
	);
}

export default FindJobs;