import { faIndianRupee, faLocation, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from '../Style/jobdetail.module.css';
import { toast } from "react-toastify";
import { useCandidateAuth } from "../../../hooks/useCandidateAuth";


const JobDetailsHeader = ({ jobInfo: { jobTitle, companyName, experience, salary = "Not Disclosed", jobLocation, vacancies, postedOn = "NA" } }) => {
	const { candidateAuthed, setCandidateAuth } = useCandidateAuth();

	function handleClick() {
		if (!candidateAuthed) {
			toast.error("Please Login.");
		}
		else {
			console.log('login');
			// if user logged in
		}
	}
	return (
		<div className={style.JobDetailsHeader}>
			<h3>{jobTitle}</h3>
			<p>{companyName}</p>
			<div>
				<div>
					<FontAwesomeIcon icon={faBriefcase} />
					{experience} years
				</div>
				<div>
					<FontAwesomeIcon icon={faIndianRupee} />
					{salary}
				</div>
			</div>
			<div>
				<FontAwesomeIcon icon={faLocation} />
				{jobLocation}
			</div>
			<div>
				<div>
					<p>Posted: <span>{postedOn}</span></p>
					<p>Vacancies: <span>{vacancies}</span></p>
				</div>
				<Button type="btn btn-primary" handler={handleClick}>
					Apply
				</Button>
			</div>
		</div>
	)
}
export default JobDetailsHeader;