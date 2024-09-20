import CompanyLogo from '../Assest/Images/landingImage.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from '../Styles/JobCard.module.css';

const JobCard = ({ jobData: { jobTitle, jobType, minSalary, maxSalary, companyName, jobLocation } }) => {
	function handleSaveClick() {
		console.log("save");
	}
	return (
		<div className={style['job-card']}>
			<h3>{jobTitle}</h3>
			<div>
				<span>{jobType}</span>
				<span>Salary: {`${(minSalary / 100000).toFixed(1)}-${(maxSalary / 100000).toFixed(1)}`} LPA </span>
			</div>

			<div className={style.companyInfo}>
				<div>
					<img src={CompanyLogo} alt="company logo" />
				</div>
				<div>
					<h4>{companyName}</h4>
					<div>
						<FontAwesomeIcon icon={faLocationDot} />
						<span>{jobLocation}</span>
					</div>
				</div>
				<div onClick={handleSaveClick} className={style.saveBtn}>
					<FontAwesomeIcon icon={faBookmark} />
				</div>
			</div>
		</div>
	)
}
export default JobCard;