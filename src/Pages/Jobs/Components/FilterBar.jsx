import style from '../Style/filterbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { FilterContext } from '../context';
import CheckBox from '../../../Component/Checkbox';
import Button from '../../../Component/Button';

const FilterBar = ({ handleFilterChange }) => {
	const jobTypes = ['Full Time', 'Part Time', 'Internship'];
	const workModes = ['Onsite', 'Remote', 'Hybrid'];

	const { selectedTag, setSelectedTag } = useContext(FilterContext);

	function handleRemoveFilters() {
		console.log("clear");

		setSelectedTag({
			jobType: [],
			workMode: []
		})
	}

	function handleJobTypeChange(e) {
		const { name, value, checked } = e.target;
		console.log(name);
		if (checked) {
			setSelectedTag({
				...selectedTag,
				jobType: [...selectedTag.jobType, value],
			})
		}
		else {
			setSelectedTag({
				...selectedTag,
				jobType: selectedTag.jobType.filter(job => job !== value)
			})
		}
	}
	function handleWorkModeChange(e) {
		const { name, value, checked } = e.target;
		if (checked) {
			setSelectedTag({
				...selectedTag,
				workMode: [...selectedTag.workMode, value],
			})
		}
		else {
			setSelectedTag({
				...selectedTag,
				workMode: selectedTag.workMode.filter(mode => mode !== value)
			})
		}
	}

	return (
		<div className={style.filterBar}>
			<div className={style.filterCloseBtn}>
				<button className='btn btn-tertiary' onClick={() => handleFilterChange(false)}>
					<FontAwesomeIcon icon={faClose} size='2xl' />
				</button>
			</div>
			<div>
				<div className={style.fitlerOptionGroup}>
					<h3>Job Type</h3>
					{
						jobTypes.map((type, index) => (
							<CheckBox key={index} name={type} value={type} checked={selectedTag.jobType.includes(type)} onChange={handleJobTypeChange}>
								{type}
							</CheckBox>
						))
					}
				</div>
				<div className={style.fitlerOptionGroup}>
					<h3>Work Mode</h3>
					{
						workModes.map((modes, index) => (
							<CheckBox key={index} name={modes} value={modes} checked={selectedTag.workMode.includes(modes)} onChange={handleWorkModeChange}>
								{modes}
							</CheckBox>
						))
					}
				</div>
			</div>
			<div className={style.applyBtn}>
				<Button type="btn btn-tertiary" handler={handleRemoveFilters}>Clear</Button>
			</div>
		</div>
	)
}

export default FilterBar;
