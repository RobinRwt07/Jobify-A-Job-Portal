import style from '../Style/filterbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const FilterBar = ({ handleFilterChange }) => {
	const [jobTypes, setJobTypes] = useState({
		fullTime: false,
		partTime: false,
		internship: false
	});
	const [appliedChecks, setAppliedChecks] = useState([]);
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
					<label>
						<input type="checkbox" name="fullTime" checked={jobTypes.fullTime} />
						<span>Full Time</span>
					</label>
					<label>
						<input type="checkbox" name="partTime" checked={jobTypes.partTime} />
						<span>Part Time</span>
					</label>
					<label>
						<input type="checkbox" name="Internship" checked={jobTypes.internship} />
						<span>Intership</span>
					</label>
				</div>
				<div className={style.fitlerOptionGroup}>
					<h3>Work Mode</h3>
					<label>
						<input type="checkbox" name="Onsite" />
						<span>On-Site</span>
					</label>
					<label>
						<input type="checkbox" name="Remote" />
						<span>Remote</span>
					</label>
					<label>
						<input type="checkbox" name="Hybrid" />
						<span>Hybrid</span>
					</label>
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