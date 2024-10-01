import logo from '../Assest/Images/landingImage.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from '../Styles/JobCard.module.css';


const JobCard = ({ jobData: { jobTitle, companyImage, workMode, jobType, minSalary, maxSalary, companyName, jobLocation } }) => {

	return (
		<div className={style['job-card']}>
			<h3>{jobTitle}</h3>
			<div>
				<div>
					<span>{jobType}</span>
					<span>{workMode}</span>
				</div>
				<span>Salary: {`${(minSalary / 100000).toFixed(1)}-${(maxSalary / 100000).toFixed(1)}`} LPA </span>
			</div>

			<div className={style.companyInfo}>
				<div>
					<img src={companyImage || logo} alt="company logo" />
				</div>
				<div>
					<h4>{companyName}</h4>
					<div>
						<FontAwesomeIcon icon={faLocationDot} />
						<span>{jobLocation}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
export default JobCard;