import style from '../Style/filterbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { FilterContext } from '../context';
import CheckBox from '../../../Component/Checkbox';

const FilterBar = ({ handleFilterChange }) => {
	const [jobType, setJobTypes] = useState({
		fullTime: false,
		partTime: false,
		internship: false
	});
	const [workMode, setWorkMode] = useState({
		onsite: false,
		hybrid: false,
		remote: false,
	})

	const filterContext = useContext(FilterContext);

	function handleJobChange(e) {
		setJobTypes({
			...jobType,
			[e.target.name]: e.target.checked
		})
		filterContext.handler({
			workMode: {
				...filterContext.tags.workMode
			},
			jobType: {
				...filterContext.tags.jobType,
				[e.target.name]: e.target.checked,
			}
		})
	}
	function handleWorkModeChange(e) {
		setWorkMode({
			...workMode,
			[e.target.name]: e.target.checked
		})

		filterContext.handler({
			jobType: {
				...filterContext.tags.jobType
			},
			workMode: {
				...filterContext.tags.workMode,
				[e.target.name]: e.target.checked,
			}
		})
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
					<CheckBox name={'fullTime'} checked={jobType.fullTime} onChangeHandler={handleJobChange}>
						Full Time
					</CheckBox>

					<CheckBox name={"partTime"} checked={jobType.partTime} onChangeHandler={handleJobChange}>
						Part Time
					</CheckBox>

					<CheckBox name={"intership"} checked={jobType.internship} onChangeHandler={handleJobChange}>
						Internship
					</CheckBox>
				</div>
				<div className={style.fitlerOptionGroup}>
					<h3>Work Mode</h3>
					<CheckBox name={"onsite"} checked={workMode.onsite} onChangeHandler={handleWorkModeChange}>
						Onsite
					</CheckBox>
					<CheckBox name={"remote"} checked={workMode.remote} onChangeHandler={handleWorkModeChange}>
						Remote
					</CheckBox>
					<CheckBox name={"hybrid"} checked={workMode.hybrid} onChangeHandler={handleWorkModeChange}>
						Hybrid
					</CheckBox>
				</div>
			</div>
			<div className={style.applyBtn}>
				<Button type="btn btn-tertiary">Clear</Button>
				<Button type="btn btn-primary">Apply</Button>
			</div>
		</div>
	)
}

export default FilterBar;
